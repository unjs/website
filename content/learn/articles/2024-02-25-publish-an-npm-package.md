---
title: Publish an npm Package
description: Automate the process of publishing to the npm registry with changelogen.
authors:
  - name: Estéban S
    picture: https://github.com/barbapapazes.png
    twitter: soubiran_
category: building-blocks
packages:
  - unbuild
  - changelogen
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

[In the previous article](https://unjs.io/learn/articles/2024-02-18-add-a-playground-to-a-npm-package) of this series, we added a playground to a package. Now, we will publish it to the npm registry and automate the process.

> [!NOTE]
> For a better understanding of this article, we recommend reading [the previous one](https://unjs.io/learn/articles/2024-02-18-add-a-playground-to-a-npm-package).

## Publishing to npm

> [!IMPORTANT]
> Read attentively these sections but **do not publish the package** until the section [Automating the Process](#automating-the-process) is read. Otherwise, many mistakes could be made.

Before publishing a package, we need to make sure we have an npm account and are logged in within the terminal. See [`npm login`](https://docs.npmjs.com/cli/v10/commands/npm-login) for more information.

We have [created](https://unjs.io/learn/articles/2024-02-17-create-a-npm-package) and [tried](https://unjs.io/learn/articles/2024-02-18-add-a-playground-to-a-npm-package) our package, we are ready to publish it to the npm registry and **share it with the world**.

First, we need to find a name, available on the npm registry, for our package. Once we have it, we must update the `name` field in the `package.json` file.

```json
{
  "name": "my-package" // Replace with your package name
  // ...
}
```

> [!TIP]
> It's possible to scope our package by using the `@` symbol followed by the scope name. For example, `@barbapapazes/my-package` is scoped to `barbapapazes` which is my npm username.

Before publishing our package, we need to build it using the script from [the first article of this series](https://unjs.io/learn/articles/2024-02-17-create-a-npm-package).

```sh
npm run build
```

Finally, we can publish our package to the npm registry using the `npm publish` command.

```sh
npm publish # Do not run this command yet
```

> [!TIP]
> To fake the publish process, we can use the `--dry-run` flag. This will show us what would be published without actually publishing it.

And that's it! Our package is now available on the npm registry to be installed and used by anyone using `npm install my-package`.

## Adding a Changelog

A changelog is a file that contains a curated, chronologically ordered list of notable changes for each version of a project. It's a way to keep track of the changes made to our package. It helps users to understand what's new and what's changed between versions.

> [!TIP]
> Read [keepchangelog.com](https://keepachangelog.com/en/1.1.0/) to learn more about the changelog format.

To do so, let's create a `CHANGELOG.md` file at the root of our package.

```md
# Changelog

All notable changes to this project will be documented in this file.
```

Imagine we add a new feature to our package. We can add a new section to the changelog file.

```md
## [Unreleased]

- New feature and its description
```

These changes can be committed.

```sh
git add .
git commit -m "feat: add new feature"
```

Once we are ready to publish a new version of our package, we can update the `CHANGELOG.md` file with the new version number and the date and moving the changes from the `[Unreleased]` section to the new version section.

```md
# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-02-25

- New feature and its description
```

Then, we can update the `version` field in the `package.json` file.

```json
{
  "version": "1.0.0"
  // ...
}
```

we can commit all of this, create and take and finally publish the package.

```sh
git add CHANGELOG.md package.json
git commit -m "chore: release v1.0.0"
git tag v1.0.0
npm run build
npm publish # Do not run this command yet
git push --follow-tags
```

It's start to be a lot of commands to run. And we need to remember every step, in the correct order to avoid errors.

Even worse, imagine if we have to do this process for multiple packages. It would be a nightmare to manage and time consuming. If we work with a team, it's even more complicated because we need to make sure everyone follows the same process.

It's impossible so we need to automate the process as much as possible.

## Automating the Process

Publishing a package to the npm registry is actually more complicated than just pushing some code to the registry. There is a lot of actions to think about and to do in the correct order. It's easy to forget something, make a mistake and it's not scalable.

> [!NOTE]
> All of the following is based on [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). It's a good convention to follow to have **human and machine readable commit messages** even if you don't use the following tools.

First simplification is to use the [prepack hook](https://docs.npmjs.com/cli/v10/using-npm/scripts#life-cycle-scripts) to ensure that the package is built before being published.

```json
{
  "scripts": {
    "prepack": "npm run build"
  }
}
```

This hook will be executed automatically when we run `npm publish`. It's a good way to ensure that the package is built before being published.

Then, writing manually the changelog and updating the version in the `package.json` file can be automated using [unjs/changelogen](https://github.com/unjs/changelogen).

Changelogen is a tool to automatically bump the version, create the changelog based on the commit, that's why following the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) is important, create a commit and tag it. All of this in one command!

> [!NOTE]
> [unjs/changelogen](https://github.com/unjs/changelogen) can do a lot more. Explore the [README](https://github.com/unjs/changelogen) to see all the possibilities.

We will add all of this into a new script in the `package.json` file.

```json
{
  "scripts": {
    "release": "changelogen --release && npm publish && git push --follow-tags"
  }
}
```

This `release` command will:

1. Bump the version in the `package.json` file
2. Create a new section in the `CHANGELOG.md` file
3. Create a commit with the changes
4. Create a tag with the new version
5. Build the package
6. Publish the package to the npm registry
7. Push the commit and the tag to the remote repository

Now, we can run `npm run release` to publish a new version of our package. It's a lot easier and less error-prone than before.

## Final Thoughts

We learned how to publish a package to the npm registry and every step need to be done before publishing. All of these are manual, error-prone and time-consuming. So we automated the process using the `prepack` hook and [unjs/changelogen](https://github.com/unjs/changelogen). We are now able to publish a new version of our package with a single command without forgetting anything. We are ready to publish thousands of packages per day!

In this article we show one of the many ways to automate the process of publishing a package to the npm registry.

The advantage is that **we are not sticking to a specific platform**. Everything run on our machine and directly publish to the npm registry. The more we automate, the more the process is linked to a platform.

Because every project are different and have different needs, it's possible to use [changelogen](https://github.com/unjs/changelogen) programmatically to create custom scripts or a CI **to adapt the process to our needs**.
