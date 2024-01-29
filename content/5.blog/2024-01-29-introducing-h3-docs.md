---
title: Introducing H3 Docs
description: H3, the under layer of Nitro has now it's own documentation website to help you to understand it in depth.
authors:
  - name: Pooya Parsa
    picture: https://github.com/pi0.png
    twitter: _pi0_
  - name: Estéban S
    picture: https://github.com/barbapapazes.png
    twitter: soubiran_
categories:
  - h3
  - documentation
packages:
  - h3
publishedAt: 2024-01-29
modifiedAt: 2024-01-29
---

This was heavily requested and it's now a reality, H3 has now it's own documentation website.

If you can't wait to see it, go to [h3.unjs.io](https://h3.unjs.io)!

Until now, the way to learn H3 was reading the little README on the [GitHub repository](https://github.com/unjs/h3j), the [JSDoc comments](https://www.jsdocs.io/package/h3) or the code itself. Terrible right?

## Complete Documentation

<!-- TODO: add images from the home -->

The new documentation tries to be as explicit as possible and cover all the aspects of H3.

<!-- TODO: add image of the getting-started with the Nav -->

We have a dedicated section to the concept of H3 including:

- [App](https://h3.unjs.io/concepts/app)
- [Event Handlers](https://h3.unjs.io/concepts/event-handlers)
- [Middleware](https://h3.unjs.io/concepts/middleware)
- [Event](https://h3.unjs.io/concepts/event)
- [Routing](https://h3.unjs.io/concepts/routing)
- [Utilities](https://h3.unjs.io/concepts/utilities)

We have also written some guides to help you understand own to use some important H3 utilities:

- [From Express.js to H3](https://h3.unjs.io/guides/from-expressjs-to-h3)
- [Handle Cookie](https://h3.unjs.io/guides/handle-cookie)
- [Handle Session](https://h3.unjs.io/guides/handle-session)
- [Serve Static Assets](https://h3.unjs.io/guides/serve-static-assets)
- [Stream Response](https://h3.unjs.io/guides/stream-response)
- [Validate Data](https://h3.unjs.io/guides/validate-data)

2 sections are dedicated to the adapters and runtimes, explaining how H3 can be used with different runtimes and how H3 create agnostic applications that you can deploy anywhere.

And of course, we have a dedicated section for the API documentation.

## Revamped Theme

For this new documentation, we decided to use the same theme as the one used for the [UnJS website](https://unjs.io) starting moving away from Docus theme.

We actually use an in-house tool called [unjs-docs](https://github.com/unjs/unjs-docs) to generate our documentation build on top of [Nuxt UI](https://ui.nuxt.com/).

This will allow us to build better documentation in the future and to have a consistent experience across all our documentation websites.

## Finally

We hope you will enjoy this [new H3 documentation](https://h3.unjs.io) and learn a lot about H3.

And if it's not the case, it's open-source so you can contribute to it [on GitHub](https://github.com/unjs/h3).

If you have any feedback, please share it with us [on X](https://x.com/unjsio)!
