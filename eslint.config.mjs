import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
    {
        // Apply the common configuration for all files
        files: ['**/*.js'],
        languageOptions: {
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            // Most of these rules are following https://github.com/airbnb/javascript
            'prefer-const': 'error',
            'no-const-assign': 'error',
            'no-var': 'error',
            'no-new-object': 'error',
            'object-shorthand': 'warn',
            'no-array-constructor': 'error',
            'prefer-template': 'warn',
            'template-curly-spacing': 'warn',
        },
    },

    // Apply recommended rules from eslint-plugin-js
    pluginJs.configs.recommended,

    // Disable formatting rules that would conflict with Prettier
    eslintConfigPrettier,

    {
        ignores: [
            'node_modules/',
            'package-lock.json',
            '!.prettierrc',
            '!package.json',
            'tests/',
        ],
    },
]
