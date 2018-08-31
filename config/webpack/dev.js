const extractSass = require('./plugins/extract-sass');

const cfg = {
    output: require('./output'),
    module: require('./module')
};

const {normalize, resolve} = require('path');
const absolutePath = (relativePath) => normalize(resolve(__dirname, relativePath));

module.exports = {
    entry: absolutePath('../../src/js/index.js'),
    output: cfg.output,
    module: cfg.module,
    stats: {
        colors: true
    },
    devServer: {
        contentBase: absolutePath('../../public'),
        compress: true,
        port: 9000
    },
    devtool: 'source-map',
    plugins: [
        extractSass
    ]
};
