# theme-resolver-webpack-plugin

## 使用说明

### 安装
```
npm install theme-resolver-webpack-plugin --save-dev
```

### webpack配置
```
const ThemeResolverWebpackPlugin = require('theme-resolver-webpack-plugin');

// 设置主题分格
const THEME = process.env.THEME || process.env.npm_config_theme || 'default'

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: ['node_modules'],
        plugins: [
            new ThemeResolverWebpackPlugin({
                rule: /^@theme/,
                path: path.resolve(__dirname, './src/themes'),
                themes: [THEME, 'default']
            }),
        ],
        alias: {
        }
    }
};

```

其中`./src/themes`为主题包根目录

### 参数说明

- rule(String)
  主题匹配前缀，如`@theme`
  在webpack进行路径解析的时候会讲`@theme`替换为`path+${theme}`所指定的路径

- path(String)
  主题包的根目录

- themes(Array<String>)
  当前主题列表，第一个参数为当前主题名称，第二个参数为默认主题名称，当所需的资源在当前主题找不到时，会去默认主题进行查找

### Example

```
npm run dev --theme=dark
```
执行上述命令，则会加载`dark`主题的资源

主题目录结构：
path
    dark
        less
        images
    default
        less
        images

#### 在less中使用
```
@import "~@theme/less/var.less";
```
上述命令，会将`src/themes/dark/less/var.less`引入到当前文件中
#### 在js中使用
```
import conf from '@theme/config';
```
上述命令，会加载`src/themes/dark/config.js`

#### 加载图片资源
```
const image = require('@theme/images/img.jpg');
```












