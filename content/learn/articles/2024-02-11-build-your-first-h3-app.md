---
title: Build your first H3 app
description: Get started with H3 by building a simple app.
authors:
  - name: Estéban S
    picture: https://github.com/barbapapazes.png
    twitter: soubiran_
category: getting-started
packages:
  - h3
resources:
  - label: Source Code
    to: https://github.com/unjs/examples/tree/main/h3/build-your-first-app
    icon: i-simple-icons-github
  - label: H3 Documentation
    to: https://h3.unjs.io
    icon: i-heroicons-book-open
  - label: H3 Examples
    to: https://github.com/unjs/h3/tree/main/examples
    icon: i-simple-icons-github
publishedAt: 2024-02-11
modifiedAt: 2024-02-11
---

H3 is a minimal http framework for high performance and portability.

> [!NOTE]
> Deep dive into H3 through [the dedicated documentation](https://h3.unjs.io).

During this tutorial, we will create a very simple app to get a wide overview of H3 capabilities. This app will serve an HTML file populated with data. There will be some forms to add and remove data. At the end, we will see how to add an API endpoint to get the data in JSON format.

> [!TIP]
> For more complexe apps, take a look at [Nitro](https://nitro.unjs.io).

## Prerequisites

To follow this tutorial, we need to have [Node.js](https://nodejs.org/en/) installed on our machine with [npm](https://www.npmjs.com/). We also need to have a basic knowledge of JavaScript.

> [!NOTE]
> Despite H3 is written in TypeScript, we don't need to know TypeScript to use it.

## Create a New Project

First, let's create a new npm project:

```bash
mkdir my-h3-app
cd my-h3-app
npm init -y
```

Then, install H3:

```bash
npm install h3
```

And that's it! We are ready to start coding.

## Create the App

To create our first H3 app, we need to create an `app.mjs` file at the root of our project. Inside, we will create a new app by importing the `createApp` function from H3 and calling it:

```js [app.mjs]
import { createApp } from 'h3'

export const app = createApp()
```

:read-more{to="https://h3.unjs.io/concepts/app" title="App"}

Do not forget the `export` keyword, it's important for the listener.

## Add a Listener

Speaking of listener, our app is not able to respond to any request yet. To do so, we need to add a listener. A listener is used to listen an HTTP event, transfert it to our app and send back the response.

For our tutorial, we will use [unjs/listhen](https://listhen.unjs.io).

In the `package.json` file, add a script named `start`:

```json [package.json]
{
  "scripts": {
    "start": "npx --yes listhen -w ./app.mjs"
  }
}
```

This script will start a server listening on port `3000` using our app and watching for changes.

We can now run the command `npm start` to start our server.

## Create a Router

Now that our app is ready to accept HTTP requests, we need to create a router to handle them. The purpose of the router is to match the request to the right handler.

With H3, we've just to use the function `createRouter` and add it to our app:

```js [app.mjs]
import { createApp, createRouter } from 'h3'

export const app = createApp()

const router = createRouter()

app.use(router)
```

The `app.use(router)`{lang="js"} is necessary to add the router to our app.

:read-more{to="https://h3.unjs.io/concepts/router" title="Router"}

## Add our First Handler

We have an app and a router. The only thing missing is the handlers. A handler is a function that will be called when a request matches the route.

> [!NOTE]
> We may refer to controllers in other frameworks.

To add a handler, we can use any of the HTTP methods available on the router. For our tutorial, we will use the `get` method to handle the `GET` requests.

```js [app.mjs]
// ...

const router = createRouter()

router.get('/', () => {
  return 'Hello World!'
})

// ...
```

In the code above, we added a handler for the `/` route. This handler will send the string `Hello World!` to the client with a simple `return`{lang="js"}.

:read-more{to="https://h3.unjs.io/concepts/event-handlers" title="Event Handlers"}

## Our First HTML Page

For this first route, we will get the books from a static array and render them in an HTML page. For each book, we will add a for to remove it from the database. Under the list, we will add a form to add a new book.

For the style, we will use [Pico CSS](https://picocss.com/).

```js [app.mjs]
// ...

const router = createRouter()

const books = [
  { title: 'The Hobbit', price: 10 },
  { title: 'The Lord of the Rings', price: 20 },
]

router.get('/', defineEventHandler(() => {
  return /* html */`
    <html>
      <head>
        <title>Books</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css">
      </head>
      <body>
        <main class="container">
          <section>
        <h1>Books</h1>
        <ul>
          ${books.map(book => /* html */`
          <li>
          ${book.title} - ${book.price}
          <form action="/remove" method="post">
            <input type="hidden" name="title" value="${book.title}" />
            <button type="submit">Remove</button>
          </form>
        </li>
          `).join('')}
        </ul>
        </section>
        <section>
          <h2>Add a book</h2>
          <form action="/add" method="post">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" />
            <label for="price">Price</label>
            <input type="number" name="price" id="price" />
            <button type="submit">Add</button>
          </form>
        </section>
      </main>
      </body>
    </html>
  `
}))
```

> [!NOTE]
> The comment `/* html */` is used by [a VS Code extension](https://marketplace.visualstudio.com/items?itemName=bierner.comment-tagged-templates) to provide syntax highlighting.

Open a browser and go to `http://localhost:3000` to see the result.

:read-more{to="https://h3.unjs.io/concepts/event-handlers#responses-types" title="Responses Types"}

## Use POST Requests

In our HTML page, we have two forms. One to add a book and one to remove a book. We need to add two new routes to handle them. This is interesting because we will need to handle the body of the request.

### Add a Book

To add a book, we need to handle a `POST` request on the `/add` route. We will also validate the data sent by the client using [Zod](https://zod.dev/) and we need to install it:

```bash
npm install zod
```

> [!NOTE]
> Zod is a schema validation with TypeScript type inference. It's not mandatory to use it with H3 but it's a recommended practice to validate the user data.

Then, we can add the route:

```js [app.mjs]
import zod from 'zod'
// ...
const router = createRouter()

const books = [
  // ...
]

router.post('/add', defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, zod.object({
    title: zod.string(),
    price: zod.number({ coerce: true }).int().nonnegative(),
  }).parse)

  books.push(body)

  const referer = getHeader(event, 'referer') ?? '/'
  return sendRedirect(event, referer)
}))
```

There is two important things to notice in this code.

First, we use the `readValidatedBody` function to read the body of the request and validate it. It's important to validate the data sent by the client to avoid any security issue.

> [!NOTE]
> We can use the `readBody` function to read the body of the request without validation.

Second, we use the `sendRedirect` function to redirect the client to the previous page. We use the `referer` header to get the previous page. If the header is not present, we redirect to the root page.

> [!NOTE]
> We should think to redirect to `/` but using the referer is a better practice if we change the root page.

:read-more{to="https://h3.unjs.io/guides/validate-data" title="Validate Data"}

> [!IMPORTANT]
> For more advanced apps, we should use a database to store the data. Take a look at [Nitro](https://nitro.unjs.io) to achieve this with ease.

### Remove a Book

Nothing new here, we will handle a `POST` request on the `/remove` route, validate the data and remove the book from the array:

```js [app.mjs]
import zod from 'zod'
// ...
const router = createRouter()

const books = [
  // ...
]

router.post('/remove', defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, zod.object({
    title: zod.string(),
  }).parse)

  books.splice(books.findIndex(book => book.title === body.title), 1)

  const referer = getHeader(event, 'referer') ?? '/'
  return sendRedirect(event, referer)
}))
```

Same as before, we use the `readValidatedBody` function to read the body of the request and validate it. Then, we use the `sendRedirect` function to redirect the client to the previous page.

:read-more{to="https://h3.unjs.io/guides/validate-data" title="Validate Data"}

> [!IMPORTANT]
> For more advanced apps, we should use a database to store the data. Take a look at [Nitro](https://nitro.unjs.io) to achieve this with ease.

## Add an API Endpoint

We would need to add an API endpoint for external services. For this example, we will create another router dedicated to the API.

```js [app.mjs]
// ...
const apiRouter = createRouter()
```

Like any router, we will add an handler for the `/books` route:

```js [app.mjs]
// ...
apiRouter.get('/books', defineEventHandler(() => {
  return books
}))
```

Then, we will bind this second router to the first one using a base path:

```js [app.mjs]
// ...
router.use('/api/**', useBase('/api', apiRouter.handler))
```

This means that every `/api/` route will be handled by the `apiRouter` and this second router will be called with the path without the `/api` prefix to find the right handler.

:read-more{to="https://h3.unjs.io/concepts/router#nested-routers" title="Nested Routers"}

## Conclusion

And voilà! We now have our first H3 app!

During this course, we saw how to create a H3 app, use a listener with it, create a router, add handlers, validate data. But there is a lot more to discover about H3 on [the dedicated documentation](https://h3.unjs.io).

However, H3 is very low level and has very specific use cases. In general, we recommend [Nitro](https://nitro.unjs.io) to create more advanced web servers with database that run everywhere.
