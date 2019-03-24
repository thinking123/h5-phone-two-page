const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {getEntries, isDev , getEnv} = require("./utils")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')

const path = require('path')

const plugins = []
const env = getEnv()
getEntries().forEach(entry => {

    const name = entry.name
    const html = entry.html
    console.log('getEntriesName', name)
    const config = {
        template: html,
        filename: `${name}.html`,
        title: name,
        chunks: [name]
    }
    const htmlPlugin = new HtmlWebpackPlugin(config)


    plugins.push(htmlPlugin)
})

plugins.push(new VueLoaderPlugin())


if (!isDev) {
    const minCssPlugin = new MiniCssExtractPlugin({
        filename: isDev ? 'css/[name].css' : 'css/[name].[hash].css',
        chunkFilename: isDev ? 'css/[id].css' : 'css/[id].[hash].css',
    })

    plugins.push(minCssPlugin)


    const optimizeCssPlugin = new OptimizeCssAssetsPlugin({})

    plugins.push(optimizeCssPlugin)


    const compressionPlugin = new CompressionPlugin()

    plugins.push(compressionPlugin)
}

if(env == 'analyzer'){
    console.log('env')
    const bundle = new BundleAnalyzerPlugin({
        // mode:'static'
    })
    plugins.push(bundle)
}



module.exports = plugins

