<script lang="ts" setup>
import type { PackageJson } from 'pkg-types'
import type { RelationPackage } from '~/types/package'

const toast = useToast()

const open = defineModel<boolean>('open', { required: true })

const { npmPackages: packages, addNpmPackages, addNpmPackage, removeNpmPackage, removeAllNpmPackages } = useRelationsPackages()
const { npmSelection } = useRelationsSelection()
const { updateQuery } = useRelationsQuery()

const selection = ref([...npmSelection.value])

watch(() => npmSelection.value, (value) => {
  selection.value = [...value]
})

/**
 * npm
 */
const npmLoading = ref(false)
const npmName = ref('')
async function addNpm(name: string) {
  name = name.trim().toLowerCase()
  try {
    npmLoading.value = true
    const npmPackage = await fetchNpmPackage(name)
    addNpmPackage(npmPackage)
    npmName.value = ''
    toast.add({
      title: 'Package added',
      description: `The package ${name} has been added.`,
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 3000,
    })
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      toast.add({
        title: 'Error',
        description: error.message,
        icon: 'i-heroicons-x-circle',
        color: 'red',
        timeout: 3000,
      })
    }
  }
  finally {
    npmLoading.value = false
  }
}

/**
 * GitHub
 */
const githubLoading = ref(false)
const githubName = ref('')
async function addGitHub(name: string) {
  name = name.trim().toLowerCase()

  const isSingleRepo = name.includes('/')

  const packages: PackageJson[] = []
  try {
    githubLoading.value = true

    if (isSingleRepo) {
      const { repo } = await fetchGitHubRepo(name)
      const githubPackages = await fetchPackagesFromGitHubRepo(repo.repo, repo.defaultBranch)
      packages.push(...githubPackages)
    }
    else {
      const { repos } = await fetchGitHubRepos(name)
      const githubPackages = await Promise.all(repos.map(async (repo) => {
        return await fetchPackagesFromGitHubRepo(repo.repo, repo.defaultBranch)
      }))
      packages.push(...githubPackages.flat())
    }

    /**
     * Fetch npm packages from GitHub packages to verify if they exist
     */
    const npmPackages = await Promise.all(packages.map(async (pkg) => {
      if (!pkg.name)
        return null

      try {
        return await fetchNpmPackage(pkg.name)
      }
      catch (e) {
        // Do nothing on error
        return null
      }
    })).then(packages => packages.filter(pkg => pkg !== null) as PackageJson[])

    addNpmPackages(npmPackages)

    githubName.value = ''
    toast.add({
      title: 'Package added',
      description: `${npmPackages.length} ${npmPackages.length > 1 ? 'packages' : 'package'} has been added.`,
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 3000,
    })
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
      toast.add({
        title: 'Error',
        description: error.message,
        icon: 'i-heroicons-x-circle',
        color: 'red',
        timeout: 3000,
      })
    }
  }
  finally {
    githubLoading.value = false
  }
}

/**
 * Packages
 */
const hasRemove = ref(false)
function remove(item: RelationPackage) {
  hasRemove.value = true
  removeNpmPackage(item.name)
  selection.value = selection.value.filter(pkg => pkg.name !== item.name)

  toast.add({
    title: 'Package removed',
    description: `The package ${item.name} has been removed.`,
    icon: 'i-heroicons-trash',
    color: 'blue',
    timeout: 3000,
  })
}

/**
 * Footer functions
 */
function clear() {
  selection.value = []
}
function removeAll() {
  removeAllNpmPackages()
  selection.value = []
}
function cancel() {
  if (hasRemove.value)
    updateQuery({ npm: selection.value.map(s => s.npmName) })

  hasRemove.value = false
  open.value = false
}
function validate() {
  updateQuery({ npm: selection.value.map(s => s.npmName) })
  hasRemove.value = false
  open.value = false
}
</script>

<template>
  <UModal v-model="open" :ui="{ width: 'md:max-w-2xl xl:max-w-5xl' }">
    <UCard class="w-full">
      <template #header>
        <div class="flex justify-between">
          <h2 class="font-semibold">
            Manage npm Repositories
          </h2>
          <UButton type="button" aria-label="close" color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1" @click="open = false" />
        </div>
      </template>

      <div class="flex flex-col lg:flex-row gap-4">
        <RelationsNpmForm v-model:loading="npmLoading" v-model:input="npmName" @add="addNpm" />
        <RelationsGitHubForm v-model:loading="githubLoading" v-model:input="githubName" @add="addGitHub" />
      </div>

      <RelationsPackagesCombobox v-model:selection="selection" class="mt-4" :packages="packages" logo="i-simple-icons-npm">
        <template #actions="{ item }">
          <UButton color="red" variant="ghost" icon="i-heroicons-trash" tabindex="-1" @click="remove(item)" />
        </template>
      </RelationsPackagesCombobox>

      <template #footer>
        <div class="flex flex-row justify-between items-center">
          <div class="flex gap-2">
            <UButton type="button" variant="ghost" color="red" @click="clear">
              Clear selection
            </UButton>
            <UButton type="button" variant="ghost" color="red" @click="removeAll">
              Remove all
            </UButton>
          </div>
          <div class="flex justify-end gap-2">
            <UButton type="button" variant="ghost" color="gray" @click="cancel">
              Cancel
            </UButton>
            <UButton type="button" @click="validate">
              Validate
            </UButton>
          </div>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
