/** @type {import('stylelint').Config} */
module.exports = {
  customSyntax: 'postcss-scss',
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
  },
}
