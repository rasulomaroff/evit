/* eslint-disable @typescript-eslint/no-explicit-any */

import { mergeSubscriptions, type Action } from '@evit/core'
import type { InferParameters } from './types'
import { useEffect, useRef } from 'react'

/**
 * React hook to subscribe to one or more events and execute a handler when any of them fires.
 *
 * The handler receives a payload as the first argument and a tag as the second one.
 *
 * @example
 * ```ts
 * const userCreated = defineEvent('user.created', withPayload<number>())
 * const userDeleted = defineEvent('user.deleted', withPayload<boolean>())
 *
 * useEventEffect([userCreated, userDeleted], (payload, tag) => {
 *     if (tag === userCreated.tag) {
 *         console.log('Created:', payload)
 *     }
 * })
 * ```
 *
 * @param event - A single event or an array of events to listen to.
 * @param handler - A callback that receives payload and tag as the first and second parameter.
 */
export function useEventEffect<const T extends readonly [Action<any, any>, ...Action<any, any>[]] | Action<any, any>>(
    event: T,
    handler: (...args: InferParameters<T>) => void,
): void {
    const events = <
        T extends readonly [Action<any, any>, ...Action<any, any>[]] ? T : T extends Action<any, any> ? [T] : never
    >(Array.isArray(event) ? event : [event])

    const fnRef = useRef(handler)
    fnRef.current = handler

    useEffect(() => {
        return mergeSubscriptions(
            ...events.map(fn => {
                return fn.on((...args) => fnRef.current(...(<InferParameters<T>>args)))
            }),
        )
    }, [])
}
