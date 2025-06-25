import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        projects: ['packages/*'],
        typecheck: {
            enabled: true,
        },
    },
})
