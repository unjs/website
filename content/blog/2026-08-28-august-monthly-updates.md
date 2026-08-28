---
title: Monthly updates (August 2026)
description: 25 releases this month! What's new in the UnJS ecosystem?
authors:
  - name:
    picture:
    twitter:
category:
  - releases
packages:
  - capnp-es
  - db0
  - env-runner
  - fontaine
  - impound
  - nf3
  - ocache
  - ohash
  - unctx
  - unhead
  - unifont
  - unpdf
  - unrouting
publishedAt: 2026-08-28T09:43:57.340Z
modifiedAt: 2026-08-28T09:43:57.340Z
---

## capnp-es

This month, we release 2 new releases (0 major release, 0 minor release and 2 patch releases):

- [v0.0.16](https://github.com/unjs/capnp-es/releases/tag/v0.0.16)
- [v0.0.15](https://github.com/unjs/capnp-es/releases/tag/v0.0.15)

### enhancements

- Add support for Typescript 6 ([#84](https://github.com/unjs/capnp-es/pull/84))

### fixes

- Generated JS comments on enum/struct ([#81](https://github.com/unjs/capnp-es/pull/81))

## db0

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v0.4.0](https://github.com/unjs/db0/releases/tag/v0.4.0)

### enhancements

- Expose connector name ([#205](https://github.com/unjs/db0/pull/205))
- Add `neon` for serverless postgres ([#191](https://github.com/unjs/db0/pull/191))
- Add database `capabilities` ([#207](https://github.com/unjs/db0/pull/207))
- Add `prisma` adapter ([#210](https://github.com/unjs/db0/pull/210))
- Add kysely integration (#224)
- Add tracing channels support ([#193](https://github.com/unjs/db0/pull/193))
- **drizzle:** Support schema parameter ([#183](https://github.com/unjs/db0/pull/183))
- **drizzle:** Update with postgres and mysql connectors ([#219](https://github.com/unjs/db0/pull/219))
- **drizzle:** ⚠️  Upgrade to drizzle v1 ([#250](https://github.com/unjs/db0/pull/250))
- ⚠️  Require explicit library passing to connectors ([cc5f0fb](https://github.com/unjs/db0/commit/cc5f0fb))

### fixes

- **postgresql:** Only rewrite `?` placeholders outside string literals and comments ([#248](https://github.com/unjs/db0/pull/248))
- **drizzle:** Remap object rows to TS field names for all dialects ([#227](https://github.com/unjs/db0/pull/227))

### documentation

- Add notice about `sqlite3` not being maintained ([#220](https://github.com/unjs/db0/pull/220))
- Add connector docs for prisma postgres ([#199](https://github.com/unjs/db0/pull/199))

### ⚠️ breaking changes

- ⚠️  Require explicit library passing to connectors ([cc5f0fb](https://github.com/unjs/db0/commit/cc5f0fb))
- **drizzle:** ⚠️  Upgrade to drizzle-orm v1 ([#250](https://github.com/unjs/db0/pull/250))

## env-runner

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v0.2.0](https://github.com/unjs/env-runner/releases/tag/v0.2.0)

### enhancements

- ⚠️  Require explicit runtime deps ([dbc9cbb](https://github.com/unjs/env-runner/commit/dbc9cbb))

## fontaine

This month, we release 4 new releases (0 major release, 0 minor release and 4 patch releases):

- [release-2026-08-25.2](https://github.com/unjs/fontaine/releases/tag/release-2026-08-25.2)
- [release-2026-08-25](https://github.com/unjs/fontaine/releases/tag/release-2026-08-25)
- [release-2026-08-23](https://github.com/unjs/fontaine/releases/tag/release-2026-08-23)
- [release-2026-08-21](https://github.com/unjs/fontaine/releases/tag/release-2026-08-21)

### 👉 changelog



### fontless (0.4.1 → 0.4.2)



### enhancements

- emit `unicode-range` for locally subsetted faces ([`5fad8eb`](https://github.com/unjs/fontaine/commit/5fad8eb))

### fixes

- opt `fontless` out of SSR externalisation ([`3b3c089`](https://github.com/unjs/fontaine/commit/3b3c089))

### fontless (0.4.0 → 0.4.1)

### enhancements
- emit `@font-face` for font families registered as `global` (#818)
- add per-family glyph subsetting (#821)

### fontless (0.3.0 → 0.4.0)

### enhancements
- **fontless:** allow routing provider requests through a unifont proxy ([`d3d6486`](https://github.com/unjs/fontaine/commit/d3d6486))
- ⚠️  **fontless:** update unifont to v0.8.0 ([`e9f9717`](https://github.com/unjs/fontaine/commit/e9f9717))
- **fontless:** support for local file urls from font providers (#605)

### 🔥 performance

- **fontless:** use unifont's `exists` hook for local font resolution ([`b4bec8a`](https://github.com/unjs/fontaine/commit/b4bec8a))
### fixes
- **fontless:** pick fallbacks from the font category the provider reports ([`7a99281`](https://github.com/unjs/fontaine/commit/7a99281))
- ⚠️  **fontless:** use the request init a provider requires to download a font ([`e1ad2cc`](https://github.com/unjs/fontaine/commit/e1ad2cc))
- **fontless:** resolve npm font packages from the project root ([`fd38dc3`](https://github.com/unjs/fontaine/commit/fd38dc3))
- **fontless:** warn if `fontless/runtime` is imported without preloading (#816)
- **fontless:** respect `throwOnError` when an explicit provider resolves nothing (#815)
- **fontless:** apply family-level `@font-face` descriptors (#813)
- **fontless:** detect `--*-font-family` variables by default (#812)

### fontaine (0.8.0 → 0.8.1)

### enhancements
- **fontaine:** add postcss plugin (#799)
### fixes
- **fontaine:** don't add fallbacks to generic families or CSS keywords (#806)
- **fontaine:** improve font url resolution (#805)
- **fontaine:** generate fallback rules for fonts added via `@import` (#791)

### fontless (0.2.1 → 0.3.0)

### enhancements
- **fontless:** expose preload fonts to server runtime (#651)
- ⚠️  **fontless:** support selecting preloaded fonts by subsets (#655)
- **fontless:** support configurable cache directory or driver (#786)
- ⚠️  **fontless:** drop `esbuild` css transformation (#770)
- **fontless:** custom prefix support for processCSSVariables (#733)
### fixes
- **fontless:** resolve font urls via vite's asset pipeline (#788)
- **fontless:** respect vite base when generating font urls (#787)
- **fontless:** render valid `format()` values in `@font-face` src (#773)

### 📝 other commits

_These commits were not routed to any package and do not bump any version._
- test: fully cover both fontless + fontaine ([`a8cbb27`](https://github.com/unjs/fontaine/commit/a8cbb27))
- test: shuffle test order in fontaine and fontless suites ([`09030ab`](https://github.com/unjs/fontaine/commit/09030ab))
- chore: build fontless on postinstall ([`59d8596`](https://github.com/unjs/fontaine/commit/59d8596))
- test: isolate metric cache state between transform tests (#807) ([`4cff293`](https://github.com/unjs/fontaine/commit/4cff293))
- chore: bump uppt to v0.6.3 ([`ac35f24`](https://github.com/unjs/fontaine/commit/ac35f24))
- chore: bump uppt to v0.6.2 ([`d4c565a`](https://github.com/unjs/fontaine/commit/d4c565a))
- chore: run ci on merge groups ([`da51093`](https://github.com/unjs/fontaine/commit/da51093))
- chore: bump uppt to v0.6.1 ([`913a2d5`](https://github.com/unjs/fontaine/commit/913a2d5))
- ci: migrate to uppt release workflow (#794) ([`397ebdb`](https://github.com/unjs/fontaine/commit/397ebdb))
- test(e2e): add sveltekit example (#789) ([`1bc0e70`](https://github.com/unjs/fontaine/commit/1bc0e70))
- test: use stable sorting for assertion ([`da65eaf`](https://github.com/unjs/fontaine/commit/da65eaf))
- chore: bump pnpm version ([`5988584`](https://github.com/unjs/fontaine/commit/5988584))
- chore: migrate to pnpm v11 (#763) ([`f1b0261`](https://github.com/unjs/fontaine/commit/f1b0261))
- chore: lint ([`80f76fa`](https://github.com/unjs/fontaine/commit/80f76fa))
- chore: migrate resolutions to `pnpm-workspace.yaml` ([`385bb7b`](https://github.com/unjs/fontaine/commit/385bb7b))
- chore: migrate npm badges and links to npmx.dev ([`af01f2f`](https://github.com/unjs/fontaine/commit/af01f2f))
- chore: ignore changelogen dep ([`cb7c670`](https://github.com/unjs/fontaine/commit/cb7c670))
- chore: add changelogen ([`855a9fa`](https://github.com/unjs/fontaine/commit/855a9fa))
- chore: lint ([`d914ad1`](https://github.com/unjs/fontaine/commit/d914ad1))
- chore: ignore builds ([`d134ea8`](https://github.com/unjs/fontaine/commit/d134ea8))
- ci: pin github actions to full-length commit shas ([`0275738`](https://github.com/unjs/fontaine/commit/0275738))
- chore: enable commit signing ([`f1d0c53`](https://github.com/unjs/fontaine/commit/f1d0c53))
- chore: release v0.2.0 ([`4d81e36`](https://github.com/unjs/fontaine/commit/4d81e36))

## impound

This month, we release 2 new releases (0 major release, 1 minor release and 1 patch release):

- [v1.2.0](https://github.com/unjs/impound/releases/tag/v1.2.0)
- [v1.1.7](https://github.com/unjs/impound/releases/tag/v1.1.7)

### 👉 changelog



### enhancements

- add `lazy` trace mode (#374)

### 🔥 performance

- reduce eager trace memory and hot-path allocations (#381)

### fixes

- record trace edges for importers outside `include` (#380)

## nf3

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.3.24](https://github.com/unjs/nf3/releases/tag/v0.3.24)



## ocache

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v0.3.0](https://github.com/unjs/ocache/releases/tag/v0.3.0)

### ✨ what’s new in ocache v0.3

This release makes ocache safer and more predictable for production workloads while adding new ways to reduce latency and compose storage:
- **Safer HTTP caching by default** — cache keys now account for authority and request method, undeclared request headers are hidden from handlers, credentials are stripped by default, and `Vary`, `Set-Cookie`, cache-control directives, conditional requests, and cacheable status codes are handled more defensively.
- **Bounded memory and response buffering** — memory storage is limited by bytes, HTTP bodies are refused while reading once they exceed the configured backend limit, and cache entries can no longer live forever without an expiry or storage TTL.
- **Layered and binary-friendly storage** — combine fast and persistent backends with `composeStorage`, store native binary payloads without base64 when supported, cache binary function results, and adapt blob stores with `createBlobStorage`.
- **Faster responses and safer background work** — opt into `stream` to serve a cache fill while it is still being buffered, use `waitUntil` for background tasks, and rely on the new 30-second `maxResolveTime` default to abort abandoned resolutions.
- **Smaller, faster, runtime-independent hashing** — ocache now ships its own deterministic SHA-256-based hashing with stronger collision protection and improved performance, while keeping zero runtime dependencies.

### key upgrade notes

Query parameters are now ignored unless enabled with `allowQuery`; storage must be configured per cache instance; `HEAD` and `GET` use separate entries; and responses with `Set-Cookie` are not cached or replayed on cacheable routes. See the [Migration Guide](https://ocache.unjs.io/docs/migration) before upgrading.

### enhancements

- **storage:** ⚠️  Only per-instance storage ([ce8e0e6](https://github.com/unjs/ocache/commit/ce8e0e6))
- **storage:** ⚠️  Bound memory storage by bytes, not just entry count ([#90](https://github.com/unjs/ocache/pull/90))
- **cache:** ⚠️  `maxResolveTime` defaulting  to 30sec ([#85](https://github.com/unjs/ocache/pull/85))
- Standalone hash ([5f97883](https://github.com/unjs/ocache/commit/5f97883))
- **cache:** Abort abandoned resolutions on timeout ([e3a7dfd](https://github.com/unjs/ocache/commit/e3a7dfd))
- **http:** Limit the body size that may be buffered ([b4e1034](https://github.com/unjs/ocache/commit/b4e1034))
- **storage:** Support native binary storage ([df3a009](https://github.com/unjs/ocache/commit/df3a009))
- **cache:** Support binary values in cached functions ([5ef98f3](https://github.com/unjs/ocache/commit/5ef98f3))
- **storage:** `createBlobStorage` frame codec ([5a73e3c](https://github.com/unjs/ocache/commit/5a73e3c))
- **storage:** Reserve blob frame compression flags ([bc49c15](https://github.com/unjs/ocache/commit/bc49c15))
- **cache:** WaitUntil option for background work ([ce0fbae](https://github.com/unjs/ocache/commit/ce0fbae))
- **http:** ⚠️  Make allowQuery opt-in ([2b0f7e8](https://github.com/unjs/ocache/commit/2b0f7e8))
- **storage:** Add `composeStorage` for layered backends ([0bd1b01](https://github.com/unjs/ocache/commit/0bd1b01))
- **http:** Add opt-in stream to serve a fill while it buffers ([548ad7a](https://github.com/unjs/ocache/commit/548ad7a))

### 🔥 performance

- Speed-up hashing ([ad2a22e](https://github.com/unjs/ocache/commit/ad2a22e))
- **http:** Derive the key prefix without a second URL parse ([23e53fb](https://github.com/unjs/ocache/commit/23e53fb))
- **http:** Encode binary bodies with the runtime's own base64 ([9f22264](https://github.com/unjs/ocache/commit/9f22264))

### fixes

- **http:** Strip credentials by default, forward varies headers ([61f09db](https://github.com/unjs/ocache/commit/61f09db))
- **http:** ⚠️  Key HEAD entries separately from GET ([5160adc](https://github.com/unjs/ocache/commit/5160adc))
- **http:** ⚠️  Never cache or return Set-Cookie on cacheable routes ([e3975c5](https://github.com/unjs/ocache/commit/e3975c5))
- **http:** ⚠️  Advertise Vary: Cookie when allowCookies is set ([2710f10](https://github.com/unjs/ocache/commit/2710f10))
- **http:** Never store or replay null-body statuses (204/205/304) ([d975131](https://github.com/unjs/ocache/commit/d975131))
- **cache:** Use a Map for in-flight dedup so prototype-named keys resolv ([529fbda](https://github.com/unjs/ocache/commit/529fbda))
- **http:** Carry bound waitUntil onto the narrowed request ([daac727](https://github.com/unjs/ocache/commit/daac727))
- **http:** ⚠️  Forward the raw Cookie header when varies includes "cookie" ([47731fb](https://github.com/unjs/ocache/commit/47731fb))
- **http:** ⚠️  Resolve handler name before merging defaults ([bdf8c84](https://github.com/unjs/ocache/commit/bdf8c84))
- **http:** ⚠️  Include the request authority in the cache key ([fb0efaa](https://github.com/unjs/ocache/commit/fb0efaa))
- **http:** ⚠️  Gate storage and cache-control on a cacheable-status allowlist ([14f8019](https://github.com/unjs/ocache/commit/14f8019))
- **http:** ⚠️  Honor no-cache, zero lifetimes and Vary:* as storage opt-outs ([c3501ea](https://github.com/unjs/ocache/commit/c3501ea))
- **http:** ⚠️  Fail closed on a handler-declared Vary we don't key on ([660bee6](https://github.com/unjs/ocache/commit/660bee6))
- **http:** Respect shouldBypassCache when narrowing requests ([12f09f0](https://github.com/unjs/ocache/commit/12f09f0))
- **cache:** Never store an entry with neither an expiry nor a TTL ([183f36a](https://github.com/unjs/ocache/commit/183f36a))
- **http:** ⚠️  Advertise the lifetimes ocache actually enforces ([#86](https://github.com/unjs/ocache/pull/86))
- **cache:** ⚠️  Escape the name segment of the storage key ([#88](https://github.com/unjs/ocache/pull/88))
- **http:** Copy response headers before serializing ([ec43253](https://github.com/unjs/ocache/commit/ec43253))
- **http:** ⚠️  Narrow request headers by allowlist ([#91](https://github.com/unjs/ocache/pull/91))
- **hash:** Length-prefix text in serialize to prevent key collisions ([a20beb4](https://github.com/unjs/ocache/commit/a20beb4))
- **hash:** Treat a null constructor as a plain object ([d11521f](https://github.com/unjs/ocache/commit/d11521f))
- **http:** Never cache a request that could not be narrowed ([2035d6d](https://github.com/unjs/ocache/commit/2035d6d))
- **hash:** Render built-ins by value and length-prefix type tags ([00b399e](https://github.com/unjs/ocache/commit/00b399e))
- **hash:** Collapse a line break in function source to a space ([623d714](https://github.com/unjs/ocache/commit/623d714))
- **http:** Narrow Host to the keyed URL authority ([b8d95f3](https://github.com/unjs/ocache/commit/b8d95f3))
- **hash:** Cap traversal depth instead of overflowing the stack ([0abcfd1](https://github.com/unjs/ocache/commit/0abcfd1))
- **storage:** Close two byte-ceiling bypasses ([bdf47ad](https://github.com/unjs/ocache/commit/bdf47ad))
- **http:** Give If-None-Match precedence over If-Modified-Since ([6014259](https://github.com/unjs/ocache/commit/6014259))
- **cache:** Fence in-flight resolutions against a concurrent purge ([0cb0de7](https://github.com/unjs/ocache/commit/0cb0de7))
- **cache:** Stop discarding falsy transform results ([9ef94f6](https://github.com/unjs/ocache/commit/9ef94f6))
- **http:** Decide headersOnly 304s from the handler's own validators ([ff31b27](https://github.com/unjs/ocache/commit/ff31b27))
- **http:** Domain-separate binary and text etags ([71aa086](https://github.com/unjs/ocache/commit/71aa086))
- **http:** Stop synthesizing last-modified ([d4eea12](https://github.com/unjs/ocache/commit/d4eea12))
- **cache:** Require matching integrity to serve stale ([74cdcad](https://github.com/unjs/ocache/commit/74cdcad))
- **cache:** Order a purge after an in-flight write ([9f1bc84](https://github.com/unjs/ocache/commit/9f1bc84))
- **http:** Remove unkeyed header exemptions ([acf56ab](https://github.com/unjs/ocache/commit/acf56ab))
- **cache:** Escape the group cache key segment ([1747b51](https://github.com/unjs/ocache/commit/1747b51))
- **http:** Echo validators and cache policy on 304 ([07931fc](https://github.com/unjs/ocache/commit/07931fc))
- **http:** ⚠️  Refuse handler values the default `toResponse` cannot convert ([981ac27](https://github.com/unjs/ocache/commit/981ac27))

## ohash

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v2.0.12](https://github.com/unjs/ohash/releases/tag/v2.0.12)

### 🔥 performance

- **serialize:** Faster object entries serialization ([#140](https://github.com/unjs/ohash/pull/140))
- **serialize:** Faster serialization of objects and classes ([#141](https://github.com/unjs/ohash/pull/141))
- **diff:** Fused single-pass traversal ([#195](https://github.com/unjs/ohash/pull/195))

### fixes

- **serialize:** Compare strings without localeCompare ([1d9402e](https://github.com/unjs/ohash/commit/1d9402e))
- **utils:** Diff falsy primitive values ([#196](https://github.com/unjs/ohash/pull/196))

### documentation

- Fixed important callout in README ([#143](https://github.com/unjs/ohash/pull/143))
- Fix diff example and document v1 objectHash migration ([#200](https://github.com/unjs/ohash/pull/200))
- Fix diff usage example and stale opts param ([#197](https://github.com/unjs/ohash/pull/197))

## unctx

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v3.0.1](https://github.com/unjs/unctx/releases/tag/v3.0.1)

### fixes

- Escape helper module paths in generated imports ([#150](https://github.com/unjs/unctx/pull/150))
- **transform:** Support async arrows with expression bodies ([#143](https://github.com/unjs/unctx/pull/143))
- Return null from tryUse when context is unavailable ([#148](https://github.com/unjs/unctx/pull/148))
- Fallback to strong ref when `WeakRef` is unavailable ([25574ea](https://github.com/unjs/unctx/commit/25574ea))

## unhead

This month, we release 5 new releases (0 major release, 2 minor releases and 3 patch releases):

- [v3.4.0](https://github.com/unjs/unhead/releases/tag/v3.4.0)
- [v3.3.2](https://github.com/unjs/unhead/releases/tag/v3.3.2)
- [v3.3.1](https://github.com/unjs/unhead/releases/tag/v3.3.1)
- [v2.1.17](https://github.com/unjs/unhead/releases/tag/v2.1.17)
- [v3.3.0](https://github.com/unjs/unhead/releases/tag/v3.3.0)

### features

- **stream**:
- Render Streamed Body Tags before body close - by @harlan-zw in https://github.com/unjs/unhead/issues/960 [<samp>(d253b)</samp>](https://github.com/unjs/unhead/commit/d253b54a)
- **validate**:
- Flag streamed head tags that bots never see - by @harlan-zw in https://github.com/unjs/unhead/issues/947 [<samp>(18a55)</samp>](https://github.com/unjs/unhead/commit/18a55c1e)
- Scope an instance with only and key - by @harlan-zw in https://github.com/unjs/unhead/issues/955 [<samp>(aff26)</samp>](https://github.com/unjs/unhead/commit/aff263c0)

### bug fixes

- **bundler**:
- Transform .mts, .cts, and IDs with queries - by @harlan-zw in https://github.com/unjs/unhead/issues/946 [<samp>(7206e)</samp>](https://github.com/unjs/unhead/commit/7206eceb)
- **schema-org**:
- Input no-op, primaryImageOfPage opt-out, types - by @harlan-zw in https://github.com/unjs/unhead/issues/965 [<samp>(6b307)</samp>](https://github.com/unjs/unhead/commit/6b307ec7)
- **stream**:
- Module mode lost every streamed head tag - by @harlan-zw in https://github.com/unjs/unhead/issues/950 [<samp>(e5f5c)</samp>](https://github.com/unjs/unhead/commit/e5f5c386)
- Stop the bootstrap clobbering an installed head - by @harlan-zw in https://github.com/unjs/unhead/issues/958 [<samp>(0cec3)</samp>](https://github.com/unjs/unhead/commit/0cec3456)
- Stop wrapStream dropping late head entries - by @harlan-zw in https://github.com/unjs/unhead/issues/954 [<samp>(791f0)</samp>](https://github.com/unjs/unhead/commit/791f03d2)
- Drop the hydration lock that swallowed early pushes - by @harlan-zw in https://github.com/unjs/unhead/issues/949 [<samp>(44447)</samp>](https://github.com/unjs/unhead/commit/4444735f)

### 🏎 performance

- **stream**: Render once per chunk, not once per entry - by @harlan-zw in https://github.com/unjs/unhead/issues/948 [<samp>(4a98c)</samp>](https://github.com/unjs/unhead/commit/4a98cace)

### 📝 migration

```bash
pnpm add -D oxc-parser
```
Runtime-only Unhead projects and builds with Rolldown installed need no change.

### breaking changes

- **bundler**: Make oxc-parser an optional peer - by @danielroe in https://github.com/unjs/unhead/issues/923 [<samp>(7acca)</samp>](https://github.com/unjs/unhead/commit/7acca68b)
### features
- **bundler**: Transpile static inline scripts for Vite targets - by @harlan-zw in https://github.com/unjs/unhead/issues/862 [<samp>(cb7d0)</samp>](https://github.com/unjs/unhead/commit/cb7d0b0f)
- **validate**: Warn on deprecated Twitter metadata - by @harlan-zw in https://github.com/unjs/unhead/issues/910 [<samp>(68a50)</samp>](https://github.com/unjs/unhead/commit/68a5072b)
### bug fixes
- Minify declarative JSON script content - by @harlan-zw in https://github.com/unjs/unhead/issues/874 [<samp>(bf71e)</samp>](https://github.com/unjs/unhead/commit/bf71e223)
- Support browsers without Object.hasOwn - by @harlan-zw in https://github.com/unjs/unhead/issues/891 [<samp>(90f38)</samp>](https://github.com/unjs/unhead/commit/90f38fcc)
- **react**:
- Support Fragment children in Head - by @harlan-zw in https://github.com/unjs/unhead/issues/892 [<samp>(7dd26)</samp>](https://github.com/unjs/unhead/commit/7dd26006)
- Preserve Helmet default title fallback - by @harlan-zw in https://github.com/unjs/unhead/issues/878 [<samp>(e317a)</samp>](https://github.com/unjs/unhead/commit/e317a1a1)
- Normalize Head JSX props - by @harlan-zw in https://github.com/unjs/unhead/issues/893 [<samp>(8ce0e)</samp>](https://github.com/unjs/unhead/commit/8ce0ebbc)
- Standardize provider instance prop - by @harlan-zw in https://github.com/unjs/unhead/issues/879 [<samp>(7d2dc)</samp>](https://github.com/unjs/unhead/commit/7d2dc2c7)
- Support raw content in Head - by @harlan-zw in https://github.com/unjs/unhead/issues/894 [<samp>(d0501)</samp>](https://github.com/unjs/unhead/commit/d0501d9b)
- **schema-org**:
- Google rich result parity - by @harlan-zw in https://github.com/unjs/unhead/issues/919 [<samp>(a9a8e)</samp>](https://github.com/unjs/unhead/commit/a9a8e14d)
- Missing Google rich result fields - by @harlan-zw in https://github.com/unjs/unhead/issues/920 [<samp>(a58d4)</samp>](https://github.com/unjs/unhead/commit/a58d4bf2)
- Apply defaults when node type is absent - by @harlan-zw in https://github.com/unjs/unhead/issues/924 [<samp>(0a796)</samp>](https://github.com/unjs/unhead/commit/0a796ca9)
- **scripts**:
- Keep one stable proxy across script load - by @harlan-zw in https://github.com/unjs/unhead/issues/925 [<samp>(dbefa)</samp>](https://github.com/unjs/unhead/commit/dbefa3af)
- **types**:
- Support document speculation rules - by @harlan-zw in https://github.com/unjs/unhead/issues/873 [<samp>(2ce44)</samp>](https://github.com/unjs/unhead/commit/2ce443b5)
- Narrow unpackMeta return type - by @harlan-zw in https://github.com/unjs/unhead/issues/889 [<samp>(d9600)</samp>](https://github.com/unjs/unhead/commit/d9600e62)
- **unhead**:
- Render fresh server head into DOM - by @harlan-zw in https://github.com/unjs/unhead/issues/877 [<samp>(becce)</samp>](https://github.com/unjs/unhead/commit/becce8cc)
- Dedupe scalar Open Graph and Twitter metadata - by @harlan-zw in https://github.com/unjs/unhead/issues/880 [<samp>(72d98)</samp>](https://github.com/unjs/unhead/commit/72d98435)
- Preserve numeric zero head content - by @harlan-zw in https://github.com/unjs/unhead/issues/885 [<samp>(324df)</samp>](https://github.com/unjs/unhead/commit/324df19b)
- **validate**:
- Warn on too many prefetch&#39;s - by @harlan-zw in https://github.com/unjs/unhead/issues/895 [<samp>(30a2f)</samp>](https://github.com/unjs/unhead/commit/30a2f9e3)
- Validate head input shapes - by @harlan-zw in https://github.com/unjs/unhead/issues/884 [<samp>(9d7fa)</samp>](https://github.com/unjs/unhead/commit/9d7fa032)
- **vue**:
- Reject ignored server prop resolvers - by @harlan-zw in https://github.com/unjs/unhead/issues/876 [<samp>(a834e)</samp>](https://github.com/unjs/unhead/commit/a834ef6f)
### 🏎 performance
- **bundler**:
- Make Vite DevTools kit optional - by @harlan-zw in https://github.com/unjs/unhead/issues/911 [<samp>(d9b3d)</samp>](https://github.com/unjs/unhead/commit/d9b3d2a6)
- Reuse Rolldown parser when available - by @harlan-zw in https://github.com/unjs/unhead/issues/916 [<samp>(bddfd)</samp>](https://github.com/unjs/unhead/commit/bddfd460)

## unifont

This month, we release 4 new releases (0 major release, 1 minor release and 3 patch releases):

- [v0.8.3](https://github.com/unjs/unifont/releases/tag/v0.8.3)
- [v0.8.1](https://github.com/unjs/unifont/releases/tag/v0.8.1)
- [v0.8.0](https://github.com/unjs/unifont/releases/tag/v0.8.0)
- [v0.7.5](https://github.com/unjs/unifont/releases/tag/v0.7.5)

### 👉 changelog



### fixes

- install proxy dispatcher when another undici owns the global one (#480)
- **fontshare:** resolve font faces for weight ranges (#478)

### enhancements

- **proxy:** add `proxy.unifont.dev` for browser environments (#380)

### refactors

- **npm:** drop unused known-package css file override ([`f30ec79`](https://github.com/unjs/unifont/commit/f30ec79))
- **npm:** drop unreachable array guard on font face src ([`6a60709`](https://github.com/unjs/unifont/commit/6a60709))

### 🔥 performance

- remove `ofetch` dependency (#428)
### fixes
- **fontsource:** use standard or full variant for multi-axis fonts (#393)
- **adobe:** avoid clearing kit state before refresh completes (#384)
- handle font-stretch returned by font providers (#345)
- **googleicons:** sort icons for glyph subsetting (#343)

### documentation

- improve npm provider docs (#344)

## unpdf

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v1.8.1](https://github.com/unjs/unpdf/releases/tag/v1.8.1)

### bug fixes

- Polyfill `Math.sumPrecise` for PDF.js - by @tra0x in https://github.com/unjs/unpdf/issues/64 [<samp>(a6ae8)</samp>](https://github.com/unjs/unpdf/commit/a6ae87f)

## unrouting

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.2.3](https://github.com/unjs/unrouting/releases/tag/v0.2.3)

### 👉 changelog



### fixes

- match vue-router path encoding for static segments (#182)