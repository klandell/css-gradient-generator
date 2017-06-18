const webpack = require('webpack');
const path = require('path');

const debug = process.env.NODE_ENV !== 'production';

/**
 * This scary looking file is our webpack build config.
 * It has a lot of dev dependencies for loading the different
 * pieces of the app and compiling into a minified version.
 * It is very flexible though, which is why it is so popular.
 */

module.exports = {
    context: `${__dirname}/src`,
    target: 'web',
    devtool: debug ? 'inline-sourcemap' : 'cheap-module-source-map',
    entry: { bundle: './entry.js' },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['react', 'es2015', 'stage-0'],
                    plugins: ['react-html-attrs', 'transform-decorators-legacy'],
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: [
                    {
                        loader: 'style-loader',
                        options: { minimize: true },
                    },
                    {
                        loader: 'css-loader',
                        options: { minimize: true },
                    },
                    {
                        loader: 'sass-loader',
                        options: { minimize: true },
                    },
                ],
            },
        ],
    },
    resolve: {
        alias: {
            Actions: path.resolve(__dirname, './src/actions/'),
            Components: path.resolve(__dirname, './src/components/'),
            Containers: path.resolve(__dirname, './src/containers/'),
            Constants: path.resolve(__dirname, './src/constants.js'),
            Reducers: path.resolve(__dirname, './src/reducers/'),
            Sass: path.resolve(__dirname, './src/sass/'),
        },
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../public'),
    },
    plugins: (debug ? [] : [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(debug ? undefined : 'production'),
            },
        }),
    ]).concat([
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: ({ resource }) => /node_modules/.test(resource),
        }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'manifest' }),
    ]).concat(debug ? [] : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({ comments: false }),
    ]),
};
