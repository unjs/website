---
title: Monthly updates (September 2024)
description: 38 releases this month! What's new in the UnJS ecosystem?
authors:
  - name:
    picture:
    twitter:
category:
  - releases
packages:
  - c12
  - changelogen
  - crossws
  - jiti
  - listhen
  - mkdist
  - nypm
  - ofetch
  - ohash
  - unbuild
  - undocs
  - unhead
  - unstorage
  - untyped
publishedAt: 2024-09-28T01:14:13.708Z
modifiedAt: 2024-09-28T01:14:13.708Z
---

## c12

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v1.11.2](https://github.com/unjs/c12/releases/tag/v1.11.2)

### fixes

- **updateConfig:** Properly resolve config relative to cwd ([#188](https://github.com/unjs/c12/pull/188))

## changelogen

This month, we release 2 new releases (0 major release, 0 minor release and 2 patch releases):

- [v0.5.7](https://github.com/unjs/changelogen/releases/tag/v0.5.7)
- [v0.5.6](https://github.com/unjs/changelogen/releases/tag/v0.5.6)

### fixes

- **bump:** Avoid using `+` for canary suffix ([#224](https://github.com/unjs/changelogen/pull/224))

### enhancements

- Add option to sign git tags ([#117](https://github.com/unjs/changelogen/pull/117))
- **git:** Support parse git messages that have prefix emoji ([#146](https://github.com/unjs/changelogen/pull/146))
### fixes
- **github:** Use bearer token ([#180](https://github.com/unjs/changelogen/pull/180))
- Handle repo name with multiple segments ([#219](https://github.com/unjs/changelogen/pull/219))
- Lowercase scope when filtering ([#199](https://github.com/unjs/changelogen/pull/199))

### refactors

- Replace `execa` with `execSync` ([#222](https://github.com/unjs/changelogen/pull/222), [68127be](https://github.com/unjs/changelogen/commit/68127be))
- Use human readable date for canary versions ([#223](https://github.com/unjs/changelogen/pull/223))

## crossws

This month, we release 2 new releases (0 major release, 1 minor release and 1 patch release):

- [v0.3.1](https://github.com/unjs/crossws/releases/tag/v0.3.1)
- [v0.3.0](https://github.com/unjs/crossws/releases/tag/v0.3.0)

### fixes

- **types:** `AdapterOptions` type ([#80](https://github.com/unjs/crossws/pull/80))

### 🌟 what is new?



### better stability

Crossws 0.3.x includes an overhaul of refactors, stability improvements, and new features. A new codebase and testing matrix had been implemented ([#55](https://github.com/unjs/crossws/pull/55)) to make sure all supported adapters and runtimes work as expected and are consistent with each other.

### refined peer api

The peer object allows easy interaction with connected WebSocket clients from server route hooks ([peer docs](https://crossws.unjs.io/guide/peer)).
To improve Web standards compatibility, accessing upgrade URL and headers is now possible with `peer.request.url` and `peer.request.headers` (**breaking change**), and `peer.addr` is also renamed to `peer.remoteAddress` to improve readability (**breaking change**) and support is increased across providers. You can also use new lazy-generated and secure `peer.id` (UUID v4) for various purposes including temporary sessions or persistent state.
Two new methods are now supported to close connected peers using `peer.close(code, reason)` and `peer.terminate()`. With this new version, you can access a standard [`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) interface using `peer.websocket`.
> [!NOTE]
> Today many of the server runtimes don't provide a spec-compliant `WebSocket` API. Crossws uses an internal proxy to polyfill consistent access to `extensions`, `protocol`, and `readyState`. See [compatibility table](https://crossws.unjs.io/guide/peer#compatibility) for more details.

### refined message api

On `message` [hook](https://crossws.unjs.io/guide/hooks), you receive a message object containing data from the client ([message docs](https://crossws.unjs.io/guide/message)).
Parsing incoming messages can be tricky across runtimes. Message object now has stable methods `.text()`, `.json()`, `.uint8Array()`, `.arrayBuffer()`, `.blob()` to safely read message as desired format. If you need, you can also access `.rawData`, `.peer`, `.event` (if available), and lazy generated secure  UUID v4 `.id`

### authentication via `upgrade` hook

When you need to authenticate and validate WebSocket clients before they can upgrade, you can now easily use the `upgrade` hook to check incoming URLs and headers/cookies and return a Web Standard [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) in case you need to abort the upgrade.

### pubsub with deno and cloudflare durable objects

One of the common use cases of WebSockets is pubsub. This release adds pub-sub support to [Deno provider](https://crossws.unjs.io/adapters/deno) and also you can globally broadcast messages using `ws.publish` for advanced use cases.
Normally with cloudflare workers, it is not possible to connect multiple peers with each other. Cloudflare [Durable Objects](https://developers.cloudflare.com/durable-objects/) (available on paid plans) allows building collaborative editing tools, interactive chat, multiplayer games, and applications that need coordination among multiple clients.
Crossws provides a new composable method to easily integrate WebSocket handlers with Durable Objects. Hibernation is supported out of the box to reduce billing costs when connected clients are inactive. ([durable object peer docs](https://crossws.unjs.io/adapters/cloudflare#durable-objects))

### changelog



### enhancements

- ⚠️  Overhaul internal implementation ([#55](https://github.com/unjs/crossws/pull/55))
- ⚠️  Overhaul peer and message interface ([#70](https://github.com/unjs/crossws/pull/70))
- **node, uws:** Automatically detect binary message type ([#53](https://github.com/unjs/crossws/pull/53))
- **peer:** Add `peer.close()` and `peer.terminate()` support ([#36](https://github.com/unjs/crossws/pull/36))
- Cloudflare durable objects support ([#54](https://github.com/unjs/crossws/pull/54)) ([docs](https://crossws.unjs.io/adapters/cloudflare#durable-objects))
- **deno:** Support pub/sub ([#58](https://github.com/unjs/crossws/pull/58))
- Universal access to all peers ([#60](https://github.com/unjs/crossws/pull/60))
- Global publish using `ws.publish` ([#61](https://github.com/unjs/crossws/pull/61))
- Experimental SSE-based adapter to support websocket in limited runtimes ([#62](https://github.com/unjs/crossws/pull/62), [#66](https://github.com/unjs/crossws/pull/66),  [#68](https://github.com/unjs/crossws/pull/68)) ([docs](https://crossws.unjs.io/adapters/sse)
- **peer:** Use secure lazy random UUID v4 ([#64](https://github.com/unjs/crossws/pull/64))
### fixes
- Should not serailize binary messages ([#39](https://github.com/unjs/crossws/pull/39))
- **cloudflare-durable:** Restore peer url and id after hibernation ([#71](https://github.com/unjs/crossws/pull/71))

### refactors

- ⚠️  Move `peer.ctx` to `peer._internal` ([#59](https://github.com/unjs/crossws/pull/59))
- ⚠️  Remove adapter hooks ([#72](https://github.com/unjs/crossws/pull/72))
- Rename internal crossws to hooks ([bb4c917](https://github.com/unjs/crossws/commit/bb4c917))
- Better internal organization ([2744f21](https://github.com/unjs/crossws/commit/2744f21))

### documentation

[#22](https://github.com/unjs/crossws/pull/22), [76fc105](https://github.com/unjs/crossws/commit/76fc105), [7dacb00](https://github.com/unjs/crossws/commit/7dacb00), [#46](https://github.com/unjs/crossws/pull/46), [#45](https://github.com/unjs/crossws/pull/45), [#44](https://github.com/unjs/crossws/pull/44), [a96dca3](https://github.com/unjs/crossws/commit/a96dca3), [898ab49](https://github.com/unjs/crossws/commit/898ab49), [2e49cc3](https://github.com/unjs/crossws/commit/2e49cc3)

## jiti

This month, we release 2 new releases (1 major release, 0 minor release and 1 patch release):

- [v2.0.0](https://github.com/unjs/jiti/releases/tag/v2.0.0)
- [v2.0.0-rc.1](https://github.com/unjs/jiti/releases/tag/v2.0.0-rc.1)

### 🌟 highlights



### 🔥  native esm

jiti v2 now natively supports ESM import and resolution with new API `await jiti.import(id)` and `jiti.esmResolve(id)`. This allows top-level `await` and native+faster importing of ES-only modules with increased compatibility

### ⚛️ jsx support

You can now directly import `.jsx`/`.tsx` files with jiti! See examples with [nano-js](https://github.com/unjs/jiti/blob/main/test/fixtures/jsx/nano-jsx.jsx),  [preact](https://github.com/unjs/jiti/blob/main/test/fixtures/jsx/preact.jsx), [React](https://github.com/unjs/jiti/blob/main/test/fixtures/jsx/react.jsx) and [Vue](https://github.com/unjs/jiti/blob/main/test/fixtures/jsx/vue.jsx). This feature is opt-in for now (using `jsx: true` or `JITI_JSX=true`). Jiti is considering a [smarter lib detection](https://github.com/unjs/jiti/issues/302) for wider support before enabling JSX support by default.

### 📦 dual format package exports

`jiti` package exports are now in a dual (ESM/CJS) format for better importing of jiti in ESM contexts.

### 🎈 `jiti/native`

As native ESM and Typescript support is being increased across runtimes, a new export in jiti allows easing up the transition by giving the same API of jiti but instead only depending on runtime [`import.meta.resolve`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta/resolve) and dynamic [`import()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import) support. This is possible by making an alias for `jiti` to `jiti/native`.

### 🚚 esm loader

You can globally register jiti using Node.js [global hooks](https://nodejs.org/api/module.html#initialize) (experimental).
CLI:
```bash

### instead of `npx jiti index.ts`

node --import jiti/register index.ts
```
Programmatic:
```js
import "jiti/register";
// or
await import("jiti/register");
```

### 🔍 better inspection

You can inspect what jiti internals using [`debug`](https://github.com/unjs/jiti#debug) option or `JITI_DEBUG=1` environment variable. The output is now more readable and with colors to easily find slow imports.
jiti will also use `node_modules/.cache/jiti` directory instead of temp dir (if `node_modules` exists) to store caches for easier local inspections.
<img width="708" alt="image" src="https://github.com/user-attachments/assets/cf813cc3-546e-410a-a9cf-f713279a095c">

### ⬆️ migration

Upgrade `jiti` dependency to `^2.0.0` in `package.json`
Use new `createJiti` named export :
ESM:
```diff js
--- import createJiti from "jiti"
+++ import { createJiti } from "jiti"
const jiti = createJiti(import.meta.url)
```
CommonJS:
```diff
--- const createJiti = require("jiti")
+++ const { createJiti } = require("jiti")
const jiti = createJiti(__filename)
```
Migrate from CommonJS to ESM API: (**highly recommended!**)
Importing modules:
```diff
--- const mood = jiti('mod')
+++ const mood = await jiti.import('mod')
```
Resolving modules:
```diff
--- const path = jiti.resolve('mod')
+++ const path = jiti.esmResolve('mod')
```

### ❤️ thank you!

This release wasn't possible without valuable ecosystem feedback and [contributors](https://github.com/unjs/jiti/graphs/contributors).  With the trust of [users](https://github.com/unjs/jiti/tree/v2.0.0?tab=readme-ov-file#-used-in) with astonishing [**60M+** monthly downloads](https://npm.chart.dev/jiti), i hope jiti v2 can help speed up the ecosystem transition to ESM and Typescript.
---

### changes since v1



### enhancements

- top-level `await` support ([#239](https://github.com/unjs/jiti/pull/239))
- Native ESM support ([#259](https://github.com/unjs/jiti/pull/259))
- Add experimental ESM loader support ([#266](https://github.com/unjs/jiti/pull/266))
- Allow try and other resolve options for `jiti.esmResolve` ([#268](https://github.com/unjs/jiti/pull/268))
- Allow configure `interopDefault` using `JITI_INTEROP_DEFAULT` env ([1c080a1](https://github.com/unjs/jiti/commit/1c080a1))
- `jiti/native` subpath ([#289](https://github.com/unjs/jiti/pull/289)) ([#294](https://github.com/unjs/jiti/pull/294)) ([#293](https://github.com/unjs/jiti/pull/293))
- Handle `data:` imports ([#299](https://github.com/unjs/jiti/pull/299))
- Support opt-in JSX ([#200](https://github.com/unjs/jiti/pull/200))
- Eval ESM modules with fallback loader ([#300](https://github.com/unjs/jiti/pull/300))
- Support `import.meta.resolve` ([#301](https://github.com/unjs/jiti/pull/301))

### 🔥 performance

- Reduce overhead of jiti sub-instances ([#265](https://github.com/unjs/jiti/pull/265))
- Use native `createRequire` ([69da3c5](https://github.com/unjs/jiti/commit/69da3c5))

### fixes

- Use distinct cache paths for async mode ([6e8ec7a](https://github.com/unjs/jiti/commit/6e8ec7a))
- Resolve with ESM conditions in async context ([#264](https://github.com/unjs/jiti/pull/264))
- **cache:** Prefer `node_modules/.cache` if exists ([832f206](https://github.com/unjs/jiti/commit/832f206))
- Use native ESM import for built-ins ([54d6b4a](https://github.com/unjs/jiti/commit/54d6b4a))
- Respect `interopDefault` in babel transform ([485b4e9](https://github.com/unjs/jiti/commit/485b4e9))
- Split cache based on `interopDefault` ([f820a15](https://github.com/unjs/jiti/commit/f820a15))
- Remove extention from cache path ([50b1b3a](https://github.com/unjs/jiti/commit/50b1b3a))
- Properly resolve `.mts`/`.cts` with `.mjs`/`.cjs` imports ([a5aefad](https://github.com/unjs/jiti/commit/a5aefad))
- **resolve:** Make sure `parentURL` is a dir ([d224e84](https://github.com/unjs/jiti/commit/d224e84))
- Handle global `URL` instance mismatch ([#298](https://github.com/unjs/jiti/pull/298))
- Optional access to `Reflect.metadata` for typescript decorators ([#165](https://github.com/unjs/jiti/pull/165))
- Only pass `paths` option to native `require.resolve` ([50e4280](https://github.com/unjs/jiti/commit/50e4280))

### refactors

- Split option normalization ([#172](https://github.com/unjs/jiti/pull/172))
- Split logic ([#240](https://github.com/unjs/jiti/pull/240))
- Remove legacy Node.js syntax polyfills ([#260](https://github.com/unjs/jiti/pull/260))
- 3rd arg to `createJiti` is optional ([60a23e3](https://github.com/unjs/jiti/commit/60a23e3))
- Upgrade cache version to 8 ([99224ae](https://github.com/unjs/jiti/commit/99224ae))
- Use more clear `fsCache` and `moduleCache` options ([#263](https://github.com/unjs/jiti/pull/263))
- Use ESM imports for babel plugins ([22e259f](https://github.com/unjs/jiti/commit/22e259f))
- Improve debug logging ([463a8a3](https://github.com/unjs/jiti/commit/463a8a3))
- Rename `importResolve` to `esmResolve` ([aac88e6](https://github.com/unjs/jiti/commit/aac88e6))
- Improve env handling ([ee4489d](https://github.com/unjs/jiti/commit/ee4489d))
- Use `import`/`require` in debug logs ([934a5bb](https://github.com/unjs/jiti/commit/934a5bb))
- Improve internal babel types ([#271](https://github.com/unjs/jiti/pull/271))
- Rename `experimentalBun` option to `tryNative` ([#295](https://github.com/unjs/jiti/pull/295))
- Make `jiti.esmResolve` consistent with `import.meta.resolve` ([#303](https://github.com/unjs/jiti/pull/303))

### documentation

- Update bundlephobia link ([#179](https://github.com/unjs/jiti/pull/179))
- Add example for inline `JITI_ALIAS` ([a53715a](https://github.com/unjs/jiti/commit/a53715a))

## listhen

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v1.8.0](https://github.com/unjs/listhen/releases/tag/v1.8.0)



## mkdist

This month, we release 5 new releases (0 major release, 0 minor release and 5 patch releases):

- [v1.5.9](https://github.com/unjs/mkdist/releases/tag/v1.5.9)
- [v1.5.8](https://github.com/unjs/mkdist/releases/tag/v1.5.8)
- [v1.5.7](https://github.com/unjs/mkdist/releases/tag/v1.5.7)
- [v1.5.6](https://github.com/unjs/mkdist/releases/tag/v1.5.6)
- [v1.5.5](https://github.com/unjs/mkdist/releases/tag/v1.5.5)

### fixes

- **dts:** Handle dir + file of same name ([#245](https://github.com/unjs/mkdist/pull/245))

## nypm

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.3.12](https://github.com/unjs/nypm/releases/tag/v0.3.12)

### enhancements

- Detect `bun.lock` ([#153](https://github.com/unjs/nypm/pull/153))

## ofetch

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v1.4.0](https://github.com/unjs/ofetch/releases/tag/v1.4.0)

### enhancements

- Support `retryDelay` with callback function ([#372](https://github.com/unjs/ofetch/pull/372))
- Add better message and code for timeout error ([#351](https://github.com/unjs/ofetch/pull/351))
- Allow custom global options for `$fetch.create` ([#401](https://github.com/unjs/ofetch/pull/401))
- Support interceptors arrays ([#353](https://github.com/unjs/ofetch/pull/353))
- Always clone and normalize `options.headers` and `options.query` ([#436](https://github.com/unjs/ofetch/pull/436))

### fixes

- Export types from `node` export condition ([#407](https://github.com/unjs/ofetch/pull/407))
- Use the wrapper to allow patching global `fetch` ([#377](https://github.com/unjs/ofetch/pull/377))

### documentation

- Add docs for using undici dispatcher ([#389](https://github.com/unjs/ofetch/pull/389))

### types

- Add `agent` and `dispatcher` options (node-specific) ([#308](https://github.com/unjs/ofetch/pull/308))

## ohash

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v1.1.4](https://github.com/unjs/ohash/releases/tag/v1.1.4)

### fixes

- **murmurHash:** Fix murmurHash3 implementation, add tests ([#83](https://github.com/unjs/ohash/pull/83))

### documentation

- Improve jsdocs ([#74](https://github.com/unjs/ohash/pull/74))

## unbuild

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v3.0.0-rc.8](https://github.com/unjs/unbuild/releases/tag/v3.0.0-rc.8)



## undocs

This month, we release 6 new releases (0 major release, 0 minor release and 6 patch releases):

- [v0.2.28](https://github.com/unjs/undocs/releases/tag/v0.2.28)
- [v0.2.27](https://github.com/unjs/undocs/releases/tag/v0.2.27)
- [v0.2.26](https://github.com/unjs/undocs/releases/tag/v0.2.26)
- [v0.2.25](https://github.com/unjs/undocs/releases/tag/v0.2.25)
- [v0.2.24](https://github.com/unjs/undocs/releases/tag/v0.2.24)
- [v0.2.23](https://github.com/unjs/undocs/releases/tag/v0.2.23)

### fixes

- Update page title with spa navigation ([2984c92](https://github.com/unjs/undocs/commit/2984c92))

### refactors

- Make code blocks simpler ([d8bf888](https://github.com/unjs/undocs/commit/d8bf888))
- Use `Inter` as main font family ([3e515f6](https://github.com/unjs/undocs/commit/3e515f6))

### enhancements

- Detect branch for edit button ([8b9e3fa](https://github.com/unjs/undocs/commit/8b9e3fa))
- Auto note about automd pages ([20c2e83](https://github.com/unjs/undocs/commit/20c2e83))
### fixes
- Workaround for scanning fonts from dist ([87b617e](https://github.com/unjs/undocs/commit/87b617e))

## unhead

This month, we release 11 new releases (0 major release, 1 minor release and 10 patch releases):

- [v1.11.6](https://github.com/unjs/unhead/releases/tag/v1.11.6)
- [v1.11.5](https://github.com/unjs/unhead/releases/tag/v1.11.5)
- [v1.11.4](https://github.com/unjs/unhead/releases/tag/v1.11.4)
- [v1.11.3](https://github.com/unjs/unhead/releases/tag/v1.11.3)
- [v1.11.2](https://github.com/unjs/unhead/releases/tag/v1.11.2)
- [v1.11.1](https://github.com/unjs/unhead/releases/tag/v1.11.1)
- [v1.11.0](https://github.com/unjs/unhead/releases/tag/v1.11.0)
- [v1.10.4](https://github.com/unjs/unhead/releases/tag/v1.10.4)
- [v1.10.3](https://github.com/unjs/unhead/releases/tag/v1.10.3)
- [v1.10.2](https://github.com/unjs/unhead/releases/tag/v1.10.2)
- [v1.10.1](https://github.com/unjs/unhead/releases/tag/v1.10.1)

### bug fixes

- **scripts,vue**: Only unwatch if initialized - by @harlan-zw [<samp>(9d166)</samp>](https://github.com/unjs/unhead/commit/9d166b65)

### 🏎 performance

- Avoid duplicate `entries:updated` calls - by @harlan-zw [<samp>(48cf0)</samp>](https://github.com/unjs/unhead/commit/48cf034c)

### [view changes on github](https://github.com/unjs/unhead/compare/v1.10.0...v1.10.1)



## unstorage

This month, we release 3 new releases (0 major release, 2 minor releases and 1 patch release):

- [v1.12.0](https://github.com/unjs/unstorage/releases/tag/v1.12.0)
- [v1.11.1](https://github.com/unjs/unstorage/releases/tag/v1.11.1)
- [v1.11.0](https://github.com/unjs/unstorage/releases/tag/v1.11.0)

### enhancements

- **http, server:** Support native `ttl` ([#479](https://github.com/unjs/unstorage/pull/479))

### 🔥 performance

- **cloudflare-kv-binding:** Add missing base argument on `getKeys` ([#475](https://github.com/unjs/unstorage/pull/475))

### fixes

- **cloudflare-kv-binding:** Allow passing transaction options for `setItem` to `binding.put` ([#423](https://github.com/unjs/unstorage/pull/423))
- Fix driver types ([#433](https://github.com/unjs/unstorage/pull/433))
- **server:** Avoid decoding raw request body ([#434](https://github.com/unjs/unstorage/pull/434))
- **cloudflare-kv-binding:** Go through all pages to list the keys ([#459](https://github.com/unjs/unstorage/pull/459))

### documentation

- Using undocs package manager component ([#414](https://github.com/unjs/unstorage/pull/414))
- Fix link ([#429](https://github.com/unjs/unstorage/pull/429))
- Fix typographical errors ([#432](https://github.com/unjs/unstorage/pull/432))
- Jsdocs for the server functions ([#438](https://github.com/unjs/unstorage/pull/438))
- Improve drivers ([f6f547e](https://github.com/unjs/unstorage/commit/f6f547e))

## untyped

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v1.5.0](https://github.com/unjs/untyped/releases/tag/v1.5.0)

### enhancements

- Update to jiti v2 for built-in loader ([6c35c70](https://github.com/unjs/untyped/commit/6c35c70))

### refactors

- Improve type safety ([7f51a8a](https://github.com/unjs/untyped/commit/7f51a8a))