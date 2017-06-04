const path = require('path');

module.exports = {
    entry: {
        app: './src/app.js',
        'app-heatmap': './src/app-heatmap.js',
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }]
        }]
    },
    watch: true
};