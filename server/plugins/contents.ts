export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:file:afterParse', (file) => {
    if (file._id.endsWith('.md')) {
      // Handle GitHub flavoured markdown blockquotes
      // https://github.com/orgs/community/discussions/16925
      for (const node of (file.body?.children || [])) {
        if (node.tag === 'blockquote' // blockquotes > p x 2 > span > text
          && ['!NOTE', '!TIP', '!IMPORTANT', '!WARNING', '!CAUTION'].includes(node.children?.[0]?.children?.[0]?.children?.[0]?.value)) {
          node.type = 'element'
          node.tag = node.children?.[0]?.children?.[0]?.children?.[0]?.value.slice(1).toLowerCase()
          node.children[0].children.shift()
        }
      }
    }
  })
})
