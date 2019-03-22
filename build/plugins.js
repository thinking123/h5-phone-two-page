const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {getEntriesName , isDev} = require("./utils")
const path = require('path')

const plugins = []

getEntriesName().forEach(name => {

    console.log('getEntriesName' , name)
    const config = {
        template:path.resolve(__dirname , 'html-template.html'),
        filename:`${name}.html`,
        title:name,
        chunks:[name]
    }
    const htmlPlugin = new HtmlWebpackPlugin(config)


    plugins.push(htmlPlugin)
})

plugins.push(new VueLoaderPlugin())



module.exports = plugins

