module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended'
    ],
    rules: {
        "no-console": process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "camelcase": 1, // 强制驼峰法命名
        "indent": ['error', 4], // 缩进风格四个空格
        "semi": ["error", "never"], // 语句强制不要分号结尾
        "new-parens": 2, // new时必须加小括号
        "init-declarations": 1, // 声明时必须赋初值
        "eqeqeq": 2, // 必须使用全等
        "no-use-before-define": 2, // 未定义前不能使用
        "no-undef-init": 2, // 变量初始化时不能直接给它赋值为undefined
        "no-undef": 1, // 不能有未定义的变量
        "no-sparse-arrays": 2, // 禁止稀疏数组， [1,,2]
        "no-unreachable": 2, // 不能有无法执行的代码
        "no-unused-expressions": 2, // 禁止无用的表达式
        "no-void": 2, // 禁用void操作符
        "no-var": 1, // 禁用var，用let和const代替
        "array-bracket-spacing": [2, "never"], // 不允许允许非空数组里面有多余的空格 [1, 2, 3, 4] 不得[ 1,2,3,4 ]
        "block-scoped-var": 0, // 块语句中使用var
        "comma-dangle": [2, "never"], // 对象字面量项尾不能有逗号
        "comma-style": [2, "last"], // 逗号风格，换行时在行首还是行尾
        "consistent-this": [2, "context"], // this别名
        "quotes": [1, "single"], // 只允许单引号
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}