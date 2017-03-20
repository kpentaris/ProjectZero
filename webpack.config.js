module.exports = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.config.js', '.png', '.gif']
    },
    entry: './scripts/main.ts',
    output: {
        path: __dirname + '/dist'/*,
        filename: 'app.js'*/
    },
    module: {
        /*rules: [
            {test: /\.js$/, loader: 'source-map-loader', enforce: 'pre'}
        ],*/
        loaders: [
            {test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/},
            {test: /\.css$/, loader: "style!css"},
            {
                test: /\.(svg|ttf|eot|woff)\?w\w+$/,
                loader: "file-loader?name=/resources/[path][name].[ext]&context=./resources"
            },
            {
                test: /\.png$|\.gif$|\.jpe?g$/,
                loader: "file-loader?name=/resources/[path][name].[ext]"
            }
        ]
    },
    watch: true,
    devtool: "source-map",

    devServer: {
    }
};
