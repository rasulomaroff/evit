import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { defineEvent, withPayload } from '@evit/core'
import { useEventEffect } from './use-event-effect'

describe('useEventEffect hook', () => {
    it('should handle single event trigger', () => {
        const handler = vi.fn()
        const event = defineEvent('user.loggedIn', withPayload<{ id: number }>())

        renderHook(() => {
            useEventEffect(event, handler)
        })

        act(() => {
            event({ id: 1 })
        })

        expect(handler).toHaveBeenCalledWith({ id: 1 }, 'user.loggedIn')
        expect(handler).toHaveBeenCalledTimes(1)
    })

    it('should handle multiple events and identify correct tag', () => {
        const handler = vi.fn()
        const created = defineEvent('user.created', withPayload<number>())
        const deleted = defineEvent('user.deleted', withPayload<boolean>())

        renderHook(() => {
            useEventEffect([created, deleted], handler)
        })

        act(() => {
            created(123)
            deleted(true)
        })

        expect(handler).toHaveBeenCalledWith(123, 'user.created')
        expect(handler).toHaveBeenCalledWith(true, 'user.deleted')
        expect(handler).toHaveBeenCalledTimes(2)
    })

    it('should unsubscribe on unmount', () => {
        const handler = vi.fn()
        const event = defineEvent('test.unsubscribe', withPayload<string>())

        const { unmount } = renderHook(() => {
            useEventEffect(event, handler)
        })

        unmount()

        act(() => {
            event('test')
        })

        expect(handler).not.toHaveBeenCalled()
    })
})
