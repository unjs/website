---
title: Monthly updates (September 2026)
description: 36 releases this month! What's new in the UnJS ecosystem?
authors:
  - name:
    picture:
    twitter:
category:
  - releases
packages:
  - c12
  - confbox
  - env-runner
  - fontaine
  - hookable
  - image-meta
  - jup
  - magic-regexp
  - magicast
  - nypm
  - obuild
  - pkg-types
  - rc9
  - setup-jup
  - unhead
  - unifont
  - unimport
  - unplugin
  - upm
publishedAt: 2026-09-28T03:51:36.664Z
modifiedAt: 2026-09-28T03:51:36.664Z
---

## c12

This month, we release 2 new releases (0 major release, 0 minor release and 2 patch releases):

- [v4.0.0-rc.2](https://github.com/unjs/c12/releases/tag/v4.0.0-rc.2)
- [v4.0.0-rc.1](https://github.com/unjs/c12/releases/tag/v4.0.0-rc.1)

### enhancements

- **dotenv:** Support `${VAR:-default}` fallback syntax ([#337](https://github.com/unjs/c12/pull/337))
- **dotenv:** Support custom `parse` option ([c299035](https://github.com/unjs/c12/commit/c299035))
- Support multiple env names in `envName` ([7cd4a6d](https://github.com/unjs/c12/commit/7cd4a6d))
- Add envMerger option for env-specific overrides ([#341](https://github.com/unjs/c12/pull/341))
- ⚠️  Use native `node:fs` watcher instead of chokidar ([#342](https://github.com/unjs/c12/pull/342))
- Support `schema` option for standard schema validation ([#343](https://github.com/unjs/c12/pull/343))

### fixes

- **dotenv:** Stop an unbraced `$VAR` reference at a `:` ([#339](https://github.com/unjs/c12/pull/339))
- **watch:** Handle replaced dirs, symlinks, hook errors and unwatch races ([bf5c3c2](https://github.com/unjs/c12/commit/bf5c3c2))
- Support non-extensible config objects ([#323](https://github.com/unjs/c12/pull/323))

### documentation

- Note shared references between merged config and layers ([eff5fe8](https://github.com/unjs/c12/commit/eff5fe8))

### ⚠️ breaking changes

- ⚠️  Use native `node:fs` watcher instead of chokidar ([#342](https://github.com/unjs/c12/pull/342))

### 🔥 performance

- Load `pkg-types` only when it is needed ([#330](https://github.com/unjs/c12/pull/330))
### fixes
- Install layer deps with `--ignore-workspace` ([#318](https://github.com/unjs/c12/pull/318))
- Normalize layer `install` option ([72709ac](https://github.com/unjs/c12/commit/72709ac))
- Parse `.json` configs with `JSON.parse` ([6a4dfc6](https://github.com/unjs/c12/commit/6a4dfc6))
- Allow trailing commas in `.jsonc` configs ([ef6eb78](https://github.com/unjs/c12/commit/ef6eb78))
### documentation
- Document` createDefineConfig` and `$meta` ([#327](https://github.com/unjs/c12/pull/327))

## confbox

This month, we release 2 new releases (0 major release, 1 minor release and 1 patch release):

- [v0.3.1](https://github.com/unjs/confbox/releases/tag/v0.3.1)
- [v0.3.0](https://github.com/unjs/confbox/releases/tag/v0.3.0)

### fixes

- Strip leading UTF-8 BOM before parsing ([#94](https://github.com/unjs/confbox/pull/94))

### enhancements

- Expose `confbox/json` subpath ([#89](https://github.com/unjs/confbox/pull/89))
- **yaml:** ⚠️  Bump js-yaml to v5 ([#92](https://github.com/unjs/confbox/pull/92))
- **jsonc:** ⚠️  Migrate from `jsonc-parser` to `strip-json-comments` ([#53](https://github.com/unjs/confbox/pull/53))
- **yaml:** Expose `YAMLException` ([a0ae05e](https://github.com/unjs/confbox/commit/a0ae05e))

### ⚠️ breaking changes

- **yaml:** ⚠️  Bump js-yaml to v5 ([#92](https://github.com/unjs/confbox/pull/92))
- **jsonc:** ⚠️  Migrate from `jsonc-parser` to `strip-json-comments` ([#53](https://github.com/unjs/confbox/pull/53))

## env-runner

This month, we release 3 new releases (0 major release, 1 minor release and 2 patch releases):

- [v0.3.0](https://github.com/unjs/env-runner/releases/tag/v0.3.0)
- [v0.2.3](https://github.com/unjs/env-runner/releases/tag/v0.2.3)
- [v0.2.2](https://github.com/unjs/env-runner/releases/tag/v0.2.2)

### enhancements

- ⚠️  Virtual modules improvements ([#61](https://github.com/unjs/env-runner/pull/61))
- **miniflare:** Support a module specifier for `exports` ([#60](https://github.com/unjs/env-runner/pull/60))
- **miniflare:** Support miniflare v5 ([0838ef3](https://github.com/unjs/env-runner/commit/0838ef3))

### fixes

- **miniflare:** Return worker redirects instead of following them ([d01fca7](https://github.com/unjs/env-runner/commit/d01fca7))
- **miniflare:** Keep IPC env across requests ([358bff6](https://github.com/unjs/env-runner/commit/358bff6))

## fontaine

This month, we release 7 new releases (0 major release, 0 minor release and 7 patch releases):

- [release-2026-09-24.2](https://github.com/unjs/fontaine/releases/tag/release-2026-09-24.2)
- [release-2026-09-24](https://github.com/unjs/fontaine/releases/tag/release-2026-09-24)
- [release-2026-09-23](https://github.com/unjs/fontaine/releases/tag/release-2026-09-23)
- [release-2026-09-21](https://github.com/unjs/fontaine/releases/tag/release-2026-09-21)
- [release-2026-09-17](https://github.com/unjs/fontaine/releases/tag/release-2026-09-17)
- [release-2026-09-15](https://github.com/unjs/fontaine/releases/tag/release-2026-09-15)
- [release-2026-09-03](https://github.com/unjs/fontaine/releases/tag/release-2026-09-03)

### 👉 changelog



### fontless (1.2.0 → 1.2.1)



### fixes

- await `exposeFont` callback (#860)

### fontless (1.1.0 → 1.2.0)



### enhancements

- accept unicode ranges in `glyphs` (#856)

### 🔥 performance

- skip subsetting faces whose unicode range the glyphs cover (#857)

### 📝 other commits

_These commits were not routed to any package and do not bump any version._
- chore: release `fontless` (#850) ([`121a6e1`](https://github.com/unjs/fontaine/commit/121a6e1))

### fontless (1.0.0 → 1.1.0)

### enhancements
- export `selectPreloadFonts` (#854)
### fixes
- prefer concrete fallbacks declared in css (#855)
- resolve glyph passthrough against provider name too (#853)
- do not resolve system font families against providers (#852)
- preload a usable face and widen preload filters (#851)
- resolve providers configured under a different key to their name ([`c19ca5e`](https://github.com/unjs/fontaine/commit/c19ca5e))

### refactors

- drop unreachable code + add tests ([`544f74d`](https://github.com/unjs/fontaine/commit/544f74d))

### 👀 highlights

it's been a long time coming, but it feels right to graduate fontless + fontaine to v1 🎉
### 👉 changelog

### fontaine (0.8.2 → 1.0.0)

### refactors
- replace `pathe` and `ufo` with node builtins ([`2725154`](https://github.com/unjs/fontaine/commit/2725154))

### fontless (0.4.5 → 1.0.0)

### refactors
- drop redundant buffer coercion when writing to the cache ([`5cdacde`](https://github.com/unjs/fontaine/commit/5cdacde))
- ⚠️  make `lightningcss` an optional peer dependency ([`519c3f2`](https://github.com/unjs/fontaine/commit/519c3f2))
- replace `unstorage` with a built-in cache ([`29dbf66`](https://github.com/unjs/fontaine/commit/29dbf66))
- ⚠️  use node's native type stripping (#846)

### fontless (0.4.4 → 0.4.5)

### enhancements
- support resolving variable font axes (#839)

### fontaine (0.8.1 → 0.8.2)

### fixes
- resolve generic font families to concrete `local()` names (#837)

### fontless (0.4.3 → 0.4.4)

_Released because `fontaine` was bumped; no direct changes._
### 📝 other commits
_These commits were not routed to any package and do not bump any version._
- chore: run git hooks with pnpm ([`4678291`](https://github.com/unjs/fontaine/commit/4678291))
- ci: use `pnpm/setup` and `devEngines` (#834) ([`d1f5292`](https://github.com/unjs/fontaine/commit/d1f5292))
- chore: release `fontless` ([`863cdf7`](https://github.com/unjs/fontaine/commit/863cdf7))
- chore: release `fontless` ([`25c43d5`](https://github.com/unjs/fontaine/commit/25c43d5))
- chore: release `fontless` ([`62bf566`](https://github.com/unjs/fontaine/commit/62bf566))
- chore: release `fontless` ([`68dd79f`](https://github.com/unjs/fontaine/commit/68dd79f))

### fontless (0.4.2 → 0.4.3)

### enhancements
- support font metric override descriptors (#828)

## hookable

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v6.1.2](https://github.com/unjs/hookable/releases/tag/v6.1.2)

### fixes

- Copy hooks before iterating in callHook ([#166](https://github.com/unjs/hookable/pull/166))

## image-meta

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v0.3.0](https://github.com/unjs/image-meta/releases/tag/v0.3.0)

### enhancements

- **tiff:** Support BigTIFF ([4e754b0](https://github.com/unjs/image-meta/commit/4e754b0))
- **ktx:** Support KTX 2.0 ([7a766b9](https://github.com/unjs/image-meta/commit/7a766b9))
- Support JPEG XL ([c9e5e6b](https://github.com/unjs/image-meta/commit/c9e5e6b))
- ⚠️  Report the largest image of multi-image files ([ccd03d3](https://github.com/unjs/image-meta/commit/ccd03d3))
- **jpg:** Support lossless and arithmetic-coded frames ([94c7ec7](https://github.com/unjs/image-meta/commit/94c7ec7))

### 🔥 performance

- Compare box types and segment markers as numbers instead of decoded strings ([5e2eea3](https://github.com/unjs/image-meta/commit/5e2eea3))

### fixes

- **svg:** Ignore an `<svg>` tag inside an XML comment ([#78](https://github.com/unjs/image-meta/pull/78))
- **icns:** Reject truncated and zero-length entries ([8a1da94](https://github.com/unjs/image-meta/commit/8a1da94))
- **ico:** Validate image count against input length ([d5806a3](https://github.com/unjs/image-meta/commit/d5806a3))
- **tiff:** Read big-endian LONG tag values correctly ([ec7ab13](https://github.com/unjs/image-meta/commit/ec7ab13))
- **heic, avif:** Apply clean aperture crop and validate boxes ([3a69171](https://github.com/unjs/image-meta/commit/3a69171))
- **jpg:** Skip extraneous bytes between segments ([cda47ea](https://github.com/unjs/image-meta/commit/cda47ea))
- **icns:** Skip non-icon entries ([cde19af](https://github.com/unjs/image-meta/commit/cde19af))
- Throw on truncated input instead of returning NaN sizes ([92fc71e](https://github.com/unjs/image-meta/commit/92fc71e))
- **j2c:** Subtract the image offset from the reference grid size ([db4da5e](https://github.com/unjs/image-meta/commit/db4da5e))
- **svg:** Parse viewBox values separated by commas or extra whitespace ([871ded8](https://github.com/unjs/image-meta/commit/871ded8))
- Propagate NaN from signed readers on truncated input ([6f1ecc3](https://github.com/unjs/image-meta/commit/6f1ecc3))
- Reject zero width and negative sizes ([4a6da3d](https://github.com/unjs/image-meta/commit/4a6da3d))
- **tiff:** Harden IFD parsing ([c136a90](https://github.com/unjs/image-meta/commit/c136a90))
- **jpg:** Stop at start of scan and skip stuffed bytes when resyncing ([31fe1f0](https://github.com/unjs/image-meta/commit/31fe1f0))
- **jxl:** Read container codestream boxes without copying or requiring the whole box ([a79283b](https://github.com/unjs/image-meta/commit/a79283b))
- **icns:** Add missing icon types and correct ic12 size ([bfd5919](https://github.com/unjs/image-meta/commit/bfd5919))
- **svg:** Only match root at first <svg> tag to avoid quadratic backtracking ([198a89d](https://github.com/unjs/image-meta/commit/198a89d))
- **pnm:** Read header lines lazily to avoid quadratic shift() and whole-input decode ([2c6374a](https://github.com/unjs/image-meta/commit/2c6374a))
- **svg:** Correct pica (pc) unit conversion to 16px ([fc522ba](https://github.com/unjs/image-meta/commit/fc522ba))
- **svg:** Keep viewBox precision and round derived size to nearest pixel ([d7b8fe9](https://github.com/unjs/image-meta/commit/d7b8fe9))
- **pnm:** Parse header tokens separated by any whitespace and comments ([777135e](https://github.com/unjs/image-meta/commit/777135e))
- **jpg:** Inspect the first segment marker after SOI ([d0a2ea1](https://github.com/unjs/image-meta/commit/d0a2ea1))
- **jpg:** Read EXIF IFD0 offset from the TIFF header ([61ff67d](https://github.com/unjs/image-meta/commit/61ff67d))
- **bmp:** Read OS/2 v1 core header size as 16-bit and reject negative width ([4f8b659](https://github.com/unjs/image-meta/commit/4f8b659))
- **ktx:** Honor the KTX 1.1 endianness field for big-endian files ([d581fc9](https://github.com/unjs/image-meta/commit/d581fc9))
- **avif:** Detect AVIF from ftyp compatible brands and avis sequences ([3c56c47](https://github.com/unjs/image-meta/commit/3c56c47))
- **icns, heic:** Bound memory on repeated icon entries and ispe boxes ([72684e7](https://github.com/unjs/image-meta/commit/72684e7))
- **svg:** Find the root tag with a byte scan instead of a backtracking regex ([9a90ba2](https://github.com/unjs/image-meta/commit/9a90ba2))
- Reject image sizes that are not safe integers ([b605abf](https://github.com/unjs/image-meta/commit/b605abf))

### refactors

- **jp2:** Locate the ihdr box instead of assuming box order ([7e652be](https://github.com/unjs/image-meta/commit/7e652be))

### types

- Width and height are always numbers ([336a3c2](https://github.com/unjs/image-meta/commit/336a3c2))

### ⚠️ breaking changes

- ⚠️  Report the largest image of multi-image files ([ccd03d3](https://github.com/unjs/image-meta/commit/ccd03d3))
- ⚠️  Migrate to obuild and drop cjs build ([3e97b7b](https://github.com/unjs/image-meta/commit/3e97b7b))

## jup

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v0.6.0](https://github.com/unjs/jup/releases/tag/v0.6.0)

### enhancements

- Infer the pnpm major from pnpm-lock.yaml's lockfileVersion ([9f8c796](https://github.com/unjs/jup/commit/9f8c796))
- Support devEngines onFail "download" ([bfc7fc8](https://github.com/unjs/jup/commit/bfc7fc8))
- ⚠️ Make jup.lock creation opt-in behind --lock ([4f098db](https://github.com/unjs/jup/commit/4f098db))
- Better error message for packageManager check ([#9](https://github.com/unjs/jup/pull/9))
- Let npm run in foreign-pinned projects with a warning ([f0c1e16](https://github.com/unjs/jup/commit/f0c1e16))

### 🔥 performance

- Compress the embedded addon with zstd instead of deflate ([ca3987d](https://github.com/unjs/jup/commit/ca3987d))

### fixes

- **test:** Capture the real mkdirSync before patching getBuiltinModule ([32c2558](https://github.com/unjs/jup/commit/32c2558))
- Replace the shim process with native tools instead of spawning ([4e39ee6](https://github.com/unjs/jup/commit/4e39ee6))
- Hand the IPC channel to native tools with an execve addon ([502a12a](https://github.com/unjs/jup/commit/502a12a))

## magic-regexp

This month, we release 2 new releases (0 major release, 0 minor release and 2 patch releases):

- [v0.11.2](https://github.com/unjs/magic-regexp/releases/tag/v0.11.2)
- [v0.11.1](https://github.com/unjs/magic-regexp/releases/tag/v0.11.1)

### 👉 changelog



### 🔥 performance

- reduce type instantiations (#762)

### fixes

- **types:** reserve a slot per capture group inside lookarounds ([`6c38003`](https://github.com/unjs/magic-regexp/commit/6c38003))
- **converter:** wrap argument lists when chaining helpers ([`d4981f5`](https://github.com/unjs/magic-regexp/commit/d4981f5))
- break circular import between core internal and inputs ([`2565619`](https://github.com/unjs/magic-regexp/commit/2565619))

### documentation

- point changelog link at releases (#740)

## magicast

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.5.5](https://github.com/unjs/magicast/releases/tag/v0.5.5)

### bug fixes

- **array**: Support variadic push/unshift and open-ended splice - by @MFA-G and **MFA-G** in https://github.com/unjs/magicast/issues/178 [<samp>(abea2)</samp>](https://github.com/unjs/magicast/commit/abea2cf)
- **format**: Omit undetected options instead of returning undefined - by @MFA-G in https://github.com/unjs/magicast/issues/173 [<samp>(efa00)</samp>](https://github.com/unjs/magicast/commit/efa00a8)
- **imports**: Keep proxy source in sync - by @lprnmns in https://github.com/unjs/magicast/issues/175 [<samp>(e90ac)</samp>](https://github.com/unjs/magicast/commit/e90ac46)

## nypm

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.6.10](https://github.com/unjs/nypm/releases/tag/v0.6.10)

### fixes

- Select the workspace root for aube and nub ([#260](https://github.com/unjs/nypm/pull/260))

## obuild

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.4.40](https://github.com/unjs/obuild/releases/tag/v0.4.40)

### enhancements

- Opt-in per-package dependency tracing with nf3 (`trace` option) ([80b4430](https://github.com/unjs/obuild/commit/80b4430))
- Support `bytes` and `text` import attributes in bundle entries ([af6483b](https://github.com/unjs/obuild/commit/af6483b))

## pkg-types

This month, we release 2 new releases (0 major release, 0 minor release and 2 patch releases):

- [v2.3.3](https://github.com/unjs/pkg-types/releases/tag/v2.3.3)
- [v2.3.2](https://github.com/unjs/pkg-types/releases/tag/v2.3.2)

### fixes

- **tsconfig:** Mark deprecated compiler options ([80b6b77](https://github.com/unjs/pkg-types/commit/80b6b77))

### 🔥 performance

- Load each format's parser only when a file needs it ([#280](https://github.com/unjs/pkg-types/pull/280))
### fixes
- Inline tsconfig compiler option types ([#281](https://github.com/unjs/pkg-types/pull/281))
- **gitconfig:** Resolve file URLs in `resolveGitConfig` ([#273](https://github.com/unjs/pkg-types/pull/273))

## rc9

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v3.1.0](https://github.com/unjs/rc9/releases/tag/v3.1.0)

### enhancements

- Create target directory when writing config ([#185](https://github.com/unjs/rc9/pull/185))
- Export `userConfigDir` ([#186](https://github.com/unjs/rc9/pull/186))

## setup-jup

This month, we release 1 new release (1 major release, 0 minor release and 0 patch release):

- [v1.0.0](https://github.com/unjs/setup-jup/releases/tag/v1.0.0)



## unhead

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v3.4.1](https://github.com/unjs/unhead/releases/tag/v3.4.1)

### bug fixes

- **bundler**:
- Inject resolved path for devtools runtime plugin - by @danielroe in https://github.com/unjs/unhead/issues/974 [<samp>(fe51f)</samp>](https://github.com/unjs/unhead/commit/fe51fa59)
- Render devtools payload after validation - by @harlan-zw in https://github.com/unjs/unhead/issues/985 [<samp>(e740a)</samp>](https://github.com/unjs/unhead/commit/e740a217)
- **unhead**:
- Handle relative useScript warmup URLs - by @lprnmns in https://github.com/unjs/unhead/issues/973 [<samp>(bb4cb)</samp>](https://github.com/unjs/unhead/commit/bb4cb67a)
- Resolve HTTP-prefixed relative canonical URLs - by @lprnmns in https://github.com/unjs/unhead/issues/977 [<samp>(270a9)</samp>](https://github.com/unjs/unhead/commit/270a969f)
- **validate**:
- Reduce warnings for normal Nuxt output - by @harlan-zw in https://github.com/unjs/unhead/issues/986 [<samp>(ef346)</samp>](https://github.com/unjs/unhead/commit/ef3463e1)
- **vite,stream**:
- Support manifest-mode `transformIndexHtml()` - by @harlan-zw in https://github.com/unjs/unhead/issues/970 [<samp>(237d7)</samp>](https://github.com/unjs/unhead/commit/237d7f3a)

## unifont

This month, we release 3 new releases (1 major release, 0 minor release and 2 patch releases):

- [v1.0.2](https://github.com/unjs/unifont/releases/tag/v1.0.2)
- [v1.0.1](https://github.com/unjs/unifont/releases/tag/v1.0.1)
- [v1.0.0](https://github.com/unjs/unifont/releases/tag/v1.0.0)

### 👉 changelog



### 🔥 performance

- isolate provider failures + initialise providers lazily (#531)

### fixes

- **google:** serve curated subsets when `glyphs` cover them (#532)

### documentation

- reorder controls over sample text ([`7af4f6c`](https://github.com/unjs/unifont/commit/7af4f6c))
- use zero-layout shift option for ⌘/Ctrl ([`8958bbf`](https://github.com/unjs/unifont/commit/8958bbf))

### 📣 some news



### 🎂 unifont is 1.0

`unifont` was first released in October 2024, and in that time it's become the font resolution layer behind [`@nuxt/fonts`](https://fonts.nuxt.com), [`fontless`](https://github.com/unjs/fontaine/tree/main/packages/fontless) and Astro's font support. The API has been stable in practice for a while, so this release makes that official.

### unifont.dev

There's now a project site at [unifont.dev](https://unifont.dev) which I've had a lot of fun hacking on. It's built _with_ unifont, fontaine and fontless, and it's meant both as a useful site and a showcase of what unifont can do.
<img width="1624" height="1062" alt="Screenshot 2026-09-22 at 13 54 34" src="https://github.com/user-attachments/assets/31a3d3f6-67d0-4f54-aeb5-b7c8447f5cf9" />

### 👀 highlights



### 🎛️ arbitrary variation axes

`resolveFont` now takes any registered or custom OpenType axis, not just weight and style (#511). You can pass single values or ranges:
```ts
const { fonts, variableAxis } = await unifont.resolveFont('Recursive', {
variableAxis: {
CASL: [1],
slnt: [{ min: -15, max: 0 }],
},
})
```
Providers vary in what they can honour, so the result tells you what became of each axis. `variableAxis.CASL.appliedAs` is `'font-file'` when the provider served a file instanced to those values, `'variation-settings'` when it ended up in the `@font-face` descriptor, and `'none'` when it's left for you to apply at use site.
Axes a family actually publishes are reported by `getFontProperties`, as `axes`.

### 📐 font metrics from providers

Providers can now report metrics for a family or an individual face (#499), in the same vocabulary as `@capsizecss/metrics`:
```ts
const { metrics } = await unifont.getFontProperties('Poppins')
// { unitsPerEm: 1000, ascent: 1050, descent: -350, ... }
```
That's enough to calculate `size-adjust`, `ascent-override` etc. for a fallback font without downloading and parsing the font binary. The new [Reducing layout shift](https://unifont.dev/docs/layout-shift) guide walks through both that and the easier route of letting `fontless` or `@nuxt/fonts` do it.

### 🌍 it runs in the browser

This was released previously, but it's worth repeating: `unifont` now detects a browser or a web container and routes provider metadata requests through a hosted proxy (at https://proxy.unifont.dev).
Only the fixed list of provider metadata endpoints is rewritten. Font files, npm CDNs and your own custom provider's API are always fetched directly. `https://proxy.unifont.dev` is best-effort and rate-limited at our discretion, so [deploy your own](https://unifont.dev/docs/proxy) if you depend on it, or pass `apiBase: false` to turn it off.

### breaking changes



### deprecated type aliases removed

`GoogleOptions` and `GoogleiconsOptions` have been removed. They've been deprecated since `0.3.0`; use `GoogleProviderOptions` and `GoogleiconsProviderOptions` instead.
```diff
- import type { GoogleOptions } from 'unifont'
+ import type { GoogleProviderOptions } from 'unifont'
```
### 👉 changelog

### enhancements

- Allow providers to report font metrics ([#499](https://github.com/unjs/unifont/pull/499))
- Support arbitrary variable axes ([#511](https://github.com/unjs/unifont/pull/511))
### fixes
- **fontshare:** Return absolute font urls ([cd046b6](https://github.com/unjs/unifont/commit/cd046b6))
- **google:** Skip requests for styles and subsets a family lacks ([6589bfb](https://github.com/unjs/unifont/commit/6589bfb))
- **google:** Request variable ranges and static weights separately ([553ac22](https://github.com/unjs/unifont/commit/553ac22))
- Use named env to avoid shadowing global process ([b583dda](https://github.com/unjs/unifont/commit/b583dda))
- **fontshare:** Advance pagination offset by page size ([8fd1e11](https://github.com/unjs/unifont/commit/8fd1e11))
- **npm:** Follow @import, anchor urls on stylesheet + support more pkgs ([#509](https://github.com/unjs/unifont/pull/509))
- **npm:** Fall back to stylesheet listed in main ([#510](https://github.com/unjs/unifont/pull/510))
- ⚠️  Export public types and drop deprecated ones ([8dee091](https://github.com/unjs/unifont/commit/8dee091))
### documentation
- Add unifont.dev site ([#486](https://github.com/unjs/unifont/pull/486))
- Fix various ([971d5b0](https://github.com/unjs/unifont/commit/971d5b0))
- Fixes and performance improvements ([1d01d55](https://github.com/unjs/unifont/commit/1d01d55))
- Build in front page specimens, inline entry css + prerender ([1ad2f9b](https://github.com/unjs/unifont/commit/1ad2f9b))
- Defer off-screen specimen faces ([3b2c74d](https://github.com/unjs/unifont/commit/3b2c74d))
- Expose each family name once and tighten lower-page rhythm ([16f41d2](https://github.com/unjs/unifont/commit/16f41d2))
- Separate merged control labels and compact footer credits ([e9042fe](https://github.com/unjs/unifont/commit/e9042fe))
- Improve footer display, add pages, openapi.json + .md routes ([ea2d1cb](https://github.com/unjs/unifont/commit/ea2d1cb))
- Scope specimen faces and skip highlighting huge code blocks ([7ebd676](https://github.com/unjs/unifont/commit/7ebd676))
- More rendering fixes ([10c52e4](https://github.com/unjs/unifont/commit/10c52e4))
- Fix specimen warming ([0993073](https://github.com/unjs/unifont/commit/0993073))
- Add isr rules for font family pages ([0085da4](https://github.com/unjs/unifont/commit/0085da4))
- Use fontless glyph subsetting and runtime head exports ([fda903c](https://github.com/unjs/unifont/commit/fda903c))
- Drop isr rules from font pages ([e009111](https://github.com/unjs/unifont/commit/e009111))
- Cache family endpoint by header ([7ca0b38](https://github.com/unjs/unifont/commit/7ca0b38))
- Improve wording ([c85f472](https://github.com/unjs/unifont/commit/c85f472))
- Preload specimen fonts on home page ([ca9727c](https://github.com/unjs/unifont/commit/ca9727c))
- Keep crossorigin literal for font preloads ([aae86e1](https://github.com/unjs/unifont/commit/aae86e1))
- Add guide for reducing layout shift with font metrics ([8ce2202](https://github.com/unjs/unifont/commit/8ce2202))
- Declare the query parameters cached handlers read ([718f992](https://github.com/unjs/unifont/commit/718f992))
- Keep glyph subsetting to the specimen grids ([cfbedf4](https://github.com/unjs/unifont/commit/cfbedf4))
- Publish + share 'font stacks' via airspace ([#520](https://github.com/unjs/unifont/pull/520))
- Edit published stacks + keep builder across sign-in ([74bba51](https://github.com/unjs/unifont/commit/74bba51))
- Render footer links without route-dependent classes ([0eb15fc](https://github.com/unjs/unifont/commit/0eb15fc))
- Keep stack cards and nav reachable at 320px ([4b82389](https://github.com/unjs/unifont/commit/4b82389))
- Add provider to cache ([#514](https://github.com/unjs/unifont/pull/514))
- Various improvements ([#524](https://github.com/unjs/unifont/pull/524))

### ⚠️ breaking changes

- ⚠️  Export public types and drop deprecated ones ([8dee091](https://github.com/unjs/unifont/commit/8dee091))

## unimport

This month, we release 4 new releases (1 major release, 1 minor release and 2 patch releases):

- [v7.0.2](https://github.com/unjs/unimport/releases/tag/v7.0.2)
- [v7.0.1](https://github.com/unjs/unimport/releases/tag/v7.0.1)
- [v7.0.0](https://github.com/unjs/unimport/releases/tag/v7.0.0)
- [v6.5.0](https://github.com/unjs/unimport/releases/tag/v6.5.0)

### bug fixes

- **scan-dirs**: Dedupe `d.ts` class exports - by @Flo0806 in https://github.com/unjs/unimport/issues/567 [<samp>(525ea)</samp>](https://github.com/unjs/unimport/commit/525ea7c)

### breaking changes

- Make acorn an optional peer dependency - by @danielroe and @antfu in https://github.com/unjs/unimport/issues/557 [<samp>(2c2c4)</samp>](https://github.com/unjs/unimport/commit/2c2c447)

### 🏎 performance

- Skip unnecessary import detection work - by @TheAlexLichter in https://github.com/unjs/unimport/issues/546 [<samp>(0fccb)</samp>](https://github.com/unjs/unimport/commit/0fccb55)

## unplugin

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v3.4.0](https://github.com/unjs/unplugin/releases/tag/v3.4.0)

### bug fixes

- Add missing optional peer deps - by @sxzz [<samp>(e499d)</samp>](https://github.com/unjs/unplugin/commit/e499db8)
- Disallow string filters for resolveId - by @sxzz [<samp>(b7b5f)</samp>](https://github.com/unjs/unplugin/commit/b7b5f73)

## upm

This month, we release 1 new release (0 major release, 1 minor release and 0 patch release):

- [v1.1.0](https://github.com/unjs/upm/releases/tag/v1.1.0)

### enhancements

- **cli:** Accept npm's command names and common flags ([4e41c4d](https://github.com/unjs/upm/commit/4e41c4d))
- Auto install when running scripts ([a20cf07](https://github.com/unjs/upm/commit/a20cf07))
- Offline mode and registry cache ([#2](https://github.com/unjs/upm/pull/2))
- Pluggable store backend ([#4](https://github.com/unjs/upm/pull/4))

### fixes

- **runtime:** Support browser process shims and timers ([948e59f](https://github.com/unjs/upm/commit/948e59f))