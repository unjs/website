---
title: Introducing h3 Docs
description: h3, the under layer of Nitro has now it's own documentation website to help you to understand it in depth.
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
  - nitro
  - unstorage
publishedAt: 2024-02-24
modifiedAt: 2024-02-24
---

This was heavily requested and it's now a reality, h3 has now it's own documentation website.

If you can't wait to see it, go to [h3.unjs.io](https://h3.unjs.io)!

Until now, the way to learn h3 was reading the little README on the [GitHub repository](https://github.com/unjs/h3), the [JSDoc comments](https://www.jsdocs.io/package/h3) or the code itself. Terrible right?

But now, you can learn h3 with a dedicated documentation website. In  the journey to create the best documentation for h3, we made many other improvements.

## Complete Documentation

![h3 documentation home](/assets/images/blog/2024-02-24-introducing-h3-docs/home.webp)

The new documentation tries to be as explicit as possible and to cover all the aspects of h3.

![h3 documentation getting started](/assets/images/blog/2024-02-24-introducing-h3-docs/getting-started.webp)

We have a dedicated section of guides of h3 including:

- [Getting Started](https://h3.unjs.io/guides/getting-started)
- [App Instance](https://h3.unjs.io/guides/qpp)
- [Event Handlers](https://h3.unjs.io/guides/event-handlers)
- [Event Object](https://h3.unjs.io/guides/event)
- [Router](https://h3.unjs.io/guides/router)

We have also written some examples to help you understand own to use some important h3 utilities:

- [From Express.js to h3](https://h3.unjs.io/examples/from-expressjs-to-h3)
- [Handle Cookie](https://h3.unjs.io/examples/handle-cookie)
- [Handle Session](https://h3.unjs.io/examples/handle-session)
- [Serve Static Assets](https://h3.unjs.io/examples/serve-static-assets)
- [Stream Response](https://h3.unjs.io/examples/stream-response)
- [Validate Data](https://h3.unjs.io/examples/validate-data)

There is a whole section dedicated to the h3 adapters that will explain everything you need to know to deploy an h3 server everywhere.

And of course, we have a dedicated section for the API documentation called `Utils` that will explain all the utilities that h3 provides.

> [!NOTE]
> Contributions are more than welcome to help us to improve the documentation and to add more guides and examples.

## Revamped Theme

For this new documentation, we decided to use the same theme as the one used for the [UnJS website](https://unjs.io) starting moving away from Docus theme.

We actually use an in-house tool called [undocs](https://github.com/unjs/undocs) to generate our documentation build on top of [Nuxt UI Pro](https://ui.nuxt.com/pro). This allows us to build some tools to automate the documentation generation and to help in package maintenance.

- [mdbox](https//github.com/unjs/mdbox): Simple markdown utils to easily create a markdown document from JavaScript.
- [AutoMD](https//github.com/unjs/automd): A tool to automatically generate markdown document powered by multiple generators.

This will allow us to build better documentation in the future and to have a consistent experience across all our documentation websites.

[Nitro](https://nitro.unjs.io) and [Unstorage](https://unstorage.unjs.io) have already been migrated to this new theme!

## Finally

We hope you will enjoy this [new h3 documentation](https://h3.unjs.io) and learn a lot about h3.

And if it's not the case, it's open-source so you can contribute to it [on GitHub](https://github.com/unjs/h3).

If you have any feedback, please share it with us [on X](https://x.com/unjsio)!
