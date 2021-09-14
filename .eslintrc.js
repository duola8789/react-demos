/**
 * Created By zh on 2019-03-20
 */
module.exports = {
  extends: [
    // 默认规则说明：https://alloyteam.github.io/eslint-config-alloy/
    'alloy',
    'alloy/react'
  ],
  env: {
    node: true,
    browser: true,
    jest: true
  },
  settings: {
    react: {
      // React version. 'detect' automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      version: 'detect'
    }
  },
  plugins: ['react-hooks'],
  globals: {
    // 这里填入你的项目需要的全局变量
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    //
    // jQuery: false,
    // $: false
  },
  rules: {
    // 这里填入你的项目需要的个性化配置，比如：
    //
    // @fixable 一个缩进必须用两个空格替代
    indent: [
      2,
      2,
      {
        // 强制 switch 语句中的 case 子句的缩进级别
        SwitchCase: 1,
        // 要求三元表达式内的三元表达式不能有缩进
        flatTernaryExpressions: true,
        // 对于 JSX 属性对其不进行约束，在下面的 react/jsx-indent-props 进行约束
        ignoredNodes: ['JSXAttribute', 'JSXSpreadAttribute']
      }
    ],
    semi: ['warn', 'always'],
    // JSX 的 children 缩进必须为两个空格
    'react/jsx-indent': [2, 2],
    // JSX 的 props 缩进必须为两个空格
    'react/jsx-indent-props': [2, 'first'],
    // 禁止出现超过两行的连续空行
    'no-multiple-empty-lines': [2, { max: 2 }],
    // 一行长度不应该超过120个字符
    'max-len': [2, 120],
    // React Hooks只能应用顶级函数和React函数中
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'object-curly-spacing': 'off',
    'no-unused-vars': 'warn',

    // no-debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
};
