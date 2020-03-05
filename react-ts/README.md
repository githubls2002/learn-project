This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## 安装

```bash
npx create-react-app my-app --template typescript
# or
yarn create react-app my-app --template typescript

yarn
# or
npm i
# 添加路由
npm install --save react-router-dom
# 暴露路由
yarn run eject

# 支持less
npm install less-loader less --save
```
## 支持less
`yarn run eject`之后，安装less模块`npm install less-loader less --save`
在根目录下`config\webpack.config.js`内找到加入如下代码
![image.png](https://i.loli.net/2020/03/05/CayIKAHfeWrXLtN.png)
```js
// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

+ const lessRegex = /\.less$/;
+ const lessModuleRegex = /\.module\.less$/;
```
在 大约350行左右，找到`oneOf`的数组，在sass模块下，加入如下 less规则。并将`importLoaders: 3`中的3改为2

```js
 {
              test: lessRegex,
              exclude: lessModuleRegex,
              use: getStyleLoaders(
                {
                  // importLoaders: 3,
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                },
                'less-loader'
              ),
              sideEffects: true,
            },
            {
              test: lessModuleRegex,
              use: getStyleLoaders(
                {
                  // importLoaders: 3,
                  importLoaders: 2,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: {
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
                'less-loader'
              ),
            },
```
![less](https://i.loli.net/2020/03/05/RSLznh92xbQGsqk.png)

## 安装 antd
- [antd design](https://ant.design/docs/react/introduce-cn)
```bash
# 安装antd
npm install antd --save
# 安装 按需加载 
npm install babel-plugin-import --save-dev
```
在`package.json`添加配置
```json
  "babel": {
    "presets": [
      "react-app"
    ],
+    "plugins": [
+      ["import", {
+        "libraryName": "antd",
+        "libraryDirectory": "es",
+        "style": "css" 
+      }]
+    ]
  }
}
```
#### 按需加载
```bash
npm install babel-plugin-import --save-dev
```
## 页面布局
- [react-router-dom](https://reacttraining.com/react-router/core/guides/quick-start)
做成后台公共组件的形式，需要把 登录页面 和 错误页面暴露出去；这时候遇到问题，两种解决方案。
1. 将404、500等报错页面放到公共组件下面。
2. 每个路由包一层layout，单独放 login 和 404、500等报错页面。
## 安装 mobx
-----------
使用Mobx作为app状态管理方案
#### 记得安装 `MobX Developer Tools`
mobx 开发 谷歌插件
- [https://cn.mobx.js.org/](https://cn.mobx.js.org/)
```bash
npm install --save mobx mobx-react
# 安装 装饰器 将 class或者object 转成 ES5
npm install --save-dev @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators

npm install babel-plugin-transform-class-properties -D

npm install --save-dev babel-plugin-transform-decorators-legacy

```
并在tsconfig.json中加入一行配置来使ts支持装饰器语法：
```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```
## 报错
1. yarn or npm
```
Attempted import error: 'Route' is not exported from 'react-router-dom'.

```
- [Attempted import error: 'Route' is not exported from 'react-router-dom'](https://stackoverflow.com/questions/55331898/how-to-fix-error-attempted-import-error-route-is-not-exported-from-react-ro)
 `npm` 或者`yarn`只能使用一种方式。