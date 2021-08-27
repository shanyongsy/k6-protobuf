const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        ping: './src/pb.js',
        // question: './src/question.js'
        // tcp: './src/tcp-test.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        library: {
            name: 'ping',
            type: 'commonjs',
        },
        globalObject: 'this',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
        ],
    },
    target: 'web',
    externals: /^(k6|https?\:\/\/)(\/.*)?/,
    // resolve: {
    //     fallback: {
    //         crypto: require.resolve('crypto-browserify'),
    //         stream: require.resolve('stream-browserify'),
    //         net: require.resolve('net-browserify'),
    //         zlib: require.resolve('browserify-zlib'),
    //         http: require.resolve('stream-http'),
    //         path: require('node-libs-browser').path,
    //         buffer: require('node-libs-browser').buffer,
    //         fs: false,
    //     }
    // },
    plugins: [
        new webpack.ProvidePlugin({
            // process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    ],
}