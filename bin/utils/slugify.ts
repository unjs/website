import _slugify from 'slugify'

export function slugify(str: string) {
  return _slugify(str, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    strict: true,
    trim: true,
  })
}
