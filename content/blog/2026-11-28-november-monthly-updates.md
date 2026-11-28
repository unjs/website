---
title: Monthly updates (November 2026)
description: 14 releases this month! What's new in the UnJS ecosystem?
authors:
  - name:
    picture:
    twitter:
category:
  - releases
packages:
  - capnp-es
  - ocache
  - unenv
  - unhead
  - unimport
  - unpdf
publishedAt: 2026-11-28T06:27:25.842Z
modifiedAt: 2026-11-28T06:27:25.842Z
---

## capnp-es

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.0.17](https://github.com/unjs/capnp-es/releases/tag/v0.0.17)

### fixes

- Grow single segment arena geometrically ([#92](https://github.com/unjs/capnp-es/pull/92))
- Preserve used segment lengths in Message.copy() ([#93](https://github.com/unjs/capnp-es/pull/93))
- Include segment 0 in the frame header of empty messages ([#94](https://github.com/unjs/capnp-es/pull/94))

## ocache

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v0.3.2](https://github.com/unjs/ocache/releases/tag/v0.3.2)

### 🔥 performance

- Look up narrowed request headers by name ([#114](https://github.com/unjs/ocache/pull/114))

### fixes

- Preserve stale entry when swr refresh throws ([#113](https://github.com/unjs/ocache/pull/113))

## unenv

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v2.0.0-rc.25](https://github.com/unjs/unenv/releases/tag/v2.0.0-rc.25)

### fixes

- Avoid marking resolved preset values as readonly ([#534](https://github.com/unjs/unenv/pull/534))

## unhead

This month, we release 7 new releases (0 major release, 1 minor release and 6 patch releases):

- [v3.5.3](https://github.com/unjs/unhead/releases/tag/v3.5.3)
- [v3.5.2](https://github.com/unjs/unhead/releases/tag/v3.5.2)
- [v3.5.1](https://github.com/unjs/unhead/releases/tag/v3.5.1)
- [v2.1.19](https://github.com/unjs/unhead/releases/tag/v2.1.19)
- [v3.5.0](https://github.com/unjs/unhead/releases/tag/v3.5.0)
- [v2.1.18](https://github.com/unjs/unhead/releases/tag/v2.1.18)
- [v1.11.21](https://github.com/unjs/unhead/releases/tag/v1.11.21)

### bug fixes

- **bundler**: Fall back to json parse when raw transfer allocation fails - by @danielroe in https://github.com/unjs/unhead/issues/1160 [<samp>(506b1)</samp>](https://github.com/unjs/unhead/commit/506b16e96)
- **scripts**: Respect disabled warmup strategy - by @harlan-zw and **Harlan GitHub Agent** in https://github.com/unjs/unhead/issues/1159 [<samp>(b26d9)</samp>](https://github.com/unjs/unhead/commit/b26d97ca5)

### 🏎 performance

- Trim bundle size across schema-org, unhead, and vue - by @harlan-zw in https://github.com/unjs/unhead/issues/1162 [<samp>(5bdc7)</samp>](https://github.com/unjs/unhead/commit/5bdc7eb05)
- **unhead**:
- Optimize inline script and style hotpaths - by @harlan-zw in https://github.com/unjs/unhead/issues/1161 [<samp>(982f2)</samp>](https://github.com/unjs/unhead/commit/982f2ddd1)
- Reduce SSR resolve and plugin allocations - by @harlan-zw in https://github.com/unjs/unhead/issues/1164 [<samp>(95911)</samp>](https://github.com/unjs/unhead/commit/9591167ed)

### ⚡ less work during hydration

A page can arrive with a large inline stylesheet that Unhead never needs to update. Unhead now skips building a lookup key from that CSS unless a client tag needs it. That made first hydration 23% faster in our Nuxt-style benchmark. [Benchmark results](https://github.com/unjs/unhead/pull/1136)

### 🌱 experimental lazy mode

If the server already rendered all head tags your page needs, you can try the experimental lazy head. It queues changes until you call `head.load()`. It’s available for Vue, React, Svelte, Solid and vanilla JavaScript. [Lazy head API](https://github.com/unjs/unhead/blob/v3.5.0/docs/head/7.api/lazy-head.md)
This work also opens the door to [compiled mode](https://github.com/unjs/unhead/pull/1062). That’s an opt-in approach we’re exploring for a future release, where the build prepares head tags ahead of time.

### changelog



### features

- Opt-in lazy head - by @harlan-zw in https://github.com/unjs/unhead/issues/1063 [<samp>(a464d)</samp>](https://github.com/unjs/unhead/commit/a464dc9d)
- Add lazy head entries for React, Svelte and Solid - by @harlan-zw in https://github.com/unjs/unhead/issues/1079 [<samp>(70e51)</samp>](https://github.com/unjs/unhead/commit/70e51ff0)
- **bundler**: Add serverOnlyCrawlerTags option - by @harlan-zw in https://github.com/unjs/unhead/issues/1059 [<samp>(8db92)</samp>](https://github.com/unjs/unhead/commit/8db921d4)
- **unhead**: Allow precomputing static server init entires - by @danielroe in https://github.com/unjs/unhead/issues/1029 [<samp>(0bf88)</samp>](https://github.com/unjs/unhead/commit/0bf88e32)
- **validate**: Suggest keys for large inline tags - by @harlan-zw in https://github.com/unjs/unhead/issues/1129 [<samp>(05c16)</samp>](https://github.com/unjs/unhead/commit/05c16b52)
- **vite**: Convert Vite descriptors for SSR - by @harlan-zw in https://github.com/unjs/unhead/issues/969 [<samp>(4e42f)</samp>](https://github.com/unjs/unhead/commit/4e42fd7a)
### bug fixes
- **angular**:
- Parse rendered SSR root attributes - by @harlan-zw in https://github.com/unjs/unhead/issues/1098 [<samp>(0808c)</samp>](https://github.com/unjs/unhead/commit/0808cdde)
- **bundler**:
- Export shared public signature types - by @harlan-zw in https://github.com/unjs/unhead/issues/1025 [<samp>(a8234)</samp>](https://github.com/unjs/unhead/commit/a82348da)
- Detach script events from devtools snapshots - by @harlan-zw in https://github.com/unjs/unhead/issues/1032 [<samp>(3ccd1)</samp>](https://github.com/unjs/unhead/commit/3ccd10c2)
- Preserve bodies when removing server composables - by @harlan-zw in https://github.com/unjs/unhead/issues/1036 [<samp>(5498d)</samp>](https://github.com/unjs/unhead/commit/5498d727)
- **ci**:
- Skip stale bundle stats updates - by @harlan-zw in https://github.com/unjs/unhead/issues/1119 [<samp>(93e72)</samp>](https://github.com/unjs/unhead/commit/93e72a78)
- **minify**:
- Preserve inline script and style semantics - by @harlan-zw in https://github.com/unjs/unhead/issues/1073 [<samp>(a3833)</samp>](https://github.com/unjs/unhead/commit/a3833032)
- **schema-org**:
- Accept Vue getter inputs - by @harlan-zw in https://github.com/unjs/unhead/issues/1030 [<samp>(348d0)</samp>](https://github.com/unjs/unhead/commit/348d0753)
- Keep the logo on specialized organization identities - by @vasilistotskas in https://github.com/unjs/unhead/issues/1034 [<samp>(b35b0)</samp>](https://github.com/unjs/unhead/commit/b35b05c4)
- Keep the site identity as the WebSite publisher - by @MFA-G in https://github.com/unjs/unhead/issues/1067 [<samp>(f5a83)</samp>](https://github.com/unjs/unhead/commit/f5a83795)
- Only the identity organization inherits the site host url - by @Hayabusa-YL in https://github.com/unjs/unhead/issues/1069 [<samp>(1fbe4)</samp>](https://github.com/unjs/unhead/commit/1fbe4c06)
- Keep unrelated people from becoming article authors - by @mayankdhingra02 in https://github.com/unjs/unhead/issues/1074 [<samp>(e4975)</samp>](https://github.com/unjs/unhead/commit/e4975601)
- Keep Event locations with a url and an address as a Place - by @magndotcc in https://github.com/unjs/unhead/issues/1071 [<samp>(d5105)</samp>](https://github.com/unjs/unhead/commit/d51057c2)
- Match WebPage slugs without case sensitivity - by @harlan-zw in https://github.com/unjs/unhead/issues/1076 [<samp>(bbbc4)</samp>](https://github.com/unjs/unhead/commit/bbbc4e17)
- Resolve relative location URLs - by @magndotcc in https://github.com/unjs/unhead/issues/1070 [<samp>(a422c)</samp>](https://github.com/unjs/unhead/commit/a422ced4)
- Preserve protocol-relative URLs - by @harlan-zw in https://github.com/unjs/unhead/issues/1078 [<samp>(616af)</samp>](https://github.com/unjs/unhead/commit/616af7b8)
- Scope generated counter ids to each page - by @harlan-zw in https://github.com/unjs/unhead/issues/1077 [<samp>(02ba1)</samp>](https://github.com/unjs/unhead/commit/02ba1961)
- **scripts**:
- Preserve explicit undefined crossorigin - by @harlan-zw in https://github.com/unjs/unhead/issues/1068 [<samp>(546c9)</samp>](https://github.com/unjs/unhead/commit/546c9a1d)
- Hydrate server trigger scripts from the server element - by @harlan-zw in https://github.com/unjs/unhead/issues/1091 [<samp>(6a788)</samp>](https://github.com/unjs/unhead/commit/6a788b37)
- **unhead**:
- End extracted script and style at the first closing tag - by @NgoQuocViet2001 in https://github.com/unjs/unhead/issues/1028 [<samp>(65050)</samp>](https://github.com/unjs/unhead/commit/650505dc)
- Escape control characters in JSON template parameters - by @henricop in https://github.com/unjs/unhead/issues/1039 [<samp>(f3ab1)</samp>](https://github.com/unjs/unhead/commit/f3ab163c)
- Keep server twitter:card when og:image is server only - by @harlan-zw in https://github.com/unjs/unhead/issues/1093 [<samp>(5ec9f)</samp>](https://github.com/unjs/unhead/commit/5ec9fe44)
- Normalize mixed class and style arrays - by @harlan-zw in https://github.com/unjs/unhead/issues/1109 [<samp>(9ef48)</samp>](https://github.com/unjs/unhead/commit/9ef480f3)
- Scan SSR templates without parse5 - by @harlan-zw in https://github.com/unjs/unhead/issues/1126 [<samp>(61743)</samp>](https://github.com/unjs/unhead/commit/617435a4)
- **vue**:
- Type streaming server head input - by @harlan-zw in https://github.com/unjs/unhead/issues/1103 [<samp>(50165)</samp>](https://github.com/unjs/unhead/commit/50165901)
- Accept computed preload types - by @harlan-zw in https://github.com/unjs/unhead/issues/1116 [<samp>(1ed48)</samp>](https://github.com/unjs/unhead/commit/1ed486c7)
### 🏎 performance
- Shrink the unhead client core - by @harlan-zw in https://github.com/unjs/unhead/issues/1080 [<samp>(c8590)</samp>](https://github.com/unjs/unhead/commit/c859067c)
- Release removed untracked elements from the dom cache - by @danielroe in https://github.com/unjs/unhead/issues/1081 [<samp>(c65cd)</samp>](https://github.com/unjs/unhead/commit/c65cd034)
- **bench**:
- Measure hydration of a Nuxt-style SSR head - by @harlan-zw in https://github.com/unjs/unhead/issues/1113 [<samp>(2d49a)</samp>](https://github.com/unjs/unhead/commit/2d49a603)
- Report Fieldnote entry Brotli bytes - by @harlan-zw in https://github.com/unjs/unhead/issues/1122 [<samp>(dbdc7)</samp>](https://github.com/unjs/unhead/commit/dbdc7f33)
- Report streaming client and bootstrap sizes - by @harlan-zw in https://github.com/unjs/unhead/issues/1124 [<samp>(f54bb)</samp>](https://github.com/unjs/unhead/commit/f54bb222)
- **bundler**:
- Parse transforms with oxc-parser raw transfer - by @danielroe in https://github.com/unjs/unhead/issues/1075 [<samp>(4817b)</samp>](https://github.com/unjs/unhead/commit/4817b40d)
- **dom**:
- Reduce hydration work and release stale cleanup - by @harlan-zw in https://github.com/unjs/unhead/issues/1108 [<samp>(35028)</samp>](https://github.com/unjs/unhead/commit/35028eca)
- Skip writes for unchanged attribute values - by @harlan-zw in https://github.com/unjs/unhead/issues/1131 [<samp>(018f2)</samp>](https://github.com/unjs/unhead/commit/018f2c7a)
- Skip indexing unused content keys during hydration - by @harlan-zw in https://github.com/unjs/unhead/issues/1136 [<samp>(3423e)</samp>](https://github.com/unjs/unhead/commit/3423e580)
- **ssr**:
- Skip closing-tag replacement for plain inline content - by @harlan-zw in https://github.com/unjs/unhead/issues/1130 [<samp>(04514)</samp>](https://github.com/unjs/unhead/commit/04514427)
- Skip ampersand replacement for plain root attributes - by @harlan-zw in https://github.com/unjs/unhead/issues/1132 [<samp>(525db)</samp>](https://github.com/unjs/unhead/commit/525dbf92)
- **stream**:
- Reduce allocations per stream read - by @harlan-zw in https://github.com/unjs/unhead/issues/1090 [<samp>(14729)</samp>](https://github.com/unjs/unhead/commit/14729a19)
- Minify the streaming bootstrap at build time - by @harlan-zw in https://github.com/unjs/unhead/issues/1123 [<samp>(eb78b)</samp>](https://github.com/unjs/unhead/commit/eb78b4f9)
- **unhead**:
- Avoid the decodeURI throw in template params - by @harlan-zw in https://github.com/unjs/unhead/issues/1064 [<samp>(03db6)</samp>](https://github.com/unjs/unhead/commit/03db60d6)
- Reduce head normalization work - by @harlan-zw in https://github.com/unjs/unhead/issues/1112 [<samp>(c76f6)</samp>](https://github.com/unjs/unhead/commit/c76f6760)
- Reduce title template allocations - by @harlan-zw in https://github.com/unjs/unhead/issues/1117 [<samp>(fa823)</samp>](https://github.com/unjs/unhead/commit/fa823998)
- Share promise walkers - by @harlan-zw in https://github.com/unjs/unhead/issues/1120 [<samp>(1a812)</samp>](https://github.com/unjs/unhead/commit/1a812ba4)
- Reduce the minimal client bundle - by @harlan-zw in https://github.com/unjs/unhead/issues/1138 [<samp>(b3741)</samp>](https://github.com/unjs/unhead/commit/b3741841)
- **vue**:
- Shrink the client useHead path - by @harlan-zw in https://github.com/unjs/unhead/issues/1085 [<samp>(95abc)</samp>](https://github.com/unjs/unhead/commit/95abc5a6)

## unimport

This month, we release 1 new release (0 major release, 0 minor release and 1 patch release):

- [v7.0.3](https://github.com/unjs/unimport/releases/tag/v7.0.3)

### bug fixes

- Only strip known module extensions - by @danielroe in https://github.com/unjs/unimport/issues/577 [<samp>(498f2)</samp>](https://github.com/unjs/unimport/commit/498f2e7)
- Stop annotated destructuring from widening the local declaration scan - by @MFA-G in https://github.com/unjs/unimport/issues/570 [<samp>(6bbb5)</samp>](https://github.com/unjs/unimport/commit/6bbb566)
- **vue-directives**: Avoid stale `lastIndex` on the global directive regex - by @NgoQuocViet2001 in https://github.com/unjs/unimport/issues/579 [<samp>(7b851)</samp>](https://github.com/unjs/unimport/commit/7b85149)
- **vue-template**: Skip type-only imports when resolving template refs - by @jamalkamaladdin in https://github.com/unjs/unimport/issues/572 [<samp>(8f849)</samp>](https://github.com/unjs/unimport/commit/8f84905)

### 🏎 performance

- Skip import detection for modules without matching import names - by @danielroe in https://github.com/unjs/unimport/issues/584 [<samp>(400f0)</samp>](https://github.com/unjs/unimport/commit/400f0b9)

## unpdf

This month, we release 3 new releases (0 major release, 1 minor release and 2 patch releases):

- [v2.2.2](https://github.com/unjs/unpdf/releases/tag/v2.2.2)
- [v2.2.1](https://github.com/unjs/unpdf/releases/tag/v2.2.1)
- [v2.2.0](https://github.com/unjs/unpdf/releases/tag/v2.2.0)

### bug fixes

- Stop installing partial base64, hex and `sumPrecise` globals - by @johannschopplich [<samp>(f9d0c)</samp>](https://github.com/unjs/unpdf/commit/f9d0c2f)

### 🏎 performance

- Extract text and links one page at a time - by @hassanabrar202 in https://github.com/unjs/unpdf/issues/76 [<samp>(1a75b)</samp>](https://github.com/unjs/unpdf/commit/1a75bdd)

### features

- Upgrade to PDF.js v6.5 - by @johannschopplich [<samp>(83e33)</samp>](https://github.com/unjs/unpdf/commit/83e335f)
### bug fixes
- Polyfill `Uint8Array.fromBase64` and `Uint8Array.prototype.toBase64` - by @johannschopplich [<samp>(d19f2)</samp>](https://github.com/unjs/unpdf/commit/d19f2e5)
- Treat workerd as a runtime without canvas, not as Node.js - by @johannschopplich [<samp>(951e0)</samp>](https://github.com/unjs/unpdf/commit/951e053)
- Leave `DOMMatrix` to a custom PDF.js build - by @johannschopplich [<samp>(55397)</samp>](https://github.com/unjs/unpdf/commit/55397c6)
- Accept a Node.js `Buffer` in `getDocumentProxy` - by @johannschopplich [<samp>(8984a)</samp>](https://github.com/unjs/unpdf/commit/8984a8f)
- Declare `pdfjs-dist` as an optional peer dependency - by @johannschopplich [<samp>(3c1a5)</samp>](https://github.com/unjs/unpdf/commit/3c1a552)