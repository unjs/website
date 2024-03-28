---
title: Monthly updates (March 2024)
description: 40 releases this month! What's new in the UnJS ecosystem?
authors:
  - name:
    picture:
    twitter:
category:
  - releases
packages:
  - automd
  - c12
  - db0
  - fontaine
  - giget
  - magic-regexp
  - nitro
  - node-fetch-native
  - nypm
  - ofetch
  - radix3
  - ufo
  - undio
  - undocs
  - unhead
  - unstorage
  - unwasm
publishedAt: 2024-03-28T00:57:30.845Z
modifiedAt: 2024-03-28T00:57:30.845Z
---

## automd

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.3.7](https://github.com/unjs/automd/releases/tag/v0.3.7)

### enhancements

- **badges:** Support `bundlejs` ([0ab578e](https://github.com/unjs/automd/commit/0ab578e))

### refactors

- **badges:** Switch to `shields` by default ([308381c](https://github.com/unjs/automd/commit/308381c))

## c12

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v1.10.0](https://github.com/unjs/c12/releases/tag/v1.10.0)

### enhancements

- Support `auth` shortcut for layer config ([#142](https://github.com/unjs/c12/pull/142))

## db0

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.1.4](https://github.com/unjs/db0/releases/tag/v0.1.4)

### fixes

- **d1:** Support `__env__` for accessing binding ([2ef9d57](https://github.com/unjs/db0/commit/2ef9d57))

### refactors

- **d1:** Throw a better error if binding not found ([#60](https://github.com/unjs/db0/pull/60))

### documentation

- Fix typos ([#56](https://github.com/unjs/db0/pull/56))

## fontaine

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v0.5.0](https://github.com/unjs/fontaine/releases/tag/v0.5.0)

### features

- **deps**: Upgrade to latest Capsize packages - by @michaeltaranto in https://github.com/unjs/fontaine/issues/319 [<samp>(f8d28)</samp>](https://github.com/unjs/fontaine/commit/f8d28c2)

## giget

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v1.2.3](https://github.com/unjs/giget/releases/tag/v1.2.3)

### fixes

- **parseGitURI:** Support `@` symbol in ref segment ([#153](https://github.com/unjs/giget/pull/153))

### documentation

- Correct `downloadTemplate` options ([#144](https://github.com/unjs/giget/pull/144))

## magic-regexp

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v0.8.0](https://github.com/unjs/magic-regexp/releases/tag/v0.8.0)

### features

- Add converter to `magic-regexp` syntax - by @serkodev in https://github.com/unjs/magic-regexp/issues/368 [<samp>(5fa24)</samp>](https://github.com/unjs/magic-regexp/commit/5fa24dd)

## nitro

This month, we release 4 new releases (0 major release, 0 minor release and 4 patch releases):

- [v2.9.5](https://github.com/unjs/nitro/releases/tag/v2.9.5)
- [v2.9.4](https://github.com/unjs/nitro/releases/tag/v2.9.4)
- [v2.9.3](https://github.com/unjs/nitro/releases/tag/v2.9.3)
- [v2.9.2](https://github.com/unjs/nitro/releases/tag/v2.9.2)

### ✅ fixes and improvements

- **openapi:** Add experimental `/_nitro/scalar` endpoint ([#2252](https://github.com/unjs/nitro/pull/2252))
- **openapi:** Use dynamic host + port ([#2216](https://github.com/unjs/nitro/pull/2216))
- **openapi:** Add `schema` to generated parameters ([#2235](https://github.com/unjs/nitro/pull/2235))
- **openapi:** Avoid double slash for base ([fdf7e70a](https://github.com/unjs/nitro/commit/fdf7e70a))
- **options:** Set `scheduledTasks` to an empty object by default ([#2285](https://github.com/unjs/nitro/pull/2285))
- **prerender:** Call `nitroApp` close hook when done prerendering ([#2287](https://github.com/unjs/nitro/pull/2287))
- **types:** Return `T` from `Serialize` when it extends `undefined` ([#2286](https://github.com/unjs/nitro/pull/2286))
- **raw:** Exclude yaml from raw plugin ([#2275](https://github.com/unjs/nitro/pull/2275))
- **externals:** Check explicit inline rules on resolved id ([#2288](https://github.com/unjs/nitro/pull/2288))
- **raw:** Allow importing relative paths ([#2289](https://github.com/unjs/nitro/pull/2289))
- **types:** Make c12 env types available for `NitroConfig` ([#2292](https://github.com/unjs/nitro/pull/2292))
- **netlify-edge:** Write `_headers` and `_redirects` ([#2291](https://github.com/unjs/nitro/pull/2291))
- **cloudflare-pages:** Write `_headers` and `_redirects` for non static builds ([#2290](https://github.com/unjs/nitro/pull/2290))
- **netlify:** Allow writing `config.json` ([#2264](https://github.com/unjs/nitro/pull/2264))
- Allow importing utils from `nitropack/runtime` ([#2314](https://github.com/unjs/nitro/pull/2314))
- **openapi:** Upgrade to openapi 3.1 ([#2297](https://github.com/unjs/nitro/pull/2297))
- Use `.d.ts` for runtime generated types ([#2313](https://github.com/unjs/nitro/pull/2313))

### documentation

- **routing:** Add note about middleware execution order ([#2282](https://github.com/unjs/nitro/pull/2282))
- **routing:** Fx link to h3 object syntax handler ([#2281](https://github.com/unjs/nitro/pull/2281))
- Update tasks return value ([8a62e7db](https://github.com/unjs/nitro/commit/8a62e7db))
- **cache:** Add a note for serverless environment ([dc83a2e2](https://github.com/unjs/nitro/commit/dc83a2e2))
- Fix typo ([#2298](https://github.com/unjs/nitro/pull/2298))

### fixes

- Handle path negations when scanning public assets ([#2250](https://github.com/unjs/nitro/pull/2250))
- **pkg:** Add `ioredis` as unstorage peer dependency ([#2266](https://github.com/unjs/nitro/pull/2266))
### documentation
- Fix server assets example path ([#2248](https://github.com/unjs/nitro/pull/2248))
- Remove duplicate `integrity` key ([#2246](https://github.com/unjs/nitro/pull/2246))
- Fix wording ([#2261](https://github.com/unjs/nitro/pull/2261))
- Remove nightly notice ([39bc3f2e](https://github.com/unjs/nitro/commit/39bc3f2e))
- **tasks:** Update dev server usage ([#2240](https://github.com/unjs/nitro/pull/2240))
- **cache:** Add example usage for `cache.varies` ([#2241](https://github.com/unjs/nitro/pull/2241))

## node-fetch-native

This month, we release 2 new releases (0 major release, 0 minor release and 2 patch releases):

- [v1.6.4](https://github.com/unjs/node-fetch-native/releases/tag/v1.6.4)
- [v1.6.3](https://github.com/unjs/node-fetch-native/releases/tag/v1.6.3)



## nypm

This month, we release 2 new releases (0 major release, 0 minor release and 2 patch releases):

- [v0.3.8](https://github.com/unjs/nypm/releases/tag/v0.3.8)
- [v0.3.7](https://github.com/unjs/nypm/releases/tag/v0.3.7)

### enhancements

- Add `detect` command ([8fe78d1](https://github.com/unjs/nypm/commit/8fe78d1))

### fixes

- Findup until root from user `cwd` ([0309498](https://github.com/unjs/nypm/commit/0309498))

### documentation

- Add jsdocs for `detectPackageManager` ([a7dfce7](https://github.com/unjs/nypm/commit/a7dfce7))

## ofetch

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v1.3.4](https://github.com/unjs/ofetch/releases/tag/v1.3.4)

### fixes

- Clear abort timeout after response was received ([#369](https://github.com/unjs/ofetch/pull/369))

### types

- Export all types ([#280](https://github.com/unjs/ofetch/pull/280))
- Expose `GlobalOptions` type ([#307](https://github.com/unjs/ofetch/pull/307))

### refactors

- Remove extra line ([#374](https://github.com/unjs/ofetch/pull/374))

### documentation

- Add initial examples ([#288](https://github.com/unjs/ofetch/pull/288))

## radix3

This month, we release 2 new releases (0 major release, 0 minor release and 2 patch releases):

- [v1.1.2](https://github.com/unjs/radix3/releases/tag/v1.1.2)
- [v1.1.1](https://github.com/unjs/radix3/releases/tag/v1.1.1)

### fixes

- Consider max depth when multiple placeholders are candidate ([#96](https://github.com/unjs/radix3/pull/96))

### refactors

- Strict type checks ([ad79316](https://github.com/unjs/radix3/commit/ad79316))

## ufo

This month, we release 4 new releases (0 major release, 1 minor release and 3 patch releases):

- [v1.5.3](https://github.com/unjs/ufo/releases/tag/v1.5.3)
- [v1.5.2](https://github.com/unjs/ufo/releases/tag/v1.5.2)
- [v1.5.1](https://github.com/unjs/ufo/releases/tag/v1.5.1)
- [v1.5.0](https://github.com/unjs/ufo/releases/tag/v1.5.0)

### fixes

- **joinRelativeURL:** Avoid lookbehind regex for browser compatibility ([#228](https://github.com/unjs/ufo/pull/228))

### enhancements

- Add `withoutHost` utility ([#212](https://github.com/unjs/ufo/pull/212))
- `joinRelativeURL` ([#217](https://github.com/unjs/ufo/pull/217), [#218](https://github.com/unjs/ufo/pull/218), [#220](https://github.com/unjs/ufo/pull/220))
### fixes
- **withoutTrailingSlash:** Consider query param ([#219](https://github.com/unjs/ufo/pull/219))

### documentation

- Fix typo ([#213](https://github.com/unjs/ufo/pull/213), [3aaf64d](https://github.com/unjs/ufo/commit/3aaf64d))

## undio

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.0.1](https://github.com/unjs/undio/releases/tag/v0.0.1)

### enhancements

- Support `Response` ([#3](https://github.com/unjs/undio/pull/3))

### 🔥 performance

- Bun runtime native perf for readable stream utils ([4ffbf37](https://github.com/unjs/undio/commit/4ffbf37))

### fixes

- Use `ArrayBufferLike` type for return types ([81feabb](https://github.com/unjs/undio/commit/81feabb))

### refactors

- Remove generic from `ReadableStream` types ([9b00503](https://github.com/unjs/undio/commit/9b00503))

## undocs

This month, we release 3 new releases (0 major release, 0 minor release and 3 patch releases):

- [v0.2.20](https://github.com/unjs/undocs/releases/tag/v0.2.20)
- [v0.2.19](https://github.com/unjs/undocs/releases/tag/v0.2.19)
- [v0.2.18](https://github.com/unjs/undocs/releases/tag/v0.2.18)

### fixes

- Add hmr hotfix for nitro ([0868eaa](https://github.com/unjs/undocs/commit/0868eaa))

### enhancements

- Auto code groups ([#98](https://github.com/unjs/undocs/pull/98))
- Use lightweight og image generator ([500ad57](https://github.com/unjs/undocs/commit/500ad57))

### 🔥 performance

- Inline fonts ([2b2b914](https://github.com/unjs/undocs/commit/2b2b914))

### refactors

- Simplify ([5dd64ba](https://github.com/unjs/undocs/commit/5dd64ba))
- Improve content transformer maintenability ([e7244af](https://github.com/unjs/undocs/commit/e7244af))

### documentation

- **readme:** Project locked with bun change from pnpm ([#74](https://github.com/unjs/undocs/pull/74))
- Fix spelling ([#82](https://github.com/unjs/undocs/pull/82))

## unhead

This month, we release 13 new releases (0 major release, 1 minor release and 12 patch releases):

- [v1.9.2](https://github.com/unjs/unhead/releases/tag/v1.9.2)
- [v1.9.1](https://github.com/unjs/unhead/releases/tag/v1.9.1)
- [v1.9.0](https://github.com/unjs/unhead/releases/tag/v1.9.0)
- [v1.8.20](https://github.com/unjs/unhead/releases/tag/v1.8.20)
- [v1.8.19](https://github.com/unjs/unhead/releases/tag/v1.8.19)
- [v1.8.18](https://github.com/unjs/unhead/releases/tag/v1.8.18)
- [v1.8.17](https://github.com/unjs/unhead/releases/tag/v1.8.17)
- [v1.8.16](https://github.com/unjs/unhead/releases/tag/v1.8.16)
- [v1.8.15](https://github.com/unjs/unhead/releases/tag/v1.8.15)
- [v1.8.14](https://github.com/unjs/unhead/releases/tag/v1.8.14)
- [v1.8.13](https://github.com/unjs/unhead/releases/tag/v1.8.13)
- [v1.8.12](https://github.com/unjs/unhead/releases/tag/v1.8.12)
- [v1.8.11](https://github.com/unjs/unhead/releases/tag/v1.8.11)

### bug fixes

- **useScript**:
- Support `trigger: (fn: Function)` - by @harlan-zw [<samp>(33fa8)</samp>](https://github.com/unjs/unhead/commit/33fa8e3)
- Vue status `loading` not syncing - by @harlan-zw [<samp>(d0c6e)</samp>](https://github.com/unjs/unhead/commit/d0c6eca)
- Incorrect `onerror` triggering - by @harlan-zw [<samp>(74db4)</samp>](https://github.com/unjs/unhead/commit/74db4ac)

### 🏎 performance

- **scripts**: Skip `onloadstart` event - by @harlan-zw [<samp>(d5a71)</samp>](https://github.com/unjs/unhead/commit/d5a7161)

### release 1.9.0 - `usescript` stable

`useScript` is built to provide better performance and DX when working with Third-Party Scripts. In this release we reduce the composable size has been reduced by 30% with some notable breaking changes:

### removed trigger `idle`

While this was handy in user-land, providing support for it meant providing a polyfill for `window.requestIdleCallback` due to limited browser support. Most integrations will already ship a polyfill for this so it added extra unnecessary weight.
If you'd like to re-implement this behaviour there's [a recipe](https://unhead.unjs.io/usage/composables/use-script#triggering-script-load) on the docs and you should provide your own polyfill (if needed).

### early connections removed

When using the composable it would try and guess how the script is being used and append a `dns-prefetch` or a `preconnect` `<link>` depending on usage. To reduce the composable weight, this should now be implemented in user or integration land.
```html
<link rel="dns-prefetch" href="<script-domain>" />
```

### awaiting script changes

When you wanted to avoid using the Proxy API and use the script instance directly, you could use the `$script.waitForLoad()` function. To reduce the weight, the `$script` object itself is now a promise:
```ts
const { $script } = useScript('<src>', { use: () => window.myScript })
$script
.then(instance => {
// script is loaded, instance is the same as window.myScript
})
.catch(() => {
// script failed to load
})
```

### changelog



### breaking changes

- **script**:
- Remove `script:transform` hook - by @harlan-zw [<samp>(1b153)</samp>](https://github.com/unjs/unhead/commit/1b1532e)
- `$script` promisable, remove `waitForLoad` - by @harlan-zw [<samp>(4646d)</samp>](https://github.com/unjs/unhead/commit/4646d57)
- Remove `$script.loaded` - by @harlan-zw [<samp>(7cba5)</samp>](https://github.com/unjs/unhead/commit/7cba505)
- EventContext option, skip `onabort`, `onprogress` events - by @harlan-zw [<samp>(335f4)</samp>](https://github.com/unjs/unhead/commit/335f419)
- Remove early connections - by @harlan-zw [<samp>(0ebac)</samp>](https://github.com/unjs/unhead/commit/0ebacad)
### bug fixes
- **script**: Typed `data-*` keys - by @harlan-zw [<samp>(e8ca7)</samp>](https://github.com/unjs/unhead/commit/e8ca72c)

## unstorage

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v1.10.2](https://github.com/unjs/unstorage/releases/tag/v1.10.2)

### fixes

- **http, server:** Handle missing resources with http 404 ([#367](https://github.com/unjs/unstorage/pull/367))
- **pkg:** Make `ioredis` dependency optional ([#410](https://github.com/unjs/unstorage/pull/410))
- **vercel-kv:** Add missing driver name ([#355](https://github.com/unjs/unstorage/pull/355))
- **setItems:** Call driver native `setItems` only to avoid duplicate write ([#392](https://github.com/unjs/unstorage/pull/392))
- Fix `getItems`, `setItems` generic types ([#395](https://github.com/unjs/unstorage/pull/395))

### refactors

- **cloudflare-kv, cloudflare-r2:** Move `getBindings` to utils and add default `BUCKET` for r2 ([#292](https://github.com/unjs/unstorage/pull/292))
- **netlify-blobs:** Update to v7 ([#407](https://github.com/unjs/unstorage/pull/407))

### documentation

- **planetscale:** Correct `table` option name ([#359](https://github.com/unjs/unstorage/pull/359))
- **vercel-kv:** Fix typo ([#362](https://github.com/unjs/unstorage/pull/362))
- Improvements ([a64e941](https://github.com/unjs/unstorage/commit/a64e941))
- Fix links and add redirects ([166498f](https://github.com/unjs/unstorage/commit/166498f))
- Fix typo in http-server ([#385](https://github.com/unjs/unstorage/pull/385))

## unwasm

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.3.8](https://github.com/unjs/unwasm/releases/tag/v0.3.8)

### enhancements

- Support `?module` suffix for compatibility ([#23](https://github.com/unjs/unwasm/pull/23))

### fixes

- Generate safe imports code using `knitwork` ([#24](https://github.com/unjs/unwasm/pull/24))