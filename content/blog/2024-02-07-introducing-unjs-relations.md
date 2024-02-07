---
title: Introducing UnJS Relations
description: A visual way to understand the UnJS ecosystem and its relations
authors:
  - name: Estéban S
    picture: https://github.com/barbapapazes.png
    twitter: soubiran_
categories:
  - website
packages:
publishedAt: 2024-02-07
modifiedAt: 2024-02-07
---

Today, UnJS is composed with **more than 50 packages**. Every month, new packages are added to the ecosystem.

<!-- image of every packages without any links -->
![UnJS Packages](/assets/images/blog/2024-02-07-introducing-unjs-relations/unjs-packages.webp)

If you're a **newcomer**, there's a good chance you'll get lost in this ocean of packages. Which one should you use? What's the difference between this package and this one? Is there a common point all these packages share? Does Nuxt use UnJS?

If you're **learning UnJS**, you may want to improve your comprehension of the ecosystem.

And if you're **already familiar** with UnJS, you may have a hard time understanding how the different packages are related to each other.

But no matter who you are, can you tell the difference between [Nitro](/packages/nitro) and [H3](/packages/h3)? Do you know what's the relation between Nitro and H3?

With UnJS Relations, **it's never been easier** to answer these questions whether you're a beginner, an expert or explaining UnJS to someone else.

Let's have a look at this new tool.

## UnJS Relations

Visualizing can really help to understand complexe system, even more when each part of the system is connected to each other. That's why we've created UnJS Relations.

UnJS Relations is a visual tool drawing a graph designed to help you to understand the UnJS ecosystem and its relations.

You can choose any UnJS package, any npm package or any combination of both. The graph will be updated in real-time. You can also hide or display both dependencies and devDependencies.

There is an option to show you the children which are packages using the selected package.

You can double click on a package to open a drawer with the package description and the list of its dependencies. With this, you can easily access to a package page or to draw the relations of a package.

![UnJS Relations](/assets/images/blog/2024-02-07-introducing-unjs-relations/unjs-relations.webp)

Back to [Nitro](/packages/nitro) and [H3](/packages/h3) example. You may have noticed that both packages are related to each other. But how? Here the relationship graph:

![Nitro and H3 relationship](/assets/images/blog/2024-02-07-introducing-unjs-relations/nitro-h3-relations.webp)

How to understand this graph?

First, let's take a look at [H3](/packages/h3) dependencies. We can see [radix3](/packages/radix3) which is a router, [unenv](/packages/unenv) which is a tool to make environment agnostic JavaScript and [listhen](/packages/listhen) which is an HTTP listener. With this information, we can say that [H3](/packages/h3) is a tool to build web servers that runtime agnostic.

Now, let's take a look at [Nitro](/packages/nitro) dependencies. There is a lot of common dependencies with [H3](/packages/h3). Nitro has [H3](/packages/h3) as a dependency. This is a first important information that tells us that [Nitro](/packages/nitro) is build on top of it. Some other dependencies are [citty](/packages/citty), a CLI builder, [c12](/packages/c12), a configuration reader, [unstorage](/packages/unstorage), a key-value storage API, [hookable](/packages/hookable), a hooks tool, and [ofetch](/packages/ofetch), a better fetch API.

With this information, we can say that [Nitro](/packages/nitro) is a framework to build web servers with a lot more features than [H3](/packages/h3) and a larger scope. And because it's build on top of [H3](/packages/h3), learning [H3](/packages/h3) will help you to understand [Nitro](/packages/nitro).

### Add npm Packages

Using the `npm Packages` button, you will be able to add any npm package to the graph.

> [!IMPORTANT]
> Remember that we only show you UnJS packages as dependencies of the external package.

For example, let's add `Nuxt` to the graph using the npm source. Do not forget to select it once the package appears in the list.

![Nuxt with UnJS relations](/assets/images/blog/2024-02-07-introducing-unjs-relations/nuxt-unjs-relations.webp)

Yeah, Nuxt is build on top of many UnJS packages including [Nitro](/packages/nitro) and [H3](/packages/h3).

:read-more{to="https://nuxt.com/docs/getting-started/server" title="Server Engine of Nuxt"}

You can try it with any npm package you want!

## Final Words

We really hope that this tool will help you to understand the UnJS ecosystem and how the different packages are related to each other. With a better comprehension of the ecosystem, you will be able to make better decisions and to build better applications.

[Try it now](/relations) and share with us, [on X](https://x.com/unjsio), your best relations!
