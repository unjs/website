export function toPackageLogo(name: string) {
  return `/assets/logos/${name}.svg`
}

export function toPackagePuzzlePart(name: string, dark: boolean = false) {
  if (dark)
    return `/assets/puzzle/dark/${name}.svg`

  return `/assets/puzzle/light/${name}.svg`
}
