import tseslint from 'typescript-eslint'
import rootConfig from '../eslint.config.js'

export default tseslint.config(
  ...rootConfig,
  {
    languageOptions: {
      globals: {
        process: 'readonly',
        console: 'readonly',
      },
    },
    rules: {},
  }
)