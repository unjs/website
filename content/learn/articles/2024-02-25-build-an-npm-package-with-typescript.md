---
title: Build an npm package with TypeScript
description: Seamless TypeScript support with unbuild.
authors:
  - name: Estéban S
    picture: https://github.com/barbapapazes.png
    twitter: soubiran_
category: building-blocks
packages:
  - unbuild
resources:
  - label: Unbuild Examples
    to: https://github.com/unjs/unbuild/tree/main/examples
    icon: i-simple-icons-github
  - label: UnJS Template
    to: https://github.com/unjs/template
    icon: i-simple-icons-github
publishedAt: 2024-02-25
modifiedAt: 2024-02-25
---

In the [first article of the series](/learn/articles/2024-02-17-create-a-npm-package), we explored how to create an npm package with JavaScript. But what about TypeScript? How to use it with unbuild?

> [!NOTE]
> This article is part of a series of articles about creating and publishing an npm package. If you haven't read the first article, I recommend you to do so before continuing.

## TypeScript on npm

Using TypeScript for a project is a great way to ensure type safety, better code quality, and a better developer experience. But things can get a bit tricky when it comes to building and publishing TypeScript packages.

Publishing **TypeScript packages directly to npm is a bad practice** because it forces the consumers of your package to work with TypeScript, even if they don't want to. This will force them to set up additional tools and configurations with a correct version for no good reason.

By publishing JavaScript files, you allow the consumers to use your package with any tooling they want, including TypeScript, without any additional configuration.

## TypeScript with unbuild

So using TypeScript is useful but publishing JavaScript files is better. Does this mean that we have to set up a complex build process to transpile TypeScript to JavaScript before publishing? Not at all!

TypeScript is a first-class citizen in unbuild. It is supported out of the box thanks to [unjs/jiti](https://github.com/unjs/jiti), and you don't need to do anything special to use it. You can write your package in TypeScript and unbuild will take care of the rest.

In a `src/index.ts` file, you can write your TypeScript code as you would normally do:

```ts [src/index.ts]
export function add(a: number, b: number): number {
  return a + b
}
```

The setup in the `package.json` is nearly the same as for JavaScript, except for the `types` fields that point to the TypeScript definition file:

```json
{
  "name": "create-a-npm-package",
  "type": "module",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.mts", // TypeScript definition file
        "default": "./dist/index.mjs"
      },
      "require": {
        "types": "./dist/index.d.cts", // TypeScript definition file
        "default": "./dist/index.cjs"
      }
    }
  },
  "types": "./dist/index.d.ts",
  "main": "./dist/index.cjs",
  "files": ["dist"]
}
```

> [!NOTE]
> The order of all of these fields matters. [`types` should always be before](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-7.html#packagejson-exports-imports-and-self-referencing).

Finally, just run `npm run build` to build the package and everything works as expected. TypeScript files are transpiled to JavaScript with the correct types definition files.

## Conclusion

With unbuild, building a TypeScript package is as easy as building a JavaScript package, which is really convenient.

We can now focus on writing our package without worrying about the build process, and we can be sure that the consumers of our package will have a great developer experience, no matter what tooling they use.
