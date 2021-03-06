import { projects } from '../../data/projects'

projects.sort((a, b) => a.name.localeCompare(b.name))

export default async () => {
  return {
    projects
  }
}
