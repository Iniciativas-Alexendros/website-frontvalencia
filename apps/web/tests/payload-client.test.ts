import { describe, it, expect } from 'vitest'

describe('Payload client', () => {
  it('exports expected functions', async () => {
    const mod = await import('../src/lib/payload')
    expect(mod.getMenu).toBeDefined()
    expect(mod.getSpace).toBeDefined()
    expect(mod.getEvents).toBeDefined()
    expect(mod.getSiteConfig).toBeDefined()
    expect(typeof mod.getMenu).toBe('function')
  })
})
