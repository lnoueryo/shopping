module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*.vue'],
      processor: 'vue/.vue',
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    'vue/multi-word-component-names': 'off',
    'max-lines-per-function': [
      'warn',
      { max: 50, skipBlankLines: true, skipComments: true },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'variable', format: ['camelCase'] },
    ],
    'no-eval': 'error',
    'no-implied-eval': 'error',
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-unused-expressions': 'warn',
    'prefer-template': 'error',
    'prefer-destructuring': ['error', { object: true, array: false }],
    // コンソールステートメントを許可（開発中は'off'、本番では'warn'または'error'）
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // デバッガーを許可（開発中は'off'、本番では'warn'または'error'）
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // TypeScript特有のルール
    '@typescript-eslint/explicit-function-return-type': 'off', // 明示的な関数の戻り値の型指定を不要に
    '@typescript-eslint/no-explicit-any': 'warn', // any型の使用に警告

    // Vue特有のルール
    'vue/no-v-html': 'off', // v-htmlディレクティブの使用を許可

    // その他のJavaScriptのベストプラクティス
    'prefer-const': 'warn', // 変更されない変数はconstを使用
    'arrow-parens': ['error', 'as-needed'], // 必要な場合のみアロー関数の引数に括弧を使用
    'no-unused-vars': 'warn', // 未使用の変数に警告
    eqeqeq: ['error', 'always'], // 厳密等価演算子(===)の使用を強制
  },
};
