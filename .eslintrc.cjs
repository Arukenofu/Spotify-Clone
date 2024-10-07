module.exports = {
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    'eslint:recommended',
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    'vue/mustache-interpolation-spacing': 0,
    'vue/require-default-prop': 0,
    'vue/multi-word-component-names': 0,
    'vue/valid-template-root': 0,
    'vue/no-v-html': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/max-attributes-per-line': 0
  }
};
