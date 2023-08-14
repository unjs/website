---
title: H3 1.8 - Towards the Edge of the Web!
description: Announcing H3 1.8 Release
# image:
#   src:
#   alt:
authors:
  - name: Pooya Parsa
    picture: https://github.com/pi0.png
    twitter: _pi0_
categories:
  - h3
packages:
  - h3
publishedAt:
modifiedAt:
layout: blog-post
---

> H3 is a universal H(TTP) framework written in TypeScript powering [Nitro](https://nitro.unjs.io/) and [Nuxt](https://nuxt.com/) today.

H3 was born [almost two years ago](https://github.com/unjs/h3/tree/cbc8909b2003d6d5df694ab7a36aa067cc990c74) with the goal of making the smallest  HTTP framework for [Nuxt 3](https://nuxt.com/) with [Node.js](https://nodejs.org/en) compatibility, elegant developer experience, and a futuristic vision to be compatible with Edge and web worker runtimes out of the box which back in the time was a new concept.

At the same time, we have developed [unjs/unenv](https://github.com/unjs/unenv/tree/main) a thin layer to unblock Node.js libraries and HTTP middleware for Edge-compatible runtimes without Node.js. This was crucial to make sure we can leverage most of the NPM and Node.js ecosystem to develop applications without making everything from scratch. H3 and unenv together made [Nitro](https://nitro.unjs.io) one of the first web frameworks that is fully compatible with Edge runtimes.

This release brings H3 even closer to a native Web API compatibility out of the box.

### Web and Plain Adapters

We have introduced a new built-in adapter with [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) compatible signature with [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) input and [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) return value.

This means that you can directly run your H3 applications out of the box on [Cloudflare Workers](https://workers.cloudflare.com/), [Deno Deploy](https://deno.com/deploy), [Bun](https://bun.sh/), and [Lagon](https://lagon.app/).

Check out the [h3-on-edge](https://github.com/pi0/h3-on-edge) repository for examples and [demo](https://h3-on-edge.deno.dev/).

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

In addition to web handlers, we have introduced a new plain adapter format with `toPlainHandler(app)` syntax. This allows to virtually integrate H3 with any serverless platform with plain input and response objects!

All of this is possible using new streaming and [unjs/unenv](https://unenv.unjs.io) that brings super lightweight Node.js compat layer. Before, this was only possible with [Nitro presets](https://nitro.unjs.io/deploy).

Additionally, we have introduced new web helpers:

- `toWebRequest`: Convert a H3 event object to web [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
- `getRequestWebStream`: Get a readable stream from the current H3 event request.
- `fromPlainHandler`: Convert a plain object handler into H3 compatible event handler
- `fromWebHandler`: Convert a Web Request/Response handler into H3 compatible event handler

### Web Streams Support

H3 now supports native [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) responses. This brings out-of-the-box compatibility with modern new libraries such as [Vercel/AI](https://github.com/vercel/ai) with streaming responses ([demo](https://github.com/Hebilicious/nuxt-openai-vercel-edge-demo)).

In order to leverage this functionality, you can simply return a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) or [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object from your event handlers!

```ts
export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'text/html')
  const encoder = new TextEncoder()
  const stream = new ReadableStream({
    async start(controller) {
      for (const token of 'Straming is so cool with H3!'.split(' ')) {
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

For advanced use cases, you might also use `sendStream` and `sendWebResponse` utilities instead of returning the stream.

### Object Syntax Event Handlers

H3 supports a new way to define event handlers with Object syntax. Using object syntax you can define hooks that run before or after each handler such as authentication or compression middleware.

```ts
const auth = defineRequestMiddleware((event) => {
  event.context.auth = { name: 'admin' }
})

const compression = defineResponseMiddleware((event) => {
  // Checkout this example: https://stackblitz.com/edit/github-mb6bz3
})

export default eventHandler({
  onRequest: [auth],
  beforeResponse: [compression],
  async handler(event) {
    return `Hello ${event.context.auth?.name || 'Guest'}`
  },
})
```

### Typed Event Handler Requests

You can now define H3 event types using new generic type support.

When typing, request utilities will be aware of the event input types.

This also unblocks us to improve types `$fetch` handlers in upstream frameworks.

```ts
export default eventHandler<{ body: { name: string }; query: { id: string } }>(
  (event) => {
    const query = getQuery(event) // Query is typed as { id: string }
    const body = await readBody(event) // Body is typed as { name: string }
  },
)
```

### Runtime + Type-Safe Request Utils

Two new `getValidatedQuery(event, validator)` and `readValidatedBody(event, validator)` utils, allow integration with schema validators such as [zod](https://zod.dev/) for both runtime and type safety.

```ts
const userSchema = z.object({
  name: z.string().default('Guest'),
  email: z.email().required(),
})

export default defineEventHandler((event) => {
  const user = await readValidatedBody(event, userSchema.parse)
  // User object is validated and typed!
  return {
    user
  }
})
```

## More Utils

We have introduced a couple of more utils to make the web app development experience even easier:

- `getRequestIP`: Get the incoming request IP. `X-Forwarded-For` can be optionally enabled
- `readFormData`: Read request body into [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- `serveStatic`: Platform agnostic static asset server. Checkout [listhen source](https://github.com/unjs/listhen/blob/af6ea3af3fec4289c00b0ba589ca6f63c6a5dbbd/src/server/dev.ts#L66) for an example usage with Node.js.
- `clearResponseHeaders`: Clear all (current) response headers
- `removeResponseHeader`: Remove a specific response header

## Easy Development with Typescript and HMR

We have released a new version of [unjs/listhen](https://listhen.unjs.io) that is compatible with H3 apps out of the box.

Now all you have to do is to create an `index.ts` file:

```ts
import { createApp, eventHandler } from 'h3'

export const app = createApp()

app.use('/', () => 'Hello world!')
```

And run `npx listhen -w ./index.ts` to run a development server with TypeScript, HMR and Static asset support!

👉 [Online Playground](https://stackblitz.com/github/unjs/h3/tree/main/playground?startScript=dev)

<img width="80%" src="https://raw.githubusercontent.com/unjs/listhen/main/.assets/screenshot.png">

## Full Changelog

Check out the [release notes](https://github.com/unjs/h3/issues/486) for a full changelog.
