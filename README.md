# snowpack 脚手架配置

##  webpack和snowpack的比较

### 一、webpack和snowpack

都是现代化打包工具

### 二、为什么Vite启动快

#### 2.1 底层语言

从底层原理上来说，Vite是基于esbuild预构建依赖。而esbuild是采用go语言编写，因为go语言的操作是纳秒级别，而js是以毫秒计数，所以snowpack比用js编写的打包器快10-100倍。

#### 2.2 webpack和snowpack的启动方式

 

webpack: 分析依赖=> 编译打包=> 交给本地服务器进行渲染。首先分析各个模块之间的依赖，然后进行打包，在启动webpack-dev-server，请求服务器时，直接显示打包结果。webpack打包之后存在的问题：随着模块的增多，会造成打出的 bundle 体积过大，进而会造成热更新速度明显拖慢。

snowpack: 启动服务器=> 请求模块时按需动态编译显示。是先启动开发服务器，请求某个模块时再对该模块进行实时编译因为现代游览器本身支持ES-Module，所以会自动向依赖的Module发出请求。所以snowpack就将开发环境下的模块文件作为浏览器的执行文件，而不是像webpack进行打包后交给本地服务器。意思就是snowpack不会在打包业务代码而是利用浏览器的兼容性支持ES-Module模式下直接运行js，这样就可以大大减少打包时间

分析了webpack和snowpack的打包方式后，也就明白了为什么snowpack比webpack打包快，因为它在启动的时候不需要打包，所以不用分析模块与模块之间的依赖关系，不用进行编译。这种方式就类似于我们在使用某个UI框架的时候，可以对其进行按需加载。同样的，snowpack也是这种机制，当浏览器请求某个模块时，再根据需要对模块内容进行编译。按需动态编译可以缩减编译时间，当项目越复杂，模块越多的情况下，snowpack明显优于webpack.
热更新方面，效率更高。当改动了某个模块的时候，也只用让浏览器重新请求该模块，不需要像webpack那样将模块以及模块依赖的模块全部编译一次。



举例，我们看react源码为

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

```

snowpack编译之后源码

```
var _jsxFileName = "K:\\snowpack-cli\\src\\main.jsx";
imporsnowpackvite__cjsImport0_react from "/node_msnowpackes/.vite/deps/react.js?v=f424ab44"; conssnowpackact = __vite__cjsImport0_reactsnowpacksModule ? __vite__cjsImportsnowpackact.default : __vite__cjsIsnowpackt0_react;
import __vite__cjsImport1_reactDom_snowpacknt from "/node_modules/.vite/deps/react-dom_client.js?snowpack24ab44"; const ReactDOM = __vite__cjsImpsnowpack_reactDom_client.__esModule ? __vite_snowpackImport1_reactDom_client.default : __vite__cjsImport1_reactDom_client;
import App from "/src/Apsnowpackx";
import "/src/index.css";
import __vite__cjsIsnowpackt4_react_jsxDevRuntime from "/node_modules/.vite/deps/reacsnowpackx-dev-runtime.js?v=f424ab44"; const _jsxDEV = __vite__cjsImport4_react_jsxDevRuntime["jsxDEV"];
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ _jsxDEV(React.StrictMode, {
  children: /* @__PURE__ */ _jsxDEV(App, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 8,
    columnNumber: 5
  }, this)
}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 7,
  columnNumber: 3
}, this));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBQSxTQUFTQyxXQUFXQyxTQUFTQyxlQUFlLE1BQXhCLENBQXBCLEVBQXFEQyxPQUNuRCx3QkFBQyxNQUFNLFlBQVA7QUFBQSxZQUNFLHdCQUFDLEtBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFERiIsIm5hbWVzIjpbIlJlYWN0RE9NIiwiY3JlYXRlUm9vdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXIiXSwic291cmNlcyI6WyJLOi92aXRlLWNsaS9zcmMvbWFpbi5qc3giXSwiZmlsZSI6Iks6L3ZpdGUtY2xpL3NyYy9tYWluLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20vY2xpZW50J1xuaW1wb3J0IEFwcCBmcm9tICcuL0FwcCdcbmltcG9ydCAnLi9pbmRleC5jc3MnXG5cblJlYWN0RE9NLmNyZWF0ZVJvb3QoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb3QnKSkucmVuZGVyKFxuICA8UmVhY3QuU3RyaWN0TW9kZT5cbiAgICA8QXBwIC8+XG4gIDwvUmVhY3QuU3RyaWN0TW9kZT5cbilcbiJdfQ==
```

我们看出他并没有把代码转换成es5去执行，而是直接将es6代码去执行。这样效率就大大提高了。

### 三、优缺点

snowpack开发阶段，打包快。
snowpack相关生态没有webpack完善，snowpack可以作为开发的辅助。

## 四、配置

### 基本配置

snowpack 配置有很多地方和webpack相同之处 我们来看看他的配置

在项目目录中建立一个snowpack.config.mjs配置文件，和webpack类似

```
export default {
      // 配置项
    
    
    
    }
