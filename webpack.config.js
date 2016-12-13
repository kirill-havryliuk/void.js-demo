console.log(process.env.NODE_ENV + " build!");
var webpack = require("webpack");

var config = {
    context: __dirname + "/src",
    entry: "./app/index.js",
    output: {
        path: __dirname + "/docs",
        filename: "bundle.js"
    },
    resolve: {
        root: __dirname + "/src",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: [ "es2015", "react", "stage-0" ]
                }
            },
            {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"' + process.env.NODE_ENV + '"'
            }
        })
    ]
};

if (process.env.NODE_ENV === "production") {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    );
} else {
    config.devtool = "#cheap-inline-source-map";
}

module.exports = config;
