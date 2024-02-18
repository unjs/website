---
title: Create a npm Package
description: Simplify the process of creating a npm package with unbuild.
authors:
  - name: Estéban S
    picture: https://github.com/barbapapazes.png
    twitter: soubiran_
category: getting-started
packages:
  - unbuild
resources:
  - label: Unbuild Examples
    to: https://github.com/unjs/unbuild/tree/main/examples
    icon: i-simple-icons-github
publishedAt: 2024-02-17
modifiedAt: 2024-02-17
---

Creating a npm package is not just about publishing source code to the [npm registry](https://www.npmjs.com/). It's way more than that and can become very tricky but this article will explain the basics of the process.

> [!NOTE]
> This article is part of a series of articles about creating and publishing a npm package.

## The npm Registry

When we start learning development with JavaScript, we rapidly learn about using external libraries, also called dependencies. We install them using [`npm install`](https://docs.npmjs.com/cli/commands/npm-install) command.

They are extremely powerful because they allow us to use and reuse code written by other developers or in multiple projects. No body wants to reinvent the wheel, right?

So the npm registry is a place, like a store, where developers can publish their packages and share them with everyone. Some other developers can then install these packages in their projects to use them.

## Today's Problems

### CJS and ESM

At the beginning of JavaScript, there was no standard module system. In other words, there was no way to split your code in multiple files. In 2009, [Node.js](https://nodejs.org/) is introduced and it comes the possibility to use JavaScript on the server side. Because of that, the needs to split code in multiple files becomes more and more important and some people start working on a standard named CommonJS, also known as CJS.

```js [CJS]
const app = require('packageName')
```

The problem with CommonJS is that it's not part of the language itself and suffers from some limitations. In 2015, the [ECMAScript 6](https://www.ecma-international.org/ecma-262/6.0/) specification is released and it introduces a new module system called [ECMAScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) (also known as ESM).

```js [ESM]
import app from 'packageName'
```

This new standard enables named exports, better static analysis, tree-shaking, browser native support and because it's part of the language, it's the future of JavaScript.

> [!NOTE]
> It's possible to use it natively in Node.js by adding the [`type: "module"`](https://nodejs.org/api/packages.html#packagejson-and-file-extensions) field in the `package.json` file.

The nice part is that ESM support CJS imports but the opposite is not true. This means that if we want to publish a package, for compatibility reasons, we must publish it in both formats.

This is made possible by the `package.json` file and the `exports` field that allows us to specify the entry point for both formats.

```json [package.json]
{
  "name": "packageName",
  "exports": {
    ".": {
      "import": "./esm/index.js", // ESM
      "require": "./cjs/index.js" // CJS
    }
  }
}
```

> [!NOTE]
> It's possible to publish a package in ESM only but developers that still use CJS will not be able to use it.

:read-more{to="https://antfu.me/posts/publish-esm-and-cjs" title="Publish ESM and CJS by Anthony Fu"}

### Types

Even if the project we do is not written with [TypeScript](https://www.typescriptlang.org/) having types for code completion and parameter info is very useful. In order to have this, packages must be published with special files called [type definitions](https://www.typescriptlang.org/docs/handbook/2/type-declarations.html).

> [!NOTE]
> Sometimes, packages are not shipped with type definitions. In this case, we can use the [`@types`](https://github.com/DefinitelyTyped/DefinitelyTyped) package to add them.

### TypeScript

Developers also use tools like [TypeScript](https://www.typescriptlang.org/) to write their source code for convenience. This must be transpiled to JavaScript before publishing the package to the npm registry to allow every developer to use it. We'll see in another article how to do that.

> [!NOTE]
> While it's technically possible to publish TypeScript code to the npm registry, it's not recommended because it's not compatible with all JavaScript environments.

## Unbuild

That's a lot of things to think about when we want to create a package for npm. The good news is that UnJS have a tool for us called unbuild.

Unbuild is a unified JavaScript build system that will simplify the process and avoid to think about all these problems.

The nice part about unbuild is that it does not need to write a complex configuration file. It infer the configuration from the `package.json` file.

To get started, create a new project:

```sh
mkdir create-a-npm-package
cd create-a-npm-package
npm init -y
```

Then install unbuild:

```sh
npm install -D unbuild
```

Our code source will live in a `src` directory. That's a convention from unbuild. Create a `src/index.js` file with the following content:

```js [src/index.js]
export function app() {
  return 'Hello, World!'
}
```

Then, add a `build` script in the `package.json` file:

```json [package.json]
{
  "scripts": {
    "build": "unbuild"
  }
}
```

We are nearly ready to build our package. We just need to add many fields in the `package.json` file to explain to the runtime how to use our package.

```json [package.json]
{
  "name": "create-a-npm-package",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs"
    }
  },
  "main": "./dist/index.cjs",
  "types": "./dist/index.d.ts",
  "files": ["dist"]
}
```

Some explanations about these fields:

- `type` is used to specify that we are using ESM.
- `exports` is used to specify the entry point for both formats.
- `main` is used to specify the default entry point. We use the CJS format since it's the most compatible.
- `types` is used to specify the type definitions file that are used by editors to provide code completion and parameter info.
- `files` is used to specify the files that will be included when the package is published.

Finally, run the build script:

```sh
npm run build
```

Take a quick look at the terminal. We can see `Automatically detected entries: src/index [esm] [cjs] [dts]` which means that unbuild has detected the entry points and the type definitions file.

We can open the `dist` directory and see that unbuild has created 5 files including 3 that we need: `index.mjs`, `index.cjs` and `index.d.ts`.

Perfect! You can play with the inference by editing the `package.json` file. Try to remove the `types` field and run the build script again. You will see that unbuild will not create the type definitions file.

> [!TIP]
> See [unjs/template](https://github.com/unjs/template) for a more complete project setup.

## Finally

During this article, we first learn about the actual problems when we want to create a npm package. This gives us a first answer to why we need to use a bundler like unbuild to create a package for the npm registry.

We then see how to create a npm package with the help of a powerful tool called unbuild. This was quite simple and manual. We only scratched the surface of what unbuild can do and how UnJS can help to create a package.

In future articles, we will see how to **add a playground** to play with the package locally, how to **publish the package** on npm, how to **create a package with TypeScript** and how to **automate the process** with [unjs/changelogen](https://changelogen.unjs.io/).
