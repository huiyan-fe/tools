const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackPlugin
} = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1DA57A'
        }
    }),
    addWebpackPlugin(new AntdDayjsWebpackPlugin())
);
