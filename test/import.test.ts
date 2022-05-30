import { describe, test, expect } from 'vitest';

describe('import vue components', () => {
    test('normal imports as expected', async () => {
        const cmp = await import('../src/components/pagination/index.vue')
        expect(cmp).toBeDefined()
    })

    test('template string imports as expected', async () => {
        // eslint-disable-next-line @typescript-eslint/quotes
        const cmp = await import(`../src/components/table/index.vue`)
        expect(cmp).toBeDefined()
    })

    // test('dynamic imports as expected', async () => {
    //     const name = 'table'
    //     const cmp = await import(`../src/components/${name}/index.vue`)
    //     expect(cmp).toBeDefined()
    // })
})