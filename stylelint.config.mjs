const config = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-html'],
  rules: {
    'selector-id-pattern': /[a-z]+(_[a-z]+)*/,
    'selector-class-pattern': /[a-z]+(_[a-z]+)*/
  }
}

export default config
