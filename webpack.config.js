const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const times = require("lodash/times");

const makeHtmlConfig = n => (new HtmlWebpackPlugin({
    template: "templates/index.pug",
    cache: true,
    chunks: [],
    title: `Page Number ${n}`,
    filename: `posts/post_${n}.html`,
    bodyText: `post number: ${n}`,
}));

module.exports = {
    mode: 'development',
    entry: {
        app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.pug$/, 
                use: 'pug-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: true }),
        new HtmlWebpackPlugin({
            template: 'templates/index.pug',
            cache: true,
            chunks: [],
            title: "Main Page",
            filename: "posts/index.html"
        }),
        ...times(10, makeHtmlConfig)
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};