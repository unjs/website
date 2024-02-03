---
title: H3 1.8 - Towards the Edge of the Web
description: New h3 release with web and plain adapters, web streams support, object syntax event handlers, typed event handler requests and more!
authors:
  - name: Pooya Parsa
    picture: https://github.com/pi0.png
    twitter: _pi0_
categories:
  - h3
  - release
packages:
  - h3
publishedAt: 2023-08-15
modifiedAt: 2023-08-15
---

> [H3](/packages/h3) is a versatile H(TTP) framework written in TypeScript that powers both [Nitro](https://nitro.unjs.io/) and [Nuxt](https://nuxt.com/) today.

[Almost two years ago](https://github.com/unjs/h3/tree/cbc8909b2003d6d5df694ab7a36aa067cc990c74), we made H3 with the ambition to become the smallest HTTP framework for [Nuxt 3](https://nuxt.com/), ensuring compatibility with [Node.js](https://nodejs.org/en) and providing an elegant developer experience. It also aimed to have a futuristic design, being adaptable to Edge and Web Worker runtimes, a concept that was relatively new at the time.

During the same period, we also developed [unjs/unenv](https://github.com/unjs/unenv/tree/main), a thin layer that enabled the utilization of Node.js libraries and HTTP middleware for Edge-compatible runtimes without the need for Node.js. This innovation played a pivotal role in enabling us to harness the power of the NPM and Node.js ecosystem without starting everything from scratch for web compatibility. The synergistic combination of H3 and unenv culminated in making [Nitro](https://nitro.unjs.io) one of the pioneering web frameworks fully compatible with Edge runtimes.

This latest release takes H3 even closer to offering native Web API compatibility right out of the box.

> 🚀 This release is immediately available for all ecosystem packages including [Nitro](https://nitro.unjs.io/) and [Nuxt 3](https://nuxt.com/). Please remember to refresh your `lockfile` and `node_modules` to receive the updates.

## Web and Plain Adapters

We have introduced a new built-in adapter with a [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)-compatible signature, with [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) as input and [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) as the return value.

What this signifies is that you can now seamlessly deploy your H3 applications on runtimes such as [Cloudflare Workers](https://workers.cloudflare.com/), [Deno Deploy](https://deno.com/deploy), [Bun](https://bun.sh/), and [Lagon](https://lagon.app/).

For practical examples and a demo, check out the [h3-on-edge](https://github.com/pi0/h3-on-edge) repository.

```ts
// import { createApp, eventHandler, toWebHandler } from 'h3'
import { createApp, eventHandler, toWebHandler } from 'https://esm.sh/h3@1.8.0'

const app = createApp()

app.use(
  '/',
  eventHandler(event => 'H3 works on edge!'),
)

const webHandler = toWebHandler(app) // (Request) => Promise<Response>
```

In addition to web handlers, we've also introduced a new plain adapter format using the `toPlainHandler(app)` syntax. This facilitates the seamless integration of H3 with any serverless platform using plain input and response objects.

All of these became possible due to the implementation of new streaming capabilities and [unjs/unenv](https://unenv.unjs.io), which provides a lightweight Node.js compatibility layer. Previously, this level of integration was only possible through [Nitro presets](https://nitro.unjs.io/deploy).

Furthermore, we've introduced a set of new web helpers:

- `toWebRequest(event)`: Convert a H3 event object into a web [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request).
- `getRequestWebStream(event)`: Retrieve a readable stream from the current H3 event request.
- `fromPlainHandler(plainHandler)`: Convert a plain object handler into an H3-compatible event handler.
- `fromWebHandler(webHandler)`: Convert a Web Request/Response handler into an H3-compatible event handler.

## Web Streams Support

H3 now supports native [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) response support. This inherently brings compatibility with libraries like [Vercel/AI](https://github.com/vercel/ai), which rely on streaming responses ([demo](https://github.com/Hebilicious/nuxt-openai-vercel-edge-demo)).

Leveraging this functionality is straightforward—simply return a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) or [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object from your event handlers.

```ts
export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/html')
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      for (const token of 'Streaming is so cool with H3!'.split(' ')) {
        controller.enqueue(encoder.encode(token))
        await new Promise((resolve) => {
          setTimeout(resolve, 300)
        })
      }
    },
  })
  return stream
})
```

For more advanced scenarios, you might choose to utilize the `sendStream(event, stream)` and `sendWebResponse(event, stream)` utilities instead of directly returning the stream.

## Object Syntax Event Handlers

H3 introduces support for defining event handlers using an Object syntax. With this approach, you can define hooks that run before or after each handler, such as authentication or compression middleware.

```ts
const auth = defineRequestMiddleware((event) => {
  event.context.auth = { name: 'admin' }
})

const compression = defineResponseMiddleware((event) => {
  // Example: https://stackblitz.com/edit/github-mb6bz3
})

export default eventHandler({
  onRequest: [auth],
  onBeforeResponse: [compression],
  async handler(event) {
    return `Hello ${event.context.auth?.name || 'Guest'}`
  },
})
```

## Typed Event Handler Requests

H3 now supports defining event types using new generic type support.

When you define types, request utilities will be aware of the event input types. This enhancenment also allows us to enhance type safety for `$fetch` handlers in upstream frameworks like [Nitro](https://nitro.unjs.io/) and [Nuxt](https://nuxt.com/).

```ts
export default eventHandler<{ body: { name: string }, query: { id: string } }>(
  async (event) => {
    const query = getQuery(event) // Query is typed as { id: string }
    const body = await readBody(event) // Body is typed as { name: string }
  },
)
```

## Runtime + Type-Safe Request Utils

Two new utility functions, `getValidatedQuery(event, validator)` and `readValidatedBody(event, validator)`, facilitate integration with schema validators such as [zod](https://zod.dev/) for both runtime and type safety.

```ts
import { z } from 'zod'

const userSchema = z.object({
  name: z.string().default('Guest'),
  email: z.string().email(),
})

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => userSchema.safeParse(body)) // or `.parse` to directly throw an error

  if (!result.success)
    throw result.error.issues

  // User object is validated and typed!
  return result.data
})
```

## Additional Utilities

We've introduced several other utilities to further enhance the web app development experience:

- `getRequestIP(event, { xForwardedFor? })`: Retrieve the incoming request IP.
- `readFormData(event)`: Read the request body into [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData).
- `clearResponseHeaders(event)`: Clear all response headers.
- `removeResponseHeader(event, name)`: Remove a specific response header.
- `serveStatic(event, options)`: Platform-agnostic static asset server. Check out the [listhen source](https://github.com/unjs/listhen/blob/af6ea3af3fec4289c00b0ba589ca6f63c6a5dbbd/src/server/dev.ts#L66) for an example of usage with Node.js.

## Effortless TypeScript Development with HMR

We've also released an updated version of [unjs/listhen](https://listhen.unjs.io) that seamlessly integrates with H3 apps.

All you need to do is create an `index.ts` file:

```ts
import { createApp, eventHandler } from 'h3'

export const app = createApp()

app.use('/', () => 'Hello world!')
```

Run `npx listhen@latest -w ./index.ts` to initiate a development server with TypeScript support, Hot Module Replacement (HMR), and static asset server.

[Online Playground](https://stackblitz.com/github/unjs/h3/tree/main/playground?startScript=dev)

![Screenshot of listhen](https://raw.githubusercontent.com/unjs/listhen/main/.assets/screenshot.png){withoutBorder}

## Full Changelog

For a comprehensive list of changes, refer to the [release notes](https://github.com/unjs/h3/releases/tag/v1.8.0).
