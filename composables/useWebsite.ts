export function useWebsite() {
  const appConfig = useAppConfig()

  return computed(() => appConfig.website)
}
