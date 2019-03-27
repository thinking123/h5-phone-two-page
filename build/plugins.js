const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {getEntries, isDev , getEnv , resolve} = require("./utils")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin = require('compression-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const {HTML_TITLE} = require('./constant')
const path = require('path')

const plugins = []
const env = getEnv()
getEntries().forEach(entry => {

    const name = entry.name
    const html = entry.html
    // console.log('getEntriesName', name)
    const config = {
        template: html,
        filename: `${name}.html`,
        title: HTML_TITLE,
        chunks: [name]
    }
    const htmlPlugin = new HtmlWebpackPlugin(config)


    plugins.push(htmlPlugin)
})

plugins.push(new VueLoaderPlugin())

const copyPlugin = new CopyPlugin([
    { from: resolve('src/share/libs'), to: resolve('dist/libs') }
])

plugins.push(copyPlugin)


if (!isDev) {
    const minCssPlugin = new MiniCssExtractPlugin({
        filename: isDev ? 'css/[name].css' : 'css/[contenthash].css',
        chunkFilename: isDev ? 'css/[id].css' : 'css/[contenthash].css',
    })

    plugins.push(minCssPlugin)


    const optimizeCssPlugin = new OptimizeCssAssetsPlugin({})

    plugins.push(optimizeCssPlugin)


    const compressionPlugin = new CompressionPlugin()

    plugins.push(compressionPlugin)



    const hashMoudleIdsPlugin = new webpack.HashedModuleIdsPlugin({})

    plugins.push(hashMoudleIdsPlugin)
}

if(env == 'analyzer'){
    console.log('env')
    const bundle = new BundleAnalyzerPlugin({
        // mode:'static'
    })
    plugins.push(bundle)
}





module.exports = plugins

