export function formatTree(tree: string[]) {
  let logs = ''
  const length = tree.length

  for (let i = 0; i < length; i++) {
    if (i === length - 1)
      logs += `└─ ${tree[i]}`
    else
      logs += `├─ ${tree[i]}\n`
  }

  return logs
}