```



### plugins配置

vite编译配置，和webpack类似，有plugins，但是他没有load。

比如我们需要编译sass则需要安装一个sass插件



```
     plugins: [
        './snowpack-plugin.js',
        /* ... */
        // 部分热更新
        '@snowpack/plugin-react-refresh',
        [
            '@snowpack/plugin-webpack',
            {
                sourceMap: true,
            },
        ],
        [
            '@snowpack/plugin-sass',
            {
                /* see options below */
            },
        ],
    ],
```

#### 自定义plugins

自定义plugins定义一个函数返回一个对象

snowpackConfig 配置

   resolve: {
            // 输入文件
            input: ['.js', '.jsx'],
            // 输出文件类型
            output: ['.js'],
        },



 文件更改只能拿到路径，如果需要编译转义。需要用node fs去读写文件，这个比较麻烦，没有vite那么好用。

```
const fs = require('fs');
const path = require('path');
module.exports = function sassPlugin(
    snowpackConfig,
    { native, compilerOptions = {} } = {}
) {
    const { root } = snowpackConfig || {};

    return {
        name: '@snowpack/snowpack-plugin',
        resolve: {
            // 输入文件
            input: ['.js', '.jsx'],
            // 输出文件类型
            output: ['.js'],
        },

        /**
      文件更改只能拿到路径
     */
        onChange({ filePath }) {
            console.log('filePath=', filePath);
            // const filePathNoExt = stripFileExtension(filePath);
            // // check exact: "_index.scss" (/a/b/c/foo/_index.scss)
            // this._markImportersAsChanged(filePath);
            // // check no ext: "_index" (/a/b/c/foo/_index)
            // this._markImportersAsChanged(filePathNoExt);
            console.log(' this.markChanged=', this.markChanged);
            // this.markChanged(importerFilePath);
        },
        /** Load the Sass file and compile it to CSS. */
        async load({ filePath, isDev }) {
            const fileExt = path.extname(filePath);
            const contents = fs.readFileSync(filePath, 'utf8');

            // console.log('contents=',contents)

            // transform(contents) 转换函数
            return contents;
        },
    };
};


```



### 静态输出路径

```
    mount: {
        /* ... */
        public: { url: '/', static: true },
        src: { url: '/dist' },
    },
