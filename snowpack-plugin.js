const fs = require('fs');
const path = require('path');
module.exports = function sassPlugin(
    snowpackConfig,
    { native, compilerOptions = {} } = {}
) {
    const { root } = snowpackConfig || {};

    console.log('snowpackConfig=',snowpackConfig)
    console.log('native=',native)
    console.log('compilerOptions=',compilerOptions)

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
