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
# resources:
#   - label:
#     to:
#     icon:
publishedAt: 2024-03-11
modifiedAt: 2024-03-11
---

> [!NOTE]
> This article is inspired by the [url-shortener built with Hono](https://github.com/yusukebe/url-shortener) from [Yusuke Wada](https://github.com/yusukebe).

In this article, we will create our own URL shortener using [Nitro](https://nitro.unjs.io) deploy it on [Cloudflare Pages](https://pages.cloudflare.com/).

Nitro is the next generation of server toolkit. It allows us to create web servers with everything we need and deploy them wherever we prefer. It powers Nuxt as the server layer. Everything we will do in this article can be done with Nuxt.

:read-more{title="Nuxt Server Layer" to="https://nuxt.com/docs/getting-started/server"}

Cloudflare Pages is a platform to build and host websites on the edge. It's possible to use services like KV, D1, and Durable Objects to create a full-stack application.

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

export default defineEventHandler(() => {
  const App = () => {
    return (
      <div>
        <Helmet>
          <title>URL Shortener with Nitro</title>
        </Helmet>
        <h2>Create shorten URL!</h2>
        <form action="/create" method="POST">
          <input type="url" name="url" placeholder="URL to shorten" autocomplete="off" />
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
  const app = renderSSR(<App />)
  const { body, head } = Helmet.SSR(app)

  return withTemplate({
    body,
    head,
  })
})
```

This route will display a form where the user can enter a URL to shorten. When the form is submitted, it will send a POST request to the `/create` route.

The function `withTemplate` is a util that we need to create but it is auto imported.

:read-more{title="Nitro Auto Imports" to="https://nitro.unjs.io/guide/utils#auto-imports"}

```ts [server/utils/template.tsx]
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
            <a href="/">URL Shortener</a>
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

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, z.object({
    url: z.string().url(),
  }).parse)

  const requestURL = getRequestURL(event)
  const id = hash(body.url)
  const shortenURL = new URL(`/${id}`, requestURL).href

  await useStorage('db').setItem(id, body.url)

  const App = () => {
    return (
      <div>
        <Helmet>
          <title>Created</title>
        </Helmet>
        <h2>Created!</h2>
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

In this route, we use the `readValidatedBody` function to validate the request body. This ensure us that the `url` field is a valid URL. Otherwise, it will throw an error.

Then, we get the request URL using the `getRequestURL` function from `h3`.

We create a hash from the body URL using the `hash` function from `ohash`. This is useful to ensure that a URL will always have the same hash and to avoid collisions.

We store the URL in the KV using the `useStorage` function from `unstorage`. We use the `db` namespace to store the URLs but we neeed to configure this namespace in the Nitro configuration.

:read-more{title="Nitro Configuration" to="https://nitro.unjs.io/guide/configuration"}

```ts [nitro.config.ts]
export default defineNitroConfig({
  srcDir: 'server',
  storage: { db: { driver: 'cloudflare-kv-binding', binding: 'url-shortener' } },
  devStorage: { db: { driver: 'fs', base: '.nitro/data/db' } },
})
```

In this configuration, we define the `db` namespace to use the `cloudflare-kv-binding` driver and the `url-shortener` binding. We also define a `devStorage` to use the `fs` driver for local development. This is useful to avoid using the Cloudflare Wrangler CLI and to simplify the development. After creating an URL, take a look at the `db` folder in the `.nitro/data` folder to see the created file where the name is the ID and the content the original URL.

At the end of this event handler, we return a route with the shorten URL that the user can copy and use.

### Redirect to the URL

Finally, we need to create a route to handle the shorten URLs and redirect the user to the original URL.

```ts [server/routes/[id].get.ts]
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'short')

  const value = await useStorage<string>('db').getItem(id)

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

That's it! We have created a simple URL shortener using Nitro. Now, we need to deploy it on Cloudflare Pages. Don't panic, it's easy!

> [!WARNING]
> We need to have a Cloudflare account to continue.

First, install `wrangler`:

```bash
npm i -D wrangler
```

Then, add the script to deploy the project in the `package.json`:

```json [package.json]
{
  "scripts": {
    "deploy": "NITRO_PRESET=cloudflare-pages npm run build && wrangler pages deploy dist"
  }
}
```

This script will build our project using the Cloudflare Pages preset and deploy it using the `wrangler` CLI.

> [!NOTE]
> `wrangler` could ask us to login to your Cloudflare account before deploying the project.

In a CI environment, Nitro is able to automatically detect the preset to use.

:read-more{title="Zero Config Providers" to="https://nitro.unjs.io/deploy#zero-config-providers"}

Once it's done, we could se `✨ Deployment complete! Take a peek over at https://908ff113.url-shortener-<...>.pages.dev` in our terminal.

If we open the URL, we will see an internal error because we need to bind a KV namespace to the project. To do it, we need to open the Cloudflare Pages dashboard and create a new KV namespace named `url-shortener`. Then, we can go to the project settings and in the sub-menu functions. We need to add a KV namespace and bind it to the `url-shortener` binding (same name as in the Nitro configuration) using the namespace we just created called `url-shortener`.

Redeploy the project using the `deploy` script and open the URL again. Now, we can use the URL shortener to create short URLs from long ones. :sparkles:

> [!NOTE]
> If you do not plan to use the project, remember to delete it from the Cloudflare Pages dashboard to avoid unnecessary costs.

## Going Further

We can add a simple CSRF protection using a Nitro middleware.

```ts [server/middlewares/csrf.ts]
export default defineEventHandler(async (event) => {
  const method = event.method

  if (method === 'GET')
    return

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
})
```

This middleware will only run on `post` request. If header `origin` is different from the request origin, an error is thrown.

> [!NOTE]
> Please read [Cross-Site Request Forgery Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html) from OWASP to understand the CSRF protection.

## Finally

Building with Nitro and Cloudflare Pages is pretty easy and provide a great developer experience thanks to the ability to use TSX and a development storage avoiding use the usage of the Cloudflare Wrangler CLI.

Imagine what you can do with a full framework like Nuxt. You can use the same server layer and have Vue on the client. You can use [Nuxt Security](https://nuxt.com/modules/security) for many security features like the CSRF and [Nuxt Hub](https://hub.nuxt.com/) for a better storage DX.

Enjoy building with Nitro and Cloudflare Pages! :rocket:
