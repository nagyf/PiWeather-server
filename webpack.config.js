const webpack = require('webpack');
const isProd = (process.env.NODE_ENV === 'prod');

const settings = module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        './src/client/index.jsx'
    ],
    output: {
        path: '/dist',
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    devtool: 'source-map',
    module: {
        preLoaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            }
        ],
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader/webpack', 'babel']
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.OldWatchingPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            IS_PRODUCTION: process.env.NODE_ENV === 'prod',
            IS_DEVELOPMENT: process.env.NODE_ENV === 'dev'
        })
    ]
};

if (isProd) {
    settings.plugins.push(new webpack.optimize.UglifyJsPlugin());
}
