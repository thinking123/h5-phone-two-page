const {isDev} = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const rules = []

const es6Loader = {
    test: /\.js/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader'
    }
}

rules.push(es6Loader)


const scssLoader = {
    test: /\.scss$/,
    use: [
        {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            options: {
                sourceMap: isDev
            }
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: isDev
            }
        },
        {
            loader:'postcss-loader'
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: isDev
            }
        }
    ]
}
rules.push(scssLoader)


const cssLoader = {
    test: /\.css$/,
    use: [
        {
            loader: isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            options: {
                sourceMap: isDev
            }
        },
        {
            loader: 'css-loader',
            options: {
                sourceMap: isDev,
                importLoaders: 1
            }
        },
        {
            loader:'postcss-loader'
        }
    ]
}

rules.push(cssLoader)

const vueLoader = {
    test: /\.vue$/,
    loader: 'vue-loader'
}

rules.push(vueLoader)


// const urlLoader = {
//     test: /\.(png|jpg|gif)$/i,
//     use: [
//         {
//             loader: 'url-loader',
//             options: {
//                 limit: 200
//             }
//         }
//     ]
// }
//
// rules.push(urlLoader)


const fileLoader = {
    test: /\.(png|jpg|gif|svg)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name(file) {
                    if (isDev) {
                        return '[name].[ext]';
                    }

                    return '[hash].[ext]';
                },
                outputPath: 'images',
            },
        }
    ]
}

rules.push(fileLoader)

const imageCompressLoader = {
    test: /\.(jpg|png|gif|svg)$/,
    loader: 'image-webpack-loader',
    enforce: 'pre'
}

rules.push(imageCompressLoader)

module.exports = rules

