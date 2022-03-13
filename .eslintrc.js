module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 0,//不检查末尾分号
    'quotes' : 'off',//不检查双引号
    'semi' : 'off',
    'comma-dangle' : 'off',//不检查逗号
    'no-unused-vars' : 'off',
    'space-before-function-paren' : 0,
    'camelcase': 'off'
  }
}
