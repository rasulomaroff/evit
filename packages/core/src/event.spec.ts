import { describe, expect, it, vi } from 'vitest'
import { defineEvent, mergeSubscriptions, withPayload } from './event'

describe('defineEvent function', () => {
    it('should call subscribed handler with tag', () => {
        const handler = vi.fn()

        const event = defineEvent('my.event')
        event.on(handler)

        event()

        expect(handler).toHaveBeenCalledWith(undefined, event.tag)
        expect(handler).toHaveBeenCalledTimes(1)
        expect(event.tag).toBe('my.event')
    })

    it('should call subscribed handler with payload (using withPayload function) and tag', () => {
        const handler = vi.fn()

        const event = defineEvent('my.event', withPayload<number>())
        event.on(handler)

        event(42)

        expect(handler).toHaveBeenCalledWith(42, event.tag)
        expect(handler).toHaveBeenCalledTimes(1)
        expect(event.tag).toBe('my.event')
    })

    it('should unsubscribe correctly', () => {
        const handler = vi.fn()

        const event = defineEvent('unsub.test', withPayload<string>())
        const unsubscribe = event.on(handler)

        event('hello')
        unsubscribe()
        event('world')

        expect(handler).toHaveBeenCalledTimes(1)
        expect(handler).toHaveBeenCalledWith('hello', event.tag)
    })
})

describe('mergeSubscriptions function', () => {
    it('should unsubscribe all passed callbacks', () => {
        const unsub1 = vi.fn()
        const unsub2 = vi.fn()

        const merged = mergeSubscriptions(unsub1, unsub2)
        merged()

        expect(unsub1).toHaveBeenCalled()
        expect(unsub2).toHaveBeenCalled()
    })
})
