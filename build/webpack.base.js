const rimraf = require('rimraf')
const px2rem = require('postcss-px2rem')

const webpack = require('webpack')
const {getEntries, isDev, resolve} = require("./utils")
const path = require('path')
const rules = require('./loaders')
const plugins = require('./plugins')
const devServer = require('./devServer')


const config = {}
const dist = path.resolve(__dirname, '..', 'dist')
// console.log('dist', dist)
rimraf.sync(dist, {}, err => {
    console.log('rm dist failure', err)
})


const entries = {}
getEntries().forEach(f => {
    entries[f.name] = f.entry
})
config.entry = entries

if(isDev){
    config.output = {
        filename: '[name].js',
        path: dist
    }

}else{
    config.output = {
        filename: 'js/[name].[contenthash].js',
        path: dist
    }

}


if (isDev) {
    config.devtool = 'inline-source-map'
    config.devServer = devServer

} else {
    config.optimization = {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            chunks: 'all',
            // minSize:10000,
            // maxAsyncRequests:100,
            cacheGroups: {
                vue: {
                    // test: /\/node_modules\/vue\//,
                    test: /[\\/]node_modules[\\/](vue)[\\/]/,
                    name: 'vue',
                    priority: -9,
                    chunks: 'all',
                    reuseExistingChunk: true
                },
                vender: {
                    // test: /\/node_modules\/vue\//,
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vender',
                    priority: -10,
                    chunks: 'all',
                    minSize: 10000,
                    reuseExistingChunk: true,
                    enforce: true
                },
                share: {
                    // test: /\/node_modules\/vue\//,
                    test: /src[\\/](share)[\\/]/,
                    name: 'share',
                    chunks: 'all',
                    priority: -8,
                    minSize: 10000,
                    reuseExistingChunk: true
                },
            }
        }
    }
}


config.resolve = {
    extensions: ['.js', '.json', '.vue', '.css', '.scss', '.less'],
    alias: {
        '@': resolve('src/share/'),
        'components': resolve('src/share/components/'),
        'css': resolve('src/share/css/'),
        'libs': resolve('src/share/libs/'),
        'utils': resolve('src/share/utils/'),
        'debug': resolve('src/share/debug/'),
        'compatibility': resolve('src/share/compatibility/'),
        'images': resolve('src/share/images/'),
        'store': resolve('src/share/store/'),
        'vue': 'vue/dist/vue.js'
    }
}

config.mode = isDev ? 'development' : 'production'

config.module = {
    rules
}


config.plugins = plugins


// console.log('config', config)
module.exports = config