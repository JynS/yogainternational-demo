"use strict";

// const HtmlWebPackPlugin = require("html-webpack-plugin");

// const htmlPlugin = new HtmlWebPackPlugin({
//   template: "./src/views/index.html",
//   filename: "./index.html"
// });
const debug = process.env.NODE_ENV !== "production";

const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: path.join(__dirname, 'src', 'app-client.js'),
    devServer: {
        inline: true,
        port: 8080,
        contentBase: "src/views/",
        historyApiFallback: {
            index: '/index-static.html'
        }
    },
    output: {
        path: path.resolve(__dirname, "src/static/js/"),
        filename: "bundle.js",
        publicPath: "/js/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
            // Might need to handle images here
        ]
    },
    devtool: 'inline-source-map',
    plugins: debug ? [] : [
        new CleanWebpackPlugin(['dist']),
        // new HtmlWebPackPlugin,
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            mangle: true,
            sourcemap: false,
            beautify: false,
            dead_code: true
        }),
    ]
};