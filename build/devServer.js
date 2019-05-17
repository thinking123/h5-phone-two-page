const {getEntries , resolve , getIP} = require("./utils")
let ip = getIP()
console.log('get ip' , ip)
ip = ip ? ip : 'localhost'
// ip = '0.0.0.0'
const devServer = {
    host: ip,
    hot: true,
    index: 'index.html',
    open: true,
    port: 9080,
    publicPath: '/',
    writeToDisk:true,
    proxy:{
        '/':'http://117.50.69.235:81/api'
    }
}


module.exports = devServer