export function useScrollSpyHeadings() {
  const observer = ref<IntersectionObserver>()
  const visibleHeadings = ref<string[]>([])
  const activeHeadings = ref<string[]>([])

  const observerCallback = (entries: IntersectionObserverEntry[]) =>
    entries.forEach((entry) => {
      const id = entry.target.id

      if (entry.isIntersecting)
        visibleHeadings.value = [...visibleHeadings.value, id]
      else
        visibleHeadings.value = visibleHeadings.value.filter(h => h !== id)
    })

  const updateHeadings = (headings: Element[]) =>
    headings.forEach((heading) => {
      if (!observer.value)
        return

      observer.value.observe(heading)
    })

  watch(visibleHeadings, (val, oldVal) => {
    if (val.length === 0)
      activeHeadings.value = oldVal
    else
      activeHeadings.value = val
  })

  onBeforeMount(() => (observer.value = new IntersectionObserver(observerCallback, { rootMargin: '0px 0px -30% 0px' })))

  onMounted(() => {
    updateHeadings([
      ...document.querySelectorAll('h2'),
      ...document.querySelectorAll('h3'),
    ])
  })

  onBeforeUnmount(() => observer.value?.disconnect())

  return {
    visibleHeadings,
    activeHeadings,
  }
}
