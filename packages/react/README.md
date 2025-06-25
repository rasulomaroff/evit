# @evit/react

> React bindings for @evit/core — type-safe event subscriptions via `useEventEffect`.

---

## Features

- `useEventEffect` hook for event-driven side effects
- Fully type-safe payloads and tags
- Works seamlessly with `@evit/core` events
- Lightweight, no external dependencies (except `@evit/core`)

---

## Installation

You can use any package manager (npm/yarn/pnpm):

```sh
pnpm add @evit/react
```

Peer dependency:

```sh
pnpm add @evit/core
```

---

## Examples

Single event:

```ts
import { defineEvent, withPayload } from '@evit/core'
import { useEventEffect } from '@evit/react'

const userCreated = defineEvent('user.created', withPayload<{ id: number }>())

function MyComponent() {
    useEventEffect(userCreated, (payload, tag) => {
        console.log('User ID:', payload.id)
    })

    return null
}
```

Multiple events:

```ts
import { defineEvent, withPayload } from '@evit/core'
import { useEventEffect } from '@evit/react'

const userCreated = defineEvent('user.created', withPayload<{ id: number }>())
const userUpdated = defineEvent('user.updated', withPayload<{ id: number, name: string, age: number }>())

function MyComponent() {
    useEventEffect([userCreated, userUpdated], (payload, tag) => {
        switch (tag) {
            case userCreated.tag: {
                console.log('User ID:', payload.id)
                break
            }

            case userUpdated.tag: {
                console.log('User ID:', payload.id)
                console.log('User name:', payload.name)
                console.log('User age:', payload.age)
                break
            }
        }
    })

    return null
}
```

---

## License

MIT

