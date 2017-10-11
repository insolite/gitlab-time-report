const webpack = require('webpack');

const env = process.env;
const
    NODE_ENV = env.NODE_ENV || 'development',
    LISTEN_HOST = env.LISTEN_HOST || 'localhost',
    LISTEN_PORT = env.LISTEN_PORT || 3030,
    GITLAB_URL = env.GITLAB_URL || 'localhost',
    GITLAB_TOKEN = env.GITLAB_TOKEN || '';

module.exports = {
    entry: './src',
    output: {
        path: __dirname + '/src',
        filename: 'index.js'
    },
    devtool: NODE_ENV == 'development' ? 'inline-source-map' : false,
    devServer: {
        inline: true,
        host: LISTEN_HOST,
        port: LISTEN_PORT,
        contentBase: __dirname + '/src'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: [
            '.webpack.js',
            '.jsx',
            '.js'
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __GITLAB_URL: JSON.stringify(GITLAB_URL),
            __GITLAB_TOKEN: JSON.stringify(GITLAB_TOKEN)
        })
    ]
};
