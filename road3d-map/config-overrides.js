const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    addWebpackPlugin,
    watchAll,
    setWebpackPublicPath
} = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const path = require('path');

const env = process.env.NODE_ENV;

module.exports = override(
    env === 'production' && setWebpackPublicPath('/tools/road3d-map/build/'),
    watchAll(),
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