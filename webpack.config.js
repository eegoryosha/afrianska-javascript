let path = require('path');


module.exports = {
    mode: 'production',
    entry: './src/js/index.js',

    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist/js'
    },
    watch: false,
    devtool: 'inline-source-map',

    module: {}
};
