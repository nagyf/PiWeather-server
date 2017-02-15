const webpack = require('webpack');
module.exports = {
    entry: [
        './src/client/index.jsx'
    ],
    output: {
        path: './dist',
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        preLoaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules|test/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test: /\.jsx$/,
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
                loader: "file"
            }
        ]
    },
    eslint: {
        configFile: './.eslintrc.json'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            IS_PRODUCTION: process.env.NODE_ENV === 'production',
            IS_DEVELOPMENT: process.env.NODE_ENV === 'dev'
        })
    ]
};
