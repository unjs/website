const id = ref(0)

export function useProseNavGroupId(): string {
  return `prose-nav-group-${id.value++}`
}
