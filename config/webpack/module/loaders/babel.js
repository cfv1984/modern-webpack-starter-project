module.exports = {
    test  : /\.js$/,
    loader: "babel-loader",
    query : {
        presets: [require.resolve('@babel/preset-env')]
    }
};