import Fuse from 'fuse.js'
import { Ref } from 'vue'

interface FuzeOptions {
  search: Ref<string>
  data: Ref<any[]>
  options?: Fuse.IFuseOptions<any>
}

export const useFuseSearch = (params: FuzeOptions): any[] => {
  const search = params.search.value || ''
  const data = params.data.value || []
  const options = params.options || {}

  if (search === '') return data

  const fuse = new Fuse(data, options)

  return fuse.search(search).map((result) => result.item)
}
