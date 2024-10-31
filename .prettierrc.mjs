const config = {
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  overrides: [
    {
      files: '*.html',
      options: {
        printWidth: 80
      }
    }
  ],
  plugins: ['prettier-plugin-organize-imports']
}

export default config
