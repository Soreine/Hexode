module.exports = {
    entry: './src/main.js',
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
        library: true,
        libraryTarget: 'commonjs2',
        filename: 'app.js'

    },
    externals: [
        { 'express': 'commonjs express' },
        { 'mongodb': 'commonjs mongodb' }
    ],
    target: 'node'
}
