---
title: Monthly updates (October 2026)
description: 40 releases this month! What's new in the UnJS ecosystem?
authors:
  - name:
    picture:
    twitter:
category:
  - releases
packages:
  - c12
  - db0
  - env-runner
  - exsolve
  - fontaine
  - httpxy
  - impound
  - ipx
  - jup
  - nypm
  - ocache
  - pkg-types
  - unhead
  - unifont
  - unpdf
  - unplugin
  - unrouting
  - unstorage
  - unwasm
  - upm
publishedAt: 2026-10-28T04:10:33.299Z
modifiedAt: 2026-10-28T04:10:33.299Z
---

## c12

This month, we release 2 new releases (0 major release, 0 minor release and 2 patch releases):

- [v4.0.0-rc.4](https://github.com/unjs/c12/releases/tag/v4.0.0-rc.4)
- [v4.0.0-rc.3](https://github.com/unjs/c12/releases/tag/v4.0.0-rc.3)

### fixes

- **loader:** Reload changed config files on Bun ([d0d2129](https://github.com/unjs/c12/commit/d0d2129))

### enhancements

- Dedupe extended layers ([#345](https://github.com/unjs/c12/pull/345))
### fixes
- Dedupe repeated `envName` entries ([da5a9f3](https://github.com/unjs/c12/commit/da5a9f3))
- **updateConfig:** Resolve dotted config names in `.config` dir like the loader ([#352](https://github.com/unjs/c12/pull/352))
- **loader:** Treat a null config or a config function returning nothing as empty ([#349](https://github.com/unjs/c12/pull/349))
- Handle layers resolving to `null` or `undefined` ([#355](https://github.com/unjs/c12/pull/355))
- **loader:** Keep null configs null so empty layers are skipped ([e6ad3ad](https://github.com/unjs/c12/commit/e6ad3ad))
- Apply env-specific config to `overrides` ([#353](https://github.com/unjs/c12/pull/353))
- **dotenv:** Resolve references against raw values so escaped literals stay literal ([#348](https://github.com/unjs/c12/pull/348))
- **loader:** Resolve `export default null` to an empty config instead of the module namespace ([#357](https://github.com/unjs/c12/pull/357))

### documentation

- Link documentation references in v4 migration guide ([#350](https://github.com/unjs/c12/pull/350))

## db0

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.4.2](https://github.com/unjs/db0/releases/tag/v0.4.2)

### enhancements

- **cloudflare:** Use `cloudflare:workers` env instead of `globalThis.__env__` ([be03a51](https://github.com/unjs/db0/commit/be03a51))

### fixes

- **tracing:** Detect subscribers on runtimes without `TracingChannel#hasSubscribers` ([6d16bbc](https://github.com/unjs/db0/commit/6d16bbc))
- **drizzle:** Support drizzle-orm 1.0.0-rc.5 ([4739f40](https://github.com/unjs/db0/commit/4739f40))

## env-runner

This month, we release 4 new releases (0 major release, 0 minor release and 4 patch releases):

- [v0.3.5](https://github.com/unjs/env-runner/releases/tag/v0.3.5)
- [v0.3.4](https://github.com/unjs/env-runner/releases/tag/v0.3.4)
- [v0.3.3](https://github.com/unjs/env-runner/releases/tag/v0.3.3)
- [v0.3.2](https://github.com/unjs/env-runner/releases/tag/v0.3.2)

### enhancements

- `listen` runner option and graceful `shutdown()` ([#80](https://github.com/unjs/env-runner/pull/80))
- **self:** Support virtual modules and synchronous plugins ([#81](https://github.com/unjs/env-runner/pull/81))

### fixes

- **miniflare:** Handle entry `websocket` with crossws's server plugin ([dce574a](https://github.com/unjs/env-runner/commit/dce574a))
- **miniflare:** Fall back to bare `crossws/server` when unresolvable ([162f2ea](https://github.com/unjs/env-runner/commit/162f2ea))

## exsolve

This month, we release 2 new releases (0 major release, 1 minor release and 1 patch release):

- [v1.2.0](https://github.com/unjs/exsolve/releases/tag/v1.2.0)
- [v1.1.2](https://github.com/unjs/exsolve/releases/tag/v1.1.2)

### enhancements

- Expose `preserveSymlinks` ([#72](https://github.com/unjs/exsolve/pull/72))

### 🔥 performance

- Use `throwIfNoEntry: false` in `tryStatSync` ([#73](https://github.com/unjs/exsolve/pull/73))

### fixes

- **resolve:** Also exclude `ENOTDIR` for error bubbling ([#69](https://github.com/unjs/exsolve/pull/69))
- Don't strip trailing slash before stat in `finalizeResolution` ([#74](https://github.com/unjs/exsolve/pull/74))
- Reject trailing-slash file paths on Windows in `finalizeResolution` ([8864bce](https://github.com/unjs/exsolve/commit/8864bce))
- Don't return stale or shared results from the resolve cache ([4cb62ee](https://github.com/unjs/exsolve/commit/4cb62ee))
- Reset package.json cache when the resolve cache is cleared directly ([#79](https://github.com/unjs/exsolve/pull/79))
- Handle symlinked parents, `..`, `try` and empty input for absolute paths ([#78](https://github.com/unjs/exsolve/pull/78))
- Avoid super-linear data URL MIME regex ([7f5dc9c](https://github.com/unjs/exsolve/commit/7f5dc9c))
- Report unreadable package.json instead of ignoring it ([#81](https://github.com/unjs/exsolve/pull/81))
- Validate constructor name in error value type detection ([#80](https://github.com/unjs/exsolve/pull/80))

## fontaine

This month, we release 5 new releases (0 major release, 0 minor release and 5 patch releases):

- [release-2026-10-22](https://github.com/unjs/fontaine/releases/tag/release-2026-10-22)
- [release-2026-10-21](https://github.com/unjs/fontaine/releases/tag/release-2026-10-21)
- [release-2026-10-11](https://github.com/unjs/fontaine/releases/tag/release-2026-10-11)
- [release-2026-10-10](https://github.com/unjs/fontaine/releases/tag/release-2026-10-10)
- [release-2026-10-09](https://github.com/unjs/fontaine/releases/tag/release-2026-10-09)

### 👉 changelog



### fontaine (1.0.2 → 1.0.3)



### fixes

- don't size-adjust emoji fallbacks (#897)

### fontless (1.3.3 → 1.3.4)

_Released because `fontaine` was bumped; no direct changes._

### fontaine (1.0.1 → 1.0.2)

### fixes
- add metric-compatible Liberation fallbacks (#892)
- **fontaine,fontless:** match `local` fallbacks by full and PS name (#891)

### fontless (1.3.2 → 1.3.3)

### fixes
- skip `var()` references in font stacks (#894)
- **fontaine,fontless:** match `local` fallbacks by full and PS name (#891)

### 📝 other commits

_These commits were not routed to any package and do not bump any version._
- chore: release 1 package (#880) ([`559bb40`](https://github.com/unjs/fontaine/commit/559bb40))
- chore: release 1 package (#879) ([`df8ac29`](https://github.com/unjs/fontaine/commit/df8ac29))

### fontless (1.3.1 → 1.3.2)

### fixes
- strip U+FFFD virtual prefix from devtools usage ids ([`f1af490`](https://github.com/unjs/fontaine/commit/f1af490))
### 📝 other commits
_These commits were not routed to any package and do not bump any version._
- chore: release 1 package (#879) ([`df8ac29`](https://github.com/unjs/fontaine/commit/df8ac29))

### fontless (1.3.0 → 1.3.1)

### fixes
- normalise usage ids + preview local fonts in devtools (#878)

### fontaine (1.0.0 → 1.0.1)

### fixes
- **fontaine,fontless:** retry and cache fallback metric reads (#876)
- drop `BlinkMacSystemFont` from default fallbacks ([`d8fe1f1`](https://github.com/unjs/fontaine/commit/d8fe1f1))

### fontless (1.2.1 → 1.3.0)



### enhancements

- show usage, fallbacks and issues in the devtools panel (#877)
- add devframe-based devtools panel (#875)
- support multiple `families` entries with the same name (#874)
### fixes
- **fontaine,fontless:** retry and cache fallback metric reads (#876)
- do not require a `consola` logger ([`b36872f`](https://github.com/unjs/fontaine/commit/b36872f))

### refactors

- drop `pathe` dependency ([`68acd61`](https://github.com/unjs/fontaine/commit/68acd61))
- drop `ohash` dependency ([`188ca94`](https://github.com/unjs/fontaine/commit/188ca94))
- drop `consola` dependency ([`6da4b0e`](https://github.com/unjs/fontaine/commit/6da4b0e))
- drop `ufo` dependency (#873)
### 📝 other commits
_These commits were not routed to any package and do not bump any version._
- chore: declare `h3` dep of `@analogjs/vite-plugin-nitro` ([`93799e7`](https://github.com/unjs/fontaine/commit/93799e7))
- chore: remove unused type import ([`de0f8fa`](https://github.com/unjs/fontaine/commit/de0f8fa))
- chore: release 1 package (#861) ([`80f5913`](https://github.com/unjs/fontaine/commit/80f5913))
- chore: release `fontless` (#859) ([`7b856a5`](https://github.com/unjs/fontaine/commit/7b856a5))
- chore: release `fontless` (#850) ([`121a6e1`](https://github.com/unjs/fontaine/commit/121a6e1))

## httpxy

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.5.6](https://github.com/unjs/httpxy/releases/tag/v0.5.6)

### enhancements

- **fetch:** Support custom `Response` constructor ([#186](https://github.com/unjs/httpxy/pull/186))
- **ws:** Add `upgradeTimeout` and resolve `ws()` on handled socket errors ([#172](https://github.com/unjs/httpxy/pull/172))

### fixes

- **web-incoming:** Pipe request without waiting for socket connect ([3e68d30](https://github.com/unjs/httpxy/commit/3e68d30))
- **web-incoming:** Defer body piping until socket is assigned ([10a916b](https://github.com/unjs/httpxy/commit/10a916b))
- Drain client body when upstream responds before request body ([#170](https://github.com/unjs/httpxy/pull/170))
- **ws:** Correct non-upgrade response framing ([#173](https://github.com/unjs/httpxy/pull/173))

## impound

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v1.2.1](https://github.com/unjs/impound/releases/tag/v1.2.1)

### 👉 changelog



### fixes

- report repeated denied imports as errors (#414)
- check imports from virtual modules (#412)

## ipx

This month, we release 1 new release (1 major release, 0 minor release and 0 patch release):

- [v4.0.0](https://github.com/unjs/ipx/releases/tag/v4.0.0)

### enhancements

- **server:** Add `autoFormats` option to limit `f_auto` formats ([#141](https://github.com/unjs/ipx/pull/141))
- Add `allowedModifiers` option to restrict usable modifiers ([#152](https://github.com/unjs/ipx/pull/152))

### fixes

- **resize:** Clamp the box per `fit` and support `enlarge_false` ([613eca3](https://github.com/unjs/ipx/commit/613eca3))
- **storage/http:** Preserve explicit zero maxAge ([#329](https://github.com/unjs/ipx/pull/329))
- **storage/http:** Recognize `Cache-Control` directive names ([#340](https://github.com/unjs/ipx/pull/340))
- **handlers:** Don't resolve modifiers from `Object.prototype` ([937f55e](https://github.com/unjs/ipx/commit/937f55e))

### documentation

- **http:** Document DNS-rebinding limitation of `blockPrivateIPs` ([f413eda](https://github.com/unjs/ipx/commit/f413eda))

## jup

This month, we release 2 new releases (0 major release, 0 minor release and 2 patch releases):

- [v0.6.6](https://github.com/unjs/jup/releases/tag/v0.6.6)
- [v0.6.5](https://github.com/unjs/jup/releases/tag/v0.6.5)

### 📦 updated defaults

| Tool | v0.6.5 | v0.6.6 |
| --- | --- | --- |
| npm | 12.2.0 | 12.2.1 |
| aube | 2.8.0 | 2.8.1 |
| node (default and `lts`) | 24.22.0 | 24.22.1 |
> [!IMPORTANT]
> Node.js [v24.22.1](https://nodejs.org/en/blog/release/v24.22.1) is a security release. It includes several high-severity fixes (TLS, DNS, brotli).

### enhancements

- Add `cwd`, `env` and `stdio` options to `runMain` ([#20](https://github.com/unjs/jup/pull/20))

## nypm

This month, we release 2 new releases (0 major release, 0 minor release and 2 patch releases):

- [v0.6.12](https://github.com/unjs/nypm/releases/tag/v0.6.12)
- [v0.6.11](https://github.com/unjs/nypm/releases/tag/v0.6.11)

### fixes

- Forward `env` option to package manager for all operations ([#280](https://github.com/unjs/nypm/pull/280))
- **dedupeDependencies:** Do not remove lockfiles in dry mode ([#272](https://github.com/unjs/nypm/pull/272))
- **dlx:** Pass args containing spaces as single arguments ([#277](https://github.com/unjs/nypm/pull/277))
- **cli:** Pass `--recreateLockFile` through to `dedupeDependencies` ([#274](https://github.com/unjs/nypm/pull/274))
- **cli:** Treat `--recreateLockfile=false` as false ([7d028c8](https://github.com/unjs/nypm/commit/7d028c8))

### enhancements

- Add upm package manager support ([#269](https://github.com/unjs/nypm/pull/269))
### fixes
- **utils:** Resolve a relative `cwd` before handing it to `createRequire` ([#265](https://github.com/unjs/nypm/pull/265))

## ocache

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.3.1](https://github.com/unjs/ocache/releases/tag/v0.3.1)

### fixes

- Chain timers past the 32-bit setTimeout limit ([56460c4](https://github.com/unjs/ocache/commit/56460c4))
- Preserve `req.context` when narrowing request ([#105](https://github.com/unjs/ocache/pull/105))
- **http:** Never answer 304 for a non-cacheable status ([#102](https://github.com/unjs/ocache/pull/102))
- **cache:** Hold the dedup slot until the write lands ([#100](https://github.com/unjs/ocache/pull/100))

## pkg-types

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v2.4.0](https://github.com/unjs/pkg-types/releases/tag/v2.4.0)

### enhancements

- Detect `upm.lock` lockfile ([#290](https://github.com/unjs/pkg-types/pull/290))

### fixes

- **gitconfig:** Preserve subsection names with special characters ([#284](https://github.com/unjs/pkg-types/pull/284))

## unhead

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v3.4.3](https://github.com/unjs/unhead/releases/tag/v3.4.3)

### features

- **bundler**: Build Unhead DevTools on Devframe - by @harlan-zw in https://github.com/unjs/unhead/issues/1003 [<samp>(41601)</samp>](https://github.com/unjs/unhead/commit/4160168d)

### bug fixes

- **devtools**:
- Sweep panel bugs and restore brand fonts - by @harlan-zw in https://github.com/unjs/unhead/issues/1004 [<samp>(29057)</samp>](https://github.com/unjs/unhead/commit/290575df)
- **eslint-plugin**:
- Trim leftover space when defer fixer removes a mid-object property - by @pengzh1 and **pengzh1** in https://github.com/unjs/unhead/issues/1000 [<samp>(46f61)</samp>](https://github.com/unjs/unhead/commit/46f61920)
- **seo**:
- Render negative robots directives for false values - by @harlan-zw in https://github.com/unjs/unhead/issues/1015 [<samp>(c19c2)</samp>](https://github.com/unjs/unhead/commit/c19c22fe)
- **unhead**:
- Keep numeric template params, including 0 - by @lprnmns in https://github.com/unjs/unhead/issues/1002 [<samp>(0a507)</samp>](https://github.com/unjs/unhead/commit/0a507b5d)
- Stringify non-string textContent in hashTag - by @MFA-G in https://github.com/unjs/unhead/issues/1007 [<samp>(dd7dd)</samp>](https://github.com/unjs/unhead/commit/dd7dda35)
- Infer twitter:card from the resolved image - by @harlan-zw in https://github.com/unjs/unhead/issues/1024 [<samp>(03933)</samp>](https://github.com/unjs/unhead/commit/03933772)
- **validate**:
- Warn on template tokens without the plugin - by @harlan-zw in https://github.com/unjs/unhead/issues/1016 [<samp>(4f074)</samp>](https://github.com/unjs/unhead/commit/4f074b67)
- **vue**:
- Dispose Vapor head entries on scope teardown - by @harlan-zw in https://github.com/unjs/unhead/issues/1020 [<samp>(65eab)</samp>](https://github.com/unjs/unhead/commit/65eab821)
- Dispose script consumers with their effect scope - by @harlan-zw in https://github.com/unjs/unhead/issues/1021 [<samp>(6e605)</samp>](https://github.com/unjs/unhead/commit/6e6053d4)

## unifont

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v1.0.3](https://github.com/unjs/unifont/releases/tag/v1.0.3)

### 👉 changelog



### fixes

- confine font sources from providers + npm packages (#548)

### refactors

- replace `ohash` with `fnv1a-64` (#549)

## unpdf

This month, we release 2 new releases (0 major release, 1 minor release and 1 patch release):

- [v1.9.1](https://github.com/unjs/unpdf/releases/tag/v1.9.1)
- [v1.9.0](https://github.com/unjs/unpdf/releases/tag/v1.9.0)

### bug fixes

- Keep `getMeta` metadata intact with `parseDates` - by @RaphaelFakhri in https://github.com/unjs/unpdf/issues/70 [<samp>(b93e3)</samp>](https://github.com/unjs/unpdf/commit/b93e371)

### features

- Upgrade to PDF.js v6.4 - by @johannschopplich in https://github.com/unjs/unpdf/issues/66 [<samp>(e83a0)</samp>](https://github.com/unjs/unpdf/commit/e83a0eb)

## unplugin

This month, we release 3 new releases (0 major release, 3 minor releases and 0 patch release):

- [v3.7.0](https://github.com/unjs/unplugin/releases/tag/v3.7.0)
- [v3.6.0](https://github.com/unjs/unplugin/releases/tag/v3.6.0)
- [v3.5.0](https://github.com/unjs/unplugin/releases/tag/v3.5.0)

### features

- Support composable hook filters from `@rolldown/pluginutils` - by @antfubot in https://github.com/unjs/unplugin/issues/636 [<samp>(e78e7)</samp>](https://github.com/unjs/unplugin/commit/e78e706)

### bug fixes

- Unescape webpack/rspack resource paths in load and transform - by @antfubot, @edemaine and **Claude Sonnet 5.5** in https://github.com/unjs/unplugin/issues/631 [<samp>(ec6b7)</samp>](https://github.com/unjs/unplugin/commit/ec6b74e)
- Match relative id globs under paths with glob metacharacters, keep the input map on empty transformed mappings - by @antfubot in https://github.com/unjs/unplugin/issues/635 [<samp>(97854)</samp>](https://github.com/unjs/unplugin/commit/978546e)
- **esbuild,bun**: Keep empty results, filter by id before reading, normalize hooks once - by @antfubot in https://github.com/unjs/unplugin/issues/634 [<samp>(6f67d)</samp>](https://github.com/unjs/unplugin/commit/6f67ddd)
- **farm**: Honour the shared hook contract in load, transform and resolveId - by @antfubot in https://github.com/unjs/unplugin/issues/633 [<samp>(f64e9)</samp>](https://github.com/unjs/unplugin/commit/f64e930)
- **rspack**: Keep binary files intact and allow emitFile from buildEnd - by @antfubot in https://github.com/unjs/unplugin/issues/630 [<samp>(0ecc3)</samp>](https://github.com/unjs/unplugin/commit/0ecc344)
- **webpack**: Surface resolveId errors and emit Uint8Array assets byte-exactly - by @antfubot in https://github.com/unjs/unplugin/issues/632 [<samp>(962ed)</samp>](https://github.com/unjs/unplugin/commit/962ede3)

### 🏎 performance

- Reuse hook filters in the rspack and webpack adapters - by @guru-irl and @antfu in https://github.com/unjs/unplugin/issues/621 [<samp>(1b727)</samp>](https://github.com/unjs/unplugin/commit/1b7276b)

## unrouting

This month, we release 2 new releases (0 major release, 1 minor release and 1 patch release):

- [v0.3.1](https://github.com/unjs/unrouting/releases/tag/v0.3.1)
- [v0.3.0](https://github.com/unjs/unrouting/releases/tag/v0.3.0)

### 👉 changelog



### fixes

- only escape `+` in rou3 segments with params ([`795d99a`](https://github.com/unjs/unrouting/commit/795d99a))

### enhancements

- emit portable collapsed patterns and support single-segment wildcards ([`97cb036`](https://github.com/unjs/unrouting/commit/97cb036))
- ⚠️  emit rou3 1.0 compatible patterns (#217)

## unstorage

This month, we release 2 new releases (0 major release, 1 minor release and 1 patch release):

- [v2.0.0-beta.0](https://github.com/unjs/unstorage/releases/tag/v2.0.0-beta.0)
- [v1.17.6](https://github.com/unjs/unstorage/releases/tag/v1.17.6)

### fixes

- **vercel-runtime-cache:** Resolve the request cache on every call ([#843](https://github.com/unjs/unstorage/pull/843))
- **fs:** Ignore globs fail under dot-prefixed directories ([#768](https://github.com/unjs/unstorage/pull/768))
- **fs:** Ensure directory exists before watching ([#703](https://github.com/unjs/unstorage/pull/703))
- **http, s3, cloudflare-kv-http:** Encode key segments in URLs ([f203c45](https://github.com/unjs/unstorage/commit/f203c45))
- **netlify-blobs, vercel-runtime-cache, redis, upstash, vercel-kv:** Validate or escape keys used in urls and patterns ([59127d1](https://github.com/unjs/unstorage/commit/59127d1))
- **cloudflare-kv-binding, cloudflare-r2-binding, cloudflare-kv-http, vercel-blob:** Use trailing separator for list prefixes ([92b952b](https://github.com/unjs/unstorage/commit/92b952b))
- **netlify-blobs:** Reject control characters and leading/trailing spaces in keys ([8dae0aa](https://github.com/unjs/unstorage/commit/8dae0aa))
- Reject empty keys and dot segments in storage, prefixStorage and server ([c7f65b7](https://github.com/unjs/unstorage/commit/c7f65b7))
- **prefixStorage:** Reject bases containing `?` ([4189a67](https://github.com/unjs/unstorage/commit/4189a67))
- **server:** Ignore query for base keys and reject HEAD/PUT on base keys ([552e562](https://github.com/unjs/unstorage/commit/552e562))

## unwasm

This month, we release 3 new releases (0 major release, 0 minor release and 3 patch releases):

- [v0.6.3](https://github.com/unjs/unwasm/releases/tag/v0.6.3)
- [v0.6.2](https://github.com/unjs/unwasm/releases/tag/v0.6.2)
- [v0.6.1](https://github.com/unjs/unwasm/releases/tag/v0.6.1)

### enhancements

- Add rspack plugin ([#107](https://github.com/unjs/unwasm/pull/107), [935c88f](https://github.com/unjs/unwasm/commit/935c88f), [7426e90](https://github.com/unjs/unwasm/commit/7426e90), [92b58d6](https://github.com/unjs/unwasm/commit/92b58d6), [d04d697](https://github.com/unjs/unwasm/commit/d04d697))

### 🔥 performance

- Use `Uint8Array.fromBase64` if avaliable ([#117](https://github.com/unjs/unwasm/pull/117))

### fixes

- **plugin:** Fall back to module mode when a binary cannot be parsed ([#112](https://github.com/unjs/unwasm/pull/112))

## upm

This month, we release 3 new releases (0 major release, 2 minor releases and 1 patch release):

- [v1.5.1](https://github.com/unjs/upm/releases/tag/v1.5.1)
- [v1.5.0](https://github.com/unjs/upm/releases/tag/v1.5.0)
- [v1.4.0](https://github.com/unjs/upm/releases/tag/v1.4.0)

### fixes

- **web:** Skip listing a store the install never made ([0828a8c](https://github.com/unjs/upm/commit/0828a8c))
- **dns:** Detect untouched default agent when node:http is loaded ([#42](https://github.com/unjs/upm/pull/42))

### enhancements

- Use a store on the project's mount when `~/.upm/store` cannot hardlink there ([c033d73](https://github.com/unjs/upm/commit/c033d73))
### fixes
- **website:** Keep a linked file and its lines as the tarball and install land ([9cef58b](https://github.com/unjs/upm/commit/9cef58b))
- Read a `package-lock.json` bundle its parent lists without entries of its own ([#38](https://github.com/unjs/upm/pull/38))
- Follow XDG base directories for upm's own files ([#41](https://github.com/unjs/upm/pull/41))

### ✨ highlights



### overrides and resolutions ([#22](https://github.com/unjs/upm/pull/22))

upm now reads npm `overrides`, yarn `resolutions`, `pnpm.overrides` and the `overrides` in `pnpm-workspace.yaml`. The rules apply to the whole tree, including workspaces and peer ranges, and are saved in `upm.lock`.
```json
{
"overrides": { "minimatch": "^9.0.5", "eslint": { "ajv": "6.12.6" } },
"pnpm": { "overrides": { "glob@<9": "9.3.5", "request>form-data": "-" } }
}
```
Rules nested more than one parent deep (`a>b>c`) and values upm can't install (`patch:`, `portal:`, `workspace:`) are skipped with a warning.
### enhancements
- `install --verify` now hashes stored and installed files, and repairs any that differ ([4976b3f](https://github.com/unjs/upm/commit/4976b3f))
- Warn when a package's `engines.node` does not include the Node you are running ([665c0c9](https://github.com/unjs/upm/commit/665c0c9))
- Warn about overrides, resolutions and patches that upm can't apply ([b0896b0](https://github.com/unjs/upm/commit/b0896b0))
- Warn about locked versions published after the [release age](https://github.com/unjs/upm#release-age) cutoff, with no extra requests ([1385dfd](https://github.com/unjs/upm/commit/1385dfd))
- Warn once when a registry gives no publish dates, so release age can't be checked ([bae22f4](https://github.com/unjs/upm/commit/bae22f4))
- Warn when a locked tarball URL is not on any configured registry ([d61d823](https://github.com/unjs/upm/commit/d61d823))

### 🔒 security

Each fix below stops an edited lockfile, store or tarball from installing the wrong code.
- Every tarball and store entry is checked against the package that was asked for: name, version and integrity ([b27ccc0](https://github.com/unjs/upm/commit/b27ccc0))
- A registry package locked to a URL outside its registry is refused unless the registry publishes the same integrity. Scoped packages are checked against their own registry, which closes a dependency-confusion gap ([fb40df5](https://github.com/unjs/upm/commit/fb40df5), [8da7bb4](https://github.com/unjs/upm/commit/8da7bb4))
- Lockfile entries must match `package.json` for every dependency, alias and workspace ([f1a69b3](https://github.com/unjs/upm/commit/f1a69b3), [1834623](https://github.com/unjs/upm/commit/1834623))
- Imported `package-lock.json`, `pnpm-lock.yaml` and `bun.lock` files are checked against `package.json` too ([5bbe0db](https://github.com/unjs/upm/commit/5bbe0db))
- A peer dependency can resolve to an alias or tarball only if the dependent package declares that peer ([c08870b](https://github.com/unjs/upm/commit/c08870b))
- Cached tarballs are reused only for the URL and integrity they were checked against ([b568a66](https://github.com/unjs/upm/commit/b568a66), [7c007bf](https://github.com/unjs/upm/commit/7c007bf))
### fixes
**Running installs at the same time**
- Only one install at a time relinks a `node_modules` folder ([5a747d2](https://github.com/unjs/upm/commit/5a747d2))
- The lock is released when you stop an install with Ctrl+C ([03f0d13](https://github.com/unjs/upm/commit/03f0d13))
- A lock left by a crashed install is taken over at once on Linux, macOS and Windows. A crashed `upm add` no longer causes a 10-second wait ([ac8abba](https://github.com/unjs/upm/commit/ac8abba), [f2dbcd9](https://github.com/unjs/upm/commit/f2dbcd9), [f72339b](https://github.com/unjs/upm/commit/f72339b))
- Running `add` and `install` at the same time no longer mixes up their files ([bc78eba](https://github.com/unjs/upm/commit/bc78eba))
**Lockfile**
- A locked version outside its `package.json` range now counts as stale ([4ad66a5](https://github.com/unjs/upm/commit/4ad66a5))
- A failed install no longer writes the lockfile ([4ad66a5](https://github.com/unjs/upm/commit/4ad66a5))
**Store and cache**
- Damaged cached metadata is fetched again, and project files are written atomically ([9bab3c6](https://github.com/unjs/upm/commit/9bab3c6))
- Damaged store entries are refilled ([4d29805](https://github.com/unjs/upm/commit/4d29805))
- A tarball whose bytes don't match its integrity is downloaded once more before failing ([42b8aa2](https://github.com/unjs/upm/commit/42b8aa2))
- A skipped optional dependency is fetched on the next install ([0a54e92](https://github.com/unjs/upm/commit/0a54e92))
- Direct links are checked before a tree counts as up to date ([b3b707f](https://github.com/unjs/upm/commit/b3b707f))
**Platforms**
- Bins published with Windows line endings (`#!/usr/bin/env node\r\n`) now run on Linux and macOS ([#24](https://github.com/unjs/upm/pull/24))
- On case-insensitive disks, packages with two file names that differ only in case link correctly, and `--verify` no longer repairs them on every run ([6f27459](https://github.com/unjs/upm/commit/6f27459), [72d663b](https://github.com/unjs/upm/commit/72d663b))
- A dependency named `constructor`, `toString` or another built-in property name now installs ([6b9b7a3](https://github.com/unjs/upm/commit/6b9b7a3))
- Safari support in the browser build ([4ef0593](https://github.com/unjs/upm/commit/4ef0593), [96cd547](https://github.com/unjs/upm/commit/96cd547), [4e4a148](https://github.com/unjs/upm/commit/4e4a148))

### 🔥 performance

- Fewer registry requests for platform-specific optional dependencies such as `@next/swc-*`, `@esbuild/*` and `@rolldown/binding-*` ([a2e7514](https://github.com/unjs/upm/commit/a2e7514), [aaa30c3](https://github.com/unjs/upm/commit/aaa30c3))
- Fewer duplicate requests for scoped packages on a slow registry ([b0dc1ba](https://github.com/unjs/upm/commit/b0dc1ba))
- A store filled by an older upm is updated once, and later relinks are faster ([024235b](https://github.com/unjs/upm/commit/024235b))

### ⚠️ upgrading

**Installs that may now fail**
- **Lockfile URLs outside a package's registry** fail with `ELOCK` unless the registry publishes the same integrity for that version. They used to only warn. Mirrors that serve the registry's exact bytes still work, at one extra metadata request per entry if the mirror isn't configured. Offline with no cached metadata, they fail with `EOFFLINE`.
- **JSR packages need `@jsr:registry` in `.npmrc`.** Without it, a lockfile with JSR entries fails with `ELOCK`.
- **Imported lockfiles must match `package.json`.** A `package-lock.json`, `pnpm-lock.yaml` or `bun.lock` that doesn't fails with `ELOCK`. An imported `package-lock.json` with an `https://` tarball dependency is refused.
- **Peers on aliases or tarballs must be declared.** A hand-edited lockfile that resolves a peer to an alias or tarball the dependent doesn't declare as a peer fails with `EMISMATCH`.
- **Optional dependencies** whose lockfile entry fails a check now fail the install instead of being skipped.
**One-time effects**
- **Projects with overrides** in `package.json` re-resolve on the first install. `--frozen-lockfile` fails until `upm.lock` is rewritten.
- **Offline installs** of URL tarball dependencies from an older store fail with `EOFFLINE` until one online install records where each tarball came from.
- **Local `file:` tarballs** are hashed once more, and older store indexes are rewritten once. Downgrading still works.
**Known caveat**
- The release cutoff warning reads the date from the tarball's `last-modified` header. The registry sometimes re-uploads old tarballs, so an old version can be flagged by mistake. This is rare with the default 1-day cutoff.