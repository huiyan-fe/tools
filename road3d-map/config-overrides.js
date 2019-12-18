const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    addWebpackPlugin
} = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const path = require('path');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true
    }),
    addWebpackPlugin(new AntdDayjsWebpackPlugin()),
    addWebpackAlias({
        ['@']: path.resolve(__dirname, 'src')
    })
);
