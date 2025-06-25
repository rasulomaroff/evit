import { describe, expectTypeOf, it } from 'vitest'
import { defineEvent, withPayload } from './event'

describe('defineEvent function', () => {
    it('infers the tag type', () => {
        const event = defineEvent('tag')

        expectTypeOf(event.tag).toEqualTypeOf<'tag'>()
    })

    it('infers the payload type', () => {
        const event = defineEvent('tag', { test: 22 })

        expectTypeOf(event.tag).toEqualTypeOf<'tag'>()

        event.on(payload => {
            expectTypeOf(payload).toEqualTypeOf<{ test: number }>()
        })
    })

    it('infers the payload type with the helper function', () => {
        const event = defineEvent('tag', withPayload<{ age: number }>())

        expectTypeOf(event.tag).toEqualTypeOf<'tag'>()

        event.on(payload => {
            expectTypeOf(payload).toEqualTypeOf<{ age: number }>()
        })
    })
})

describe('withPayload function', () => {
    it('infers the type from the parameter and "returns" it', () => {
        const user = withPayload<{ name: string; age: number }>()

        expectTypeOf(user).toEqualTypeOf<{ name: string; age: number }>()

        const num = withPayload<number>()

        expectTypeOf(num).toBeNumber()
    })
})
