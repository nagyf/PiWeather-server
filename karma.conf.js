const webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: true,
        frameworks: ['jasmine', 'es6-shim'],
        files: [
            'tests.webpack.js'
        ],
        preprocessors: {
            'tests.webpack.js': ['webpack', 'sourcemap']
        },
        reporters: ['dots'],
        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                extensions: [ '', '.js', '.jsx' ]
            },
            module: {
                loaders: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        loaders: ['babel']
                    },
                    {
                        test: /\.less$/,
                        exclude: /node_modules/,
                        loaders: ['style', 'css', 'postcss-loader', 'less']
                    },
                    {
                        test: /\.css$/,
                        loader: 'style!css?modules'
                    },
                    {
                        test: /\.html$/,
                        exclude: /node_modules/,
                        loader: 'file'
                    },
                    {
                        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff2?$|\.ttf$|\.wav$|\.mp3$|\.eot$|\.json$/,
                        loader: 'file'
                    }
                ]
            }
        },
        webpackServer: {
            noInfo: true
        }
    });
};
