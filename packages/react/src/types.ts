/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Action } from '@evit/core'

/**
 * Infers a tuple of [payload, tag] from a single action or tuple of actions.
 */
export type InferParameters<T extends Action<any, any> | readonly Action<any, any>[]> = T extends readonly [
    infer Head,
    ...infer Tail,
]
    ? Head extends Action<infer Data, infer Tag>
        ? Tail extends Action<any, any>[]
            ? [data: Data, tag: Tag] | InferParameters<Tail>
            : [data: Data, tag: Tag]
        : []
    : T extends Action<infer Data, infer Tag>
      ? [data: Data, tag: Tag]
      : never
