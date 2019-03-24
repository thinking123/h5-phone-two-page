const rimraf = require('rimraf')


const webpack = require('webpack')
const {getEntries , isDev , resolve} = require("./utils")
const path = require('path')
const rules = require('./loaders')
const plugins = require('./plugins')
const devServer = require('./devServer')





const config = {}
const dist = path.resolve( __dirname ,'..' , 'dist')
console.log('dist' , dist)
rimraf.sync(dist, {} , err=>{
    console.log('rm dist failure' , err)
})


const entries = {}
getEntries().forEach(f=>{
    entries[f.name] = f.entry
})
config.entry = entries

config.output = {
    filename:'[name].js',
    path:dist
}

if(isDev){
    config.devtool =  'inline-source-map'
    config.devServer = devServer

}else{
    config.optimization = {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks:{
            chunks:'all',
            // minSize:10000,
            cacheGroups: {
                vue:{
                    // test: /\/node_modules\/vue\//,
                    test: /[\\/]node_modules[\\/](vue)[\\/]/,
                    name: 'vue',
                    chunks: 'all',
                },
                // default: {
                //     minChunks: 2,
                //     priority: -20,
                //     reuseExistingChunk: true
                // }
                vender:{
                    // test: /\/node_modules\/vue\//,
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vender',
                    priority:-1,
                    chunks: 'all',
                    minSize:10000
                }
            }
        }
    }
}


config.resolve = {
    extensions: ['.js', '.json' , '.vue' , '.css' , '.scss' , '.less'],
    alias:{
        '@':resolve('src/share/'),
        'components':resolve('src/share/components/'),
        'css':resolve('src/share/css/'),
        'libs':resolve('src/share/libs/'),
        'utils':resolve('src/share/utils/'),
        'debug':resolve('src/share/debug/'),
        'compatibility':resolve('src/share/compatibility/'),
        'images':resolve('src/share/images/'),
    }
}

config.mode = isDev ? 'development' : 'production'

config.module = {
    rules
}


config.plugins = plugins


// console.log('config' , config)
module.exports = config