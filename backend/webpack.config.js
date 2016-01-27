module.exports = {
    entry: './src/server.js',
    module: {
        loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: './dist',
        filename: 'app.js'

    },
    externals: [
        { 'express': 'commonjs express' },
        { 'mongodb': 'commonjs mongodb' },
        { 'body-parser': 'commonjs body-parser' },
        { 'watch': 'commonjs watch' },
        { 'chalk': 'commonjs chalk' }
    ],
    target: 'node'
}
