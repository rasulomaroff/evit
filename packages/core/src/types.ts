/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * A callback function that is invoked when an event is triggered.
 *
 * @template P - The payload type.
 * @template A - The action type (defaults to Action<any, any>).
 */
export type EventHandler<P = void, A extends Action<any, any> = Action<any, any>> = (payload: P, tag: A['tag']) => void

/**
 * Represents a typed event-like action with an associated payload and tag.
 *
 * @template P - The payload type.
 * @template T - A tag used to identify the action.
 */
export interface Action<P, T> {
    /**
     * Triggers the action with the given payload.
     *
     * @param payload - The payload to send with the action.
     */
    (payload: P): void

    /**
     * Subscribes a handler to this action.
     * @param fn - The event handler.
     *
     * @returns A function to unsubscribe the handler.
     */
    on: (fn: EventHandler<P, Action<P, T>>) => () => void

    /**
     * A unique tag used to identify this action.
     */
    readonly tag: T
}
