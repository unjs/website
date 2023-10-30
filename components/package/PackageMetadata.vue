<script lang="ts" setup>
defineProps<{
  documentation: string
  github: {
    repo: string
    owner: string
  }
  npm: {
    name: string
  }
}>()
</script>

<template>
  <nav class="flex flex-col items-center gap-6 xl:gap-4">
    <UButton color="primary" size="xl" :to="documentation" rel="noopener" class="w-full" :ui="{ base: 'justify-center', variant: { solid: 'shadow-none text-zinc-900' } }">
      Documentation
    </UButton>
    <hr class="w-1/2 rounded-full border border-zinc-900/20">
    <div class="w-full flex flex-col">
      <PackageExternalLink :to="toGitHubRepo(github.owner, github.repo)">
        <span class="w-4 h-4 block i-simple-icons-github" />
        <span>
          View source
        </span>
      </PackageExternalLink>
      <PackageExternalLink :to="toGitHubLatestRelease(github.owner, github.repo)">
        <span class="w-4 h-4 block i-simple-icons-github" />
        <span>
          Latest release
        </span>
      </PackageExternalLink>
      <PackageExternalLink :to="toGitHubIssue(github.owner, github.repo)">
        <span class="w-4 h-4 block i-simple-icons-github" />
        <span>
          Report an issue
        </span>
      </PackageExternalLink>
    </div>
    <hr class="w-1/2 rounded-full border border-zinc-900/20">
    <div class="w-full">
      <PackageExternalLink :to="toNpmPackage(npm.name)">
        <span class="w-4 h-4 block i-vscode-icons-file-type-npm" />
        <span>
          Discover the package
        </span>
      </PackageExternalLink>
    </div>
  </nav>
</template>
