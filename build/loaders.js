const {isDev} = require('./utils')

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
            loader: 'style-loader',
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
            loader: 'style-loader',
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

module.exports = rules

