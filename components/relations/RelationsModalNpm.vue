<script lang="ts" setup>
const toast = useToast()

const open = defineModel<boolean>('open', { required: true })

const relationsStore = useRelationsStore()

const selection = ref([...relationsStore.npmSelection])
// Update selection when store change
watch(() => relationsStore.npmSelection, (value) => {
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
    relationsStore.addNpmPackage(npmPackage)
    npmName.value = ''
    toast.add({
      title: 'Package added',
      description: `The package ${name} has been added.`,
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 3000,
    })
  }
  catch (error) {
    console.error(error.message)
    toast.add({
      title: 'Error',
      description: error.message,
      icon: 'i-heroicons-x-circle',
      color: 'red',
      timeout: 3000,
    })
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

  let count = 0
  // TODO: refactor (add all packages in one time to avoid multiple loading)
  try {
    githubLoading.value = true

    if (isSingleRepo) {
      const { repo } = await fetchGitHubRepo(name)
      const packages = await fetchPackagesFromGitHubRepo(name, repo.defaultBranch)

      await Promise.all(packages.map(async (pkg) => {
        try {
          const npmPackage = await fetchNpmPackage(pkg.name)
          relationsStore.addNpmPackage(npmPackage)
          count++
        }
        catch (error) {
          console.error(error.message)
        }
      }))
    }
    else {
      const { repos } = await fetchGitHubRepos(name)
      await Promise.all(repos.map(async (repo) => {
        const packages = await fetchPackagesFromGitHubRepo(repo.repo, repo.defaultBranch)

        await Promise.all(packages.map(async (pkg) => {
          try {
            const npmPackage = await fetchNpmPackage(pkg.name)
            relationsStore.addNpmPackage(npmPackage)
            count++
          }
          catch (error) {
            console.error(error.message)
          }
        }))
      }))
      // TODO: allow fetching user repositories (in the first time, warn)
    }

    githubName.value = ''
    toast.add({
      title: 'Package added',
      description: `${count} ${count > 1 ? 'packages' : 'package'} has been added.`,
      icon: 'i-heroicons-check-circle',
      color: 'green',
      timeout: 3000,
    })
  }
  catch (error) {
    console.error(error.message)
    toast.add({
      title: 'Error',
      description: error.message,
      icon: 'i-heroicons-x-circle',
      color: 'red',
      timeout: 3000,
    })
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
  relationsStore.removeNpmPackage(item.name)
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
function cancel() {
  if (hasRemove.value)
    relationsStore.updateSelection([...relationsStore.unjsSelection, ...selection.value])

  hasRemove.value = false
  open.value = false
}
function validate() {
  relationsStore.updateSelection([...relationsStore.unjsSelection, ...selection.value])
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

      <RelationsPackagesCombobox v-model:selection="selection" class="mt-4" :packages="relationsStore.npmPackages" logo="i-simple-icons-npm">
        <template #actions="{ item }">
          <UButton color="red" variant="ghost" icon="i-heroicons-trash" tabindex="-1" @click="remove(item)" />
        </template>
      </RelationsPackagesCombobox>

      <template #footer>
        <div class="flex flex-row justify-between items-center">
          <UButton type="button" variant="ghost" color="red" @click="clear">
            Clear selection
          </UButton>
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
