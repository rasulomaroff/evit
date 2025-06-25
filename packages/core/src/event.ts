import type { Action, EventHandler } from './types'

/**
 * Defines a new typed event with a payload and tag.
 *
 * @template Tag - A unique identifier for the event.
 * @template P - The payload type.
 *
 * @param tag - The tag for the event.
 * @param _infer - Optionally used to infer payload type (can use `withPayload<T>()`).
 *
 * @returns The event that you can subscribe to and listen.
 *
 * @example
 * ```ts
 * const event = defineEvent('user.created')
 *
 * // or with a payload
 * const eventWithPayload = defineEvent('user.created', withPayload<{ id: number }>())
 * ```
 */
export function defineEvent<const Tag, P = void>(
    tag: Tag,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _infer?: P,
): Action<P, Tag> {
    const handlers = new Set<EventHandler<P, Action<P, Tag>>>()

    const ev = ((payload: P): void => handlers.forEach(fn => fn(payload, tag))) as Action<P, Tag>

    // @ts-expect-error we only assign this property once here
    ev.tag = tag

    ev.on = function on(fn: EventHandler<P, Action<P, Tag>>): () => void {
        handlers.add(fn)

        return (): void => {
            handlers.delete(fn)
        }
    }

    return ev
}

/**
 * Utility function to help infer payload types when defining events.
 * Does nothing at runtime.
 *
 * @example
 * ```ts
 * const event = defineEvent('user.updated', withPayload<{ id: string }>())
 * ```
 */
export const withPayload = (() => {}) as <T>() => T

/**
 * A utility function to unsubscribe from multiple subscriptions at once.
 *
 * @param unsubscribers - An array of unsubscribe functions.
 *
 * @returns A single function that unsubscribes from all.
 *
 * @example
 * ```ts
 * const newUserEvent = defineEvent('user.created')
 * const deleteUserEvent = defineEvent('user.deleted')
 *
 * const unsubscribe = mergeSubscriptions(
 *     newUserEvent.on(() => {}),
 *     deleteUserEvent.on(() => {}),
 * )
 * ```
 */
export function mergeSubscriptions(...unsubscribers: Array<() => void>): () => void {
    return function unsubscribe(): void {
        unsubscribers.forEach(fn => fn())
    }
}
