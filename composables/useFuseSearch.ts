import Fuse from 'fuse.js'
import type { Ref, ComputedRef } from 'vue'

interface FuzeOptions<T = any> {
  search: Ref<string>
  data: Ref<T[]>
  options?: Fuse.IFuseOptions<T>
}

export function useFuseSearch<T = any>(params: FuzeOptions<T>): ComputedRef<T[]> {
  return computed(() => {
    const { search, data, options } = params

    if (search.value === '' || !data.value.length) {
      return data.value
    }

    return new Fuse<T>(data.value, options)
      .search(search.value)
      .map((result) => result.item)
  })
}
