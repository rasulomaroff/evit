import { defineEvent, withPayload } from '@evit/core'
import { describe, expectTypeOf, it } from 'vitest'
import { useEventEffect } from './use-event-effect'

describe('useEventEffect hook', () => {
    it('infers the tag type correctly for one event', () => {
        const event = defineEvent('user.loggedIn')

        useEventEffect(event, (none, tag) => {
            expectTypeOf(none).toBeVoid()
            expectTypeOf(tag).toEqualTypeOf<'user.loggedIn'>()
        })
    })

    it('infers the tag and payload type correctly for one event', () => {
        const event = defineEvent('user.loggedIn', withPayload<{ id: number }>())

        useEventEffect(event, (user, tag) => {
            expectTypeOf(user).toEqualTypeOf<{ id: number }>()
            expectTypeOf(tag).toEqualTypeOf<'user.loggedIn'>()
        })
    })

    it('infers the tag type correctly for multiple events', () => {
        const event1 = defineEvent('user.loggedIn')
        const event2 = defineEvent('user.loggedOut')

        useEventEffect([event1, event2], (none, tag) => {
            expectTypeOf(none).toBeVoid()
            expectTypeOf(tag).toEqualTypeOf<'user.loggedIn' | 'user.loggedOut'>()
        })
    })

    it('infers the payload and tag types correctly for multiple events', () => {
        const event1 = defineEvent('user.loggedIn', withPayload<{ field: string }>())
        const event2 = defineEvent('user.loggedOut', withPayload<boolean>())

        useEventEffect([event1, event2], (payload, tag) => {
            expectTypeOf(tag).toEqualTypeOf<'user.loggedIn' | 'user.loggedOut'>()

            switch (tag) {
                case 'user.loggedIn':
                    expectTypeOf(payload).toEqualTypeOf<{ field: string }>()
                    break
                case 'user.loggedOut':
                    expectTypeOf(payload).toEqualTypeOf<boolean>()
                    break
            }
        })
    })
})
