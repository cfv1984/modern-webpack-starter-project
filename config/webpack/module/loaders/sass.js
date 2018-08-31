const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    test: /\.(css|scss)$/,
    use : ExtractTextPlugin.extract({
        use     : [
            {loader: "to-string-loader"},
            {loader: "css-loader"},
            {loader: "sass-loader"}
        ],
        fallback: "style-loader"
    })
};