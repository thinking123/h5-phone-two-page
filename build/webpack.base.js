const webpack = require('webpack')
const {getEntries , isDev} = require("./utils")
const path = require('path')
const rules = require('./loaders')




const config = {}


config.entry = getEntries()

config.output = {
    filename:'[name].js',
    path:path.resolve('..' , __dirname , '/dist')
}


config.mode = isDev ? 'development' : 'production'

config.rules = rules


