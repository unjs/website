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
  <nav flex="~ col items-center" gap="6 xl:4">
    <AppButton :to="documentation" rel="noopener" w-full>
      Documentation
    </AppButton>
    <hr w="1/2" rounded="full" border="~ gray-900 op-20">
    <div w-full flex="~ col">
      <PackageExternalLink :to="toGitHubRepo(github.owner, github.repo)">
        <span w-4 h-4 block i="logos-github-icon?mask" />
        <span>
          View source
        </span>
      </PackageExternalLink>
      <PackageExternalLink :to="toGitHubLatestRelease(github.owner, github.repo)">
        <span w-4 h-4 block i="logos-github-icon?mask" />
        <span>
          Latest release
        </span>
      </PackageExternalLink>
      <PackageExternalLink :to="toGitHubIssue(github.owner, github.repo)">
        <span w-4 h-4 block i="logos-github-icon?mask" />
        <span>
          Report an issue
        </span>
      </PackageExternalLink>
    </div>
    <hr w="1/2" rounded="full" border="~ gray-900 op-20">
    <div w-full>
      <PackageExternalLink :to="toNpmPackage(npm.name)">
        <span w-4 h-4 block i-vscode-icons-file-type-npm />
        <span>
          Discover the package
        </span>
      </PackageExternalLink>
    </div>
  </nav>
</template>
