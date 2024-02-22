---
title: Add a Playground to an npm Package
description: Try our npm package locally with a playground.
authors:
  - name: Estéban S
    picture: https://github.com/barbapapazes.png
    twitter: soubiran_
category: building-blocks
packages:
  - unbuild
  - jiti
resources:
  - label: Unbuild Examples
    to: https://github.com/unjs/unbuild/tree/main/examples
    icon: i-simple-icons-github
  - label: UnJS Template
    to: https://github.com/unjs/template
    icon: i-simple-icons-github
publishedAt: 2024-02-18
modifiedAt: 2024-02-18
---

[In the previous article](https://unjs.io/learn/articles/2024-02-17-create-an-npm-package) of this series, we set up an npm package from scratch. We added a `package.json`, a simple JavaScript file, and unbuild to build our package before publishing it.

> [!NOTE]
> For a better understanding of this article, we recommend reading [the previous one](https://unjs.io/learn/articles/2024-02-17-create-an-npm-package).

Now, before learning how to publish it, we'll see how to **try our package locally** with a playground.

## A Playground

The main question that we should have in mind is: "What is a playground and why should I add one to my package?"

A playground is a simple way to try your package locally within the same repository. This avoids us having to make complex manipulations to verify that your package is working as expected and helps others to try the package. For open source or with a team, it's important to have a **simple way** to try the package.

> [!TIP]
> The idea is to try it in real conditions. Manual tests do not replace unit tests.

Concretely, we have a `src` directory with our package code. We will add a `playground` directory with a project that can use our package. In this playground, we will be able to play with our package and verify that it's working as expected.

It's important to note that the playground is not part of our package since it's not added to the `files` field of our `package.json`. This means that the playground will not be published on npm when we publish our package.

> [!NOTE]
> Keep in mind that the content of the `playground` directory must reflect our needs. Sometimes, a simple `index.js` or `index.html` file is enough but sometimes we will need to deploy a full Vite application.

## Adding a Playground

There are many ways to add a playground to our package. We will see 3 of them, and choosing one or the other depends on our needs and our preferences. Each of them has its own advantages and disadvantages.

> [!IMPORTANT]
> It is not mandatory to manage our playground using a package manager. We can simply import from `src` with `../src`. It could be enough for a lot of cases. But in case we need a more complex playground, let's see how to do it.

We will see how to add a playground to our package using bund and pnpm. Npm does not support the `workspace` protocol, useful to link our package to the playground. If we use npm, simply use a direct import from `../src`.

> [!TIP]
> See [unjs/template](https://github.com/unjs/template) for a more complete project setup.

### Source Reference

This is the simplest solution if your package runs in Node.js like a set of utility functions. In the `playground` directory, we can import our package directly from the `src` directory.

```js [playground/index.mjs]
import { app } from '../src/index.js'

console.log(app())
```

By doing this, we are able to test our package locally and with ease.

> [!TIP]
> Works well with TypeScript but instead of using `.mjs` files, we can use `.ts` files and execute them with [`unjs/jiti`](https://github.com/unjs/jiti) with the command `npx jiti playground`.

The main drawback of this solution is that we do not need the `export` key from the `package.json` file so it's not the most accurate way to try our package.

> [!TIP]
> Most of the time, it's not necessary to make things more complex and because `unbuild` infer the `export` field, we can be confident that our package is working as expected.

That's it! Read [Using the Playground](#using-the-playground) to see how to use it.

> [!TIP]
> See [unjs/template](https://github.com/unjs/template) for a more complete project setup.

### Dist Reference

Sometimes, we need to use the `dist` directory instead of the `src` directory. Imagine a situation of building something for the browser but the library is in TypeScript. The browser does not understand TypeScript so we need to build it to JavaScript.

For example, we can use `unbuild` to build our package and then use the `dist` directory in the playground.

```js [playground/index.mjs]
// eslint-disable-next-line antfu/no-import-dist
import { app } from '../dist/index.mjs'

console.log(app())
```

**This is not recommended** and your linter could complain about it but it's good to know that it's possible.

Instead, use a minimal [Vite](https://vitejs.dev/) project inside our playground to easily support TypeScript without building the package. This can be achieved using the [direct reference](#source-reference) or a [pnpm workspace](#monorepo-with-pnpm).

> [!TIP]
> Please read [direct reference](#source-reference) or [pnpm workspace](#monorepo-with-pnpm) section for a better playground setup. This section is for educational purposes only.

### Monorepo with pnpm

Pnpm has a concept of workspace that allows us to manage multiple packages in the same repository. This means that our package will be a workspace and the playground will be another workspace that will consume our package as a dependency, as if it were published on npm.

This strategy is interesting to **verify** that **our export**, especially `types`, are working as expected.

In order to do this, we need to add a `pnpm-workspace.yaml` file at the root of our repository. This file will contain the following content:

```yaml
packages:
  - playground
```

Then, we need to add a `playground` directory at the root of our repository. This directory will contain a `package.json` file with the following content:

```json
{
  "name": "playground",
  "private": true,
  "dependencies": {
    "our-package": "workspace:*"
  }
}
```

Finally, we need to run `pnpm install` at the root of our repository to install our package in the playground.

That's it! Read [Using the Playground](#using-the-playground) to see how to use it.

:read-more{to="https://pnpm.io/workspaces" title="Pnpm Workspaces"}

## Using the Playground

Now that we have a playground, we can use it to try our package. For the direct reference, there is nothing to do. We can simply run the `index.mjs` file with Node.js.

```sh
node playground/index.mjs
```

For the monorepo with pnpm, we will need to build the project before using it:

```json [package.json]
{
  "scripts": {
    "build": "unbuild"
  }
}
```

Then, we can run the `build` script to build our package:

```sh
pnpm build
```

The thing is that we do not want to build our package manually every time we make a change. For a better developer experience, it's better to have a mechanism that will rebuild our package when we make a change.

There are two ways to do this: a _passive_ watcher and an active watcher.

The active watcher is the most common pattern. You start a watcher that watches for changes and rebuilds the package when a change is detected.

The passive watcher is a bit different because there is no watcher. Instead, we use a command to generate a proxy output. This proxy is a simple file that will load requested files on the fly and transpile them. This method is very efficient because there is no need for another process, and it's very fast.

unbuild takes the second approach with the `--stub` option. Run 'unbuild --stub' to generate the passive watcher and take a look at the `dist` directory. You will see an `index.mjs` file that loads on the fly the `src` directory.

```sh
unbuild --stub
```

```js [dist/index.mjs]
// eslint-disable-next-line antfu/no-import-node-modules-by-path
import jiti from 'file:///our-package/node_modules/.pnpm/jiti@1.21.0/node_modules/jiti/lib/index.js'

/** @type {import("file:///our-package/src/index")} */
const _module = jiti(null, {
  esmResolve: true,
  interopDefault: true,
  alias: {
    'our-package': 'file:///our-package'
  }
})('file:///our-package/src/index.ts')

export const test = _module.test
```

In the `index.mjs` file in the `playground` directory, set up with a monorepo with pnpm, we can use our package:

```js [playground/index.mjs]
import { app } from 'our-package'

console.log(app())
```

Update the `src/index.ts` file and rerun the `playground/index.mjs` file. It's working! The playground takes the changes but the package is not rebuilt. No need to run `pnpm build` every time we make a change or to wait for a watcher to rebuild the package.

:read-more{to="https://antfu.me/posts/publish-esm-and-cjs" title="Publish ESM and CJS by Anthony Fu"}

> [!TIP]
> See [unjs/template](https://github.com/unjs/template) for a more complete project setup.

### As a Real npm Package

With [`npm`](https://docs.npmjs.com/cli/v10/commands/npm-link), [`pnpm`](https://pnpm.io/cli/link) or [`bun`](https://bun.sh/docs/cli/link), we can use the `link` command.

Run this command at the root of our repository to create a link of our package:

```sh
npm link
```

Then, we run this command in **another project**, not in the playground, where we want to use our package:

```sh
npm link our-package # `our-package` is the name of our package but it could be different
```

We can now use our package as if it was published on npm.

> [!TIP]
> Do not forget to build the package.

## Finally

During this article, we learned why a playground is important as a developer to try out a package locally. We then saw different ways to add a playground to our package and how to use it.

This was an occasion to discover the `unbuild --stub` feature and how to use it within a monorepo with pnpm.

In future articles, we will see how to **publish the package** on npm, how to **create a package with TypeScript**, and how to **automate the process** with [unjs/changelogen](https://changelogen.unjs.io/).
