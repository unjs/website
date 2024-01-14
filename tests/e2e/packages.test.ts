import { describe, expect, it } from 'vitest'
import { setup } from '@nuxt/test-utils/e2e'

describe('my test', async () => {
  await setup()

  it('my test', () => {
    // does not work
    expect(1).toBe(1)
  })
})
