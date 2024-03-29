---
title: URL shortener with Nitro on Cloudflare Pages
description: A real-world example of how to build an app for the edge using Nitro and Cloudflare Pages.
authors:
  - name: Estéban S
    picture: https://github.com/barbapapazes.png
    twitter: soubiran_
category: building-blocks
packages:
  - nitro
  - unstorage
  - ohash
resources:
  - label: Source Code
    to: https://github.com/barbapapazes/url-shortener
    icon: i-simple-icons-github
publishedAt: 2024-03-11
modifiedAt: 2024-03-11
---

In this article, we will create our own URL shortener using [Nitro](https://nitro.unjs.io) and deploy it on [Cloudflare Pages](https://pages.cloudflare.com/).

Nitro is the next generation of server toolkit. It allows us to create web servers with everything we need and deploy them wherever we prefer.

Cloudflare Pages is a platform to build and host websites on the edge. It's possible to use services like [KV](https://developers.cloudflare.com/kv/) to create full-stack stateful applications.

Our project is a simple URL shortener that will allow us to create a short URL from a long one. We will use the Cloudflare KV to store the URLs and the Nitro server to handle the requests.

We will use:

- [unstorage](https://unstorage.unjs.io) to abstract the KV layer and simplify the development since we do not need to use the Cloudflare Wrangler CLI.
- [ohash](https://ohash.unjs.io) to create a hash from the URL and avoid collisions.
- [nanojsx](https://nanojsx.io/) to create the HTML pages using TSX.
- [pico.css](https://picocss.com) to style the application.

## Initialize the Project

First, we need to create a fresh Nitro project:

```bash
npx giget@latest nitro url-shortener
```

Then, we can move into the project and install the required dependencies:

```bash
cd url-shortener
npm install
```

We can start the development server to see the default Nitro page:

```bash
npm run dev
```

Open your browser and go to [http://localhost:3000](http://localhost:3000) to verify that everything is working.

## Create the URL Shortener

Before anything else, we need to install the required packages:

```bash
npm install ohash nano-jsx
```

### Create a Short URL

First, we need to create a route called `index.get.tsx` in the `server/routes` folder. This route will be the home page of our URL shortener where the user can create a short URL from a long one.

```tsx [server/routes/index.get.tsx]
import { Helmet, h, renderSSR } from 'nano-jsx' // the `h` is very important here
import { withTemplate } from '../resources/template'

export default defineLazyEventHandler(() => {
  const App = () => {
    return (
      <div>
        <Helmet>
          <title>URL Shortener with Nitro</title>
        </Helmet>
        <h2>Shorten an URL</h2>
        <form action="/create" method="POST">
          <input type="url" name="url" placeholder="URL to shorten" autocomplete="off" />
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
  const app = renderSSR(<App />)
  const { body, head } = Helmet.SSR(app)

  const page = withTemplate({
    body,
    head,
  })

  return defineEventHandler(() => {
    return page
  })
})
```

This route will display a form where the user can enter a URL to shorten. When the form is submitted, it will send a POST request to the `/create` route.

We use a lazy event handler to create the view only once, when a request hits the server. Then, the response is cached in-memory and reused for subsequent requests. This is useful to avoid creating the view on every request since it's the same for everyone.

The function `withTemplate` is a util that we need to create.

```ts [server/resources/template.tsx]
interface LayoutProps {
  body: string
  head: string[]
}

export function withTemplate(props: LayoutProps) {
  const { head, body } = props

  return /* html */`<html>
      <head>
       <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
        />
        ${head.join('\n')}
      </head>
      <body>
        <header class="container">
          <h1>
            <a href="/">URL Shortener with Nitro</a>
          </h1>
        </header>
        <main class="container">
          ${body}
        </main>
      </body>
    </html>`
}
```

It is a simple string template where we inject the head and body content created by nano-jsx.

### Store the URL

Before moving into this part, we need to install `zod` to validate the request body.

```bash
npm install zod
```

Now, we need to create the `/create` route to handle the POST request and store the URL in the KV.

```tsx [server/routes/create.post.tsx]
import { z } from 'zod'
import { hash } from 'ohash'
import { Helmet, h, renderSSR } from 'nano-jsx' // the `h` is very important here
import { withTemplate } from '../resources/template'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, z.object({
    url: z.string().url(),
  }).parse)

  const requestURL = getRequestURL(event)
  const id = hash(body.url)
  const shortenURL = new URL(`/${id}`, requestURL).href

  await useStorage('data').setItem(id, body.url)

  const App = () => {
    return (
      <div>
        <Helmet>
          <title>Created</title>
        </Helmet>
        <h2>Created and Ready</h2>
        <input
          type="text"
          value={shortenURL}
          autofocus
        />
      </div>
    )
  }

  const app = renderSSR(<App />)
  const { body: nanoBody, head } = Helmet.SSR(app)

  return withTemplate({
    body: nanoBody,
    head,
  })
})
```

In this route, we use the `readValidatedBody` function to validate the request body. This ensures us that the `url` field is a valid URL. Otherwise, it will throw an error.

Then, we get the request URL using the `getRequestURL` function from `h3`.

We create a hash from the body URL using the `hash` function from `ohash`. This is useful to ensure that a URL will always have the same hash and to avoid collisions.

We store the URL in the KV using the `useStorage` function from `unstorage`. We use the `data` namespace to store the URLs that is pre-configured for us.

:read-more{title="KV Storage" to="https://nitro.unjs.io/guide/storage#usage"}

At the end of this event handler, we return a route with the shortened URL that the user can copy and use.

In development, everything is ok but we need to update this configuration for the production environment.

```ts [nitro.config.ts]
export default defineNitroConfig({
  srcDir: 'server',
  $production: {
    storage: { data: { driver: 'cloudflare-kv-binding', binding: 'url-shortener' } },
  },
})
```

In this configuration, we define the `data` namespace, same as in development, to use the `cloudflare-kv-binding` driver and the `url-shortener` binding under the key `$production`. This means that this configuration will only be used in the production environment to access to the Cloudflare KV.

:read-more{title="Environment-specific configuration" to="https://github.com/unjs/c12#environment-specific-configuration"}

### Redirect to the URL

Finally, we need to create a route to handle the shortened URLs and redirect the user to the original URL.

```ts [server/routes/[id].get.ts]
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'short')

  const value = await useStorage<string>('data').getItem(id)

  if (!value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
    })
  }

  return sendRedirect(event, value)
})
```

Nothing really special here. We get the `id` from the router params and we use the `useStorage` function to get the URL from the KV. If the URL does not exist, we throw a 404 error. Otherwise, we redirect the user to the original URL.

## Deploy the URL Shortener

That's it! We have created a simple URL shortener using Nitro. Now, we need to deploy it on Cloudflare Pages. Don't panic, it's easy thanks to the zero-config deployment providers.

:read-more{title="Zero Config Providers" to="https://nitro.unjs.io/deploy#zero-config-providers"}

> [!WARNING]
> We need to have a Cloudflare account and a GitHub repository to deploy the app to continue.

First, log in to the Cloudflare dashboard and select an account. Then, click on Account Home, select Workers & Pages. Create a new application using the top right button then the tab Pages and follow the process by using a Git connection.

Select the repo, add the build command `npm run build`, the output directory `dist`, add an environment variable `NODE_ENV` with the value `production` and save and deploy.

Now, we've just to wait for the deployment to be completed. Once it's done, we can access the URL shortener using the URL provided by Cloudflare Pages.

**But**, it will not really work since we do not have bind a KV namespace. We need to do it manually. Go to the project, settings, functions and scroll until you see KV namespace bindings. Then, add a binding with the name `url-shortener` and the namespace you want to use.

> [!NOTE]
> It is possible to create a KV namespace in the Workers & Pages section.

Now, we must redeploy our application to take into account the new KV namespace binding. Once it's done, we can use the URL shortener. :sparkles:

> [!NOTE]
> If you do not plan to use the project, remember to delete it from the Cloudflare Pages dashboard to avoid unnecessary costs.

## Going Further

We can add a simple CSRF protection using the handler object syntax.

```tsx [server/routes/create.post.tsx]
import { z } from 'zod'
import { hash } from 'ohash'
import { Helmet, h, renderSSR } from 'nano-jsx'
import { withTemplate } from '../resources/template'

export default defineEventHandler({
  onBeforeResponse: async (event) => {
    const requestURL = getRequestURL(event).origin
    const origin = getRequestHeader(event, 'origin')

    if (!origin) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Bad Request',
      })
    }

    if (origin !== requestURL) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Forbidden',
      })
    }
  },
  handler: async (event) => {
    const body = await readValidatedBody(event, z.object({
      url: z.string().url(),
    }).parse)

    const requestURL = getRequestURL(event)
    const id = hash(body.url)
    const shortenURL = new URL(`/${id}`, requestURL).href

    await useStorage('data').setItem(id, body.url)

    const App = () => {
      return (
        <div>
          <Helmet>
            <title>Created</title>
          </Helmet>
          <h2>Created and Ready</h2>
          <input
            type="text"
            value={shortenURL}
            autofocus
          />
        </div>
      )
    }

    const app = renderSSR(<App />)
    const { body: nanoBody, head } = Helmet.SSR(app)

    return withTemplate({
      body: nanoBody,
      head,
    })
  },
})
```

We define a pre-request handler to verify the `origin` header. If there is a mismatch, we throw an error. Otherwise, we continue to the main handler.

> [!NOTE]
> Please read [Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) from OWASP to understand the CSRF protection. Verifying the `origin` header is a simple way to protect against CSRF but considered as an in-depth defense. It is recommended to use a more advanced protection like a token.

## Finally

Building with Nitro and Cloudflare Pages is pretty easy and provides a great developer experience thanks to the ability to use TSX and a development storage avoiding the usage of the Cloudflare Wrangler CLI.

Enjoy building with Nitro and Cloudflare Pages! 🚀

> [!NOTE]
> The URL shortener is inspired by the [url-shortener of Yusuke Wada](https://github.com/yusukebe/url-shortener).
