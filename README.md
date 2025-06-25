# evit

> A lightweight, type-safe, stateless event system for building reactive UIs. Designed to enable feature-level communication in large-scale applications using frameworks like React.

> evit = event it!

---

## Features

- **Fully type-safe** payloads and event tags  
- **Zero re-renders** — events are just callbacks, not state  
- Built for **cross-feature communication**  
- **Framework-agnostic core** (`@evit/core`)  
- Optional React bindings via [`@evit/react`](https://www.npmjs.com/package/@evit/react)  
- **No external dependencies**

---

## Installation

Core library:

### npm

```sh
npm install @evit/core
```

### pnpm

```sh
pnpm add @evit/core
```

### yarn

```sh
yarn add @evit/core
```

React bindings:

You can also install react bindings `@evit/react`.

---

## Examples

```ts
import { defineEvent, withPayload } from '@evit/core'

// Define an event with a payload
const userCreated = defineEvent('user.created', withPayload<{ id: number }>())

// Subscribe to the event
userCreated.on((payload, tag) => {
  console.log(payload.id) // → 123
})

// Trigger the event
userCreated({ id: 123 })
```

With react hooks:

```ts
import { defineEvent, withPayload } from '@evit/core'
import { useEventEffect } from '@evit/react'

// Define an event with a payload
const userCreated = defineEvent('user.created', withPayload<{ id: number }>())

// Somewhere in other component/function event is triggered
userCreated({ id: 123 })

function MyComponent() {
    // callback in this event effect will be called
    useEventEffect(userCreated, (payload, tag) => {
        console.log('User ID:', payload.id)
    })

    return null
}

```

---

## Use Cases

- Decoupled communication between features, widgets, or UI layers
- Declarative side-effect triggers (e.g. analytics, logging, DOM focus)
- Ideal for [Feature-Sliced Design](https://github.com/feature-sliced/documentation) or modular frontend architectures
- Works alongside any state management — or none at all

---

## Packages

| Package          | Description                                  |
|------------------|----------------------------------------------|
| `@evit/core`     | Framework-agnostic core event system         |
| `@evit/react`    | React bindings (`useEventEffect` hook, etc.) |

---

## License

MIT

