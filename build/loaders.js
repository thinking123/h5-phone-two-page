const {isDev} = require('./utils')

const rules = []

const es6Loader = {
    test:/\.js/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader'
    }
}

rules.push(es6Loader)


module.exports = rules

