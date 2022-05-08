/** @type {import("snowpack").SnowpackUserConfig } */

// import snowpackPlugin from './snowpack-plugin.mjs';

 import {getArgv} from './utils.mjs';
 console.log('getArgv=',getArgv('env'))
 process.env.SNOWPACK_PUBLIC_API_URL = 'api.google.com';
export default {
    // mode:"test" ,
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
    // 环境
    env: {
        API_URL: 'api.google.com',
    },
    // 别名
    alias: {
        // Type 1: Package Import Alias
        // lodash: 'lodash-es',
        // react: 'preact/compat',
        // Type 2: Local Directory Import Alias (relative to cwd)
        components: './src/components',
        '@app': './src',
    },
    mount: {
        /* ... */
        public: { url: '/', static: true },
        src: { url: '/dist' },
    },
    plugins: [
        './snowpack-plugin.js',
        '@snowpack/plugin-dotenv',
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
    routes: [
        /* Enable an SPA Fallback in development: */
        // {"match": "routes", "src": ".*", "dest": "/index.html"},
    ],
    optimize: {
        /* Example: Bundle your final build: */
        // "bundle": true,
        bundle: true,
        minify: true,
        target: 'es2018',
    },
    packageOptions: {
        /* ... */
        env: { NODE_ENV: 'production' },
    },

    buildOptions: {
        /* ... */
    },
};
