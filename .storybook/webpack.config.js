const path = require('path');

module.exports = {
    module: {
        rules: [
            {
              test: /\.css$/,
              include: path.resolve(__dirname, '../'),
              loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"],
                include: path.resolve(__dirname, '../')
            }
        ]
    }
};
