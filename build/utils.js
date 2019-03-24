const glob = require('glob')
const path = require('path')
const fs = require('fs')
const os = require('os')
const {CODE_PATH} = require("./constant")

function getEntries() {
    // const pattern = path.resolve(CODE_PATH , '..' , "**/*.js")
    const pattern = `${CODE_PATH}/**/*.js`
    //
    // console.log('pattern' , pattern)
    const entries = []
    glob.sync(pattern , {
        // root:path.resolve()
        ignore:[`${CODE_PATH}/share/**/*`]
    }).forEach(m =>{
        console.log('m ' , m)
        const reg = /\/(\w+)\/\w+\.js$/
        const key = m.match(reg)[1]
        console.log('key' , key)

        // entries[key] = m
        m = resolve(m)
        let html = m.replace('.js' , '.html')
        if(!fs.existsSync(html)){
            html = path.resolve(__dirname , 'html-template.html')
        }
        console.log('html' , html)
        entries.push({
            html:html,
            entry:m,
            name:key
        })
    })
    console.log('ertries' , entries)
    return entries
}


function resolve(src) {
    const p = path.resolve(__dirname , '..' , src)
    console.log('p' , p)
    return p
}


function getEnv(){
    return process.env.NODE_ENV
}

function getIP(){

    var ifaces = os.networkInterfaces();
    let ip = null
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;

        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
                return;
            }

            if (alias >= 1) {
                // this single interface has multiple ipv4 addresses
                console.log(ifname + ':' + alias, iface.address);
            } else {
                // this interface has only one ipv4 adress
                console.log('ifname, iface.address')
                console.log(ifname, iface.address);
                ip = iface.address
            }
            ++alias;
        });
    });

    return ip
}

// function isDev(){
//     return process.env.NODE_ENV !== 'production'
// }
module.exports = {
    getEntries,
    resolve,
    isDev:getEnv() === 'development',
    getEnv,
    getIP
}