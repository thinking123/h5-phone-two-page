const rimraf = require('rimraf')


const webpack = require('webpack')
const {getEntries , isDev} = require("./utils")
const path = require('path')
const rules = require('./loaders')
const plugins = require('./plugins')






const config = {}
const dist = path.resolve( __dirname ,'..' , 'dist')
console.log('dist' , dist)
rimraf.sync(dist, {} , err=>{
    console.log('rm dist failure' , err)
})



config.entry = getEntries()

config.output = {
    filename:'[name].js',
    path:dist
}

config.resolve = {
    extensions: ['.js', '.json' , '.vue' , '.css']
}

config.mode = isDev ? 'development' : 'production'

config.module = {
    rules
}


config.plugins = plugins


console.log('config' , config)
module.exports = config