```





### dev服务器设置

我找了好久没看到dev服务器代理，不知道是不是不能做代理请求。

这样写不知道对不对，因为我暂时没法测试。这种写法我是按照vite写的

```
    devOptions: {
        // secure: {cert, key},
        port: 8070,
        open: 'firefox',
        hmr: true, // 热启动
        hmrDelay: 0, //延迟 HMR 触发的浏览器更新的毫秒数。
        hmrErrorOverlay: true, //切换在运行 HMR 时显示 JavaScript 运行时错误的浏览器覆盖。
        proxy: {
            '/api': {
                target: 'http://192.168.99.223:3000', //代理接口
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    },
```





### 设置resolver选项 别名

```
   // 别名
    alias: {
        // Type 1: Package Import Alias
        // lodash: 'lodash-es',
        // react: 'preact/compat',
        // Type 2: Local Directory Import Alias (relative to cwd)
        components: './src/components',
        '@app': './src',
    },
```

### 编译打包输出配置build

```
  buildOptions: {
        /* ... */
    },
```



### 环境变量配置

 是直接在snowpack.config.mjs 配置的和vite有区别

```
   // 环境
    env: {
        API_URL: 'api.google.com',
    },
```

在js中即可访问到该变量    console.log("env", import.meta.env.VITE_SOME_KEY) 一定要VITE开头否则访问不到该变量



另一种方式也可以这样设置

```
 process.env.SNOWPACK_PUBLIC_API_URL = 'api.google.com';
```



第三种方式是使用插件@snowpack/plugin-dotenv

```
npm install --save-dev @snowpack/plugin-dotenv
// snowpack.config.mjs
export default {
  plugins: ['@snowpack/plugin-dotenv'],
};

```

然后就可以简历三个文件

如果一个项目有三个不同的环境不同的环境域名前缀不同，这个时候我们可以通过配置来实现建立三个不同环境的配置文件

#### 开发环境 创建 .env.development 文件在根目录中配置内容

```
#环境变量
NODE_ENV="development"
VITE_APP_BASEAPI="https://www.dev.com"
```

#### 测试环境 创建 .env.test文件在根目录中配置内容

```
#环境变量
NODE_ENV="test"
SNOWPACK_PUBLIC_ENABLE_BASEAPI="https://www.test.com"
```

#### 生产环境 创建.env.production文件在根目录中配置内容

```
#环境变量
NODE_ENV="production"
SNOWPACK_PUBLIC_ENABLE_BASEAPI="https://www.production.com"

```



 整个配置包括eslint配置

```
import { defineConfig, loadEnv } from 'vite';
// 要想为传统浏览器提供支持，可以按下面这样使用官方插件 @vitejs/plugin-legacy：
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import pluginResolve from 'rollup-plugin-node-resolve';
import { visualizer } from 'rollup-plugin-visualizer';
import eslint from '@rollup/plugin-eslint';
import file from './file';
import path from 'path';
import eslintrc from './.eslintrc.js';
const { resolve } = path;
// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
    // console.log('command=', command);
    // console.log('mode=', mode);
    const ENV = loadEnv(mode, __dirname);
    const IS_DEV = ENV.VITE_APP_ENV !== 'production';
    // const data = await asyncFunction()
    return {
        // 打包静态资源路径
        base: './',
        server: {
            open: true, //vite项目启动时自动打开浏览器
            port: 8080, //vite项目启动时自定义端口
            hmr: true, //开启热更新
            cors: true, // 允许跨域
            //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
            proxy: {
                '/api': {
                    target: 'http://192.168.99.223:3000', //代理接口
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        // 设置resolver选项 别名
        // 比如图片资源都在src/assets/image目录下，不想在项目中每次都通过require("../assets/image/1.jpg")这样写一长串去引用。能否通过 类似nuxt中的快速引用？
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                '@c': resolve(__dirname, 'src/components'),
                '/images': 'src/assets/images/', //这里不能通过path模块解析路径的写法
            },
            // 省略后缀名引入
            extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
        },
        plugins: [
            // eslint 校验
            eslint(eslintrc),
            //如何设置开启生产打包分析文件大小功能
            visualizer({
                open: true, //注意这里要设置为true，否则无效
                gzipSize: true,
                brotliSize: true,
            }),
            {
                // 自定义插件
                ...file(),
                enforce: 'pre',
            },
            react(),
            pluginResolve(),
            // commonjs(),
            legacy({
                targets: ['defaults', 'not IE 11'],
            }),
        ],
        build: {
            target: 'modules',
            outDir: 'dist', //指定输出路径
            assetsDir: 'assets', // 指定生成静态资源的存放路径
            minify: 'terser', // 混淆器，terser构建后文件体积更小
            // 构建后是否生成 source map 文件
            sourcemap: IS_DEV,
            // chunk 大小警告的限制
            // chunkSizeWarningLimit: 700,
            // 生产环境移除 console
            terserOptions: {
                compress: {
                    drop_console: !IS_DEV,
                    drop_debugger: !IS_DEV,
                },
            },

            rollupOptions: {
                // 确保外部化处理那些你不想打包进库的依赖
                //cdn抽离
                // external: ['vue'],
                // output: {
                //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                //     globals: {
                //         vue: 'Vue',
                //     },
                // },
                //cdn抽离
                // 入口
                input: {
                    index: resolve(__dirname, 'index.html'),
                },
                // 出口
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/name-[hash].[ext]',
                    // format: 'amd' // 动态导入不支持iife
                },

                // https://rollupjs.org/guide/en/#big-list-of-options
            },
        },
    };
});

```



我看snowpack配置和编译模式和vite基本一样，只是配置参数入口不同而已，我感觉是尤雨溪是基于snowpack进行二次封装产生的vite。



开源不易，请各位网友多多支持，给我git点赞谢谢了

[snowpack-cli git地址](https://github.com/qq281113270/snowpack-cli)



[vite-cli git地址](https://github.com/qq281113270/vite-cli)







