import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import prettier from 'eslint-plugin-prettier/recommended'

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,

    { ignores: ['**/dist/**/*', '**/coverage/**', '**/node_modules/**', '**/docs/**'] },

    {
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/consistent-type-definitions': 'off',
            '@typescript-eslint/consistent-type-assertions': 'off',
            // '@typescript-eslint/unbound-method': 'off',
        },
    },
    {
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: '.',
            },
        },
    },
    prettier,
]
