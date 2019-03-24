const glob = require('glob')
const path = require('path')
const {CODE_PATH} = require("./constant")

function getEntries() {
    // const pattern = path.resolve(CODE_PATH , '..' , "**/*.js")
    const pattern = `${CODE_PATH}/**/*.js`
    //
    // console.log('pattern' , pattern)
    const entries = {}
    glob.sync(pattern , {
        // root:path.resolve()
        ignore:[`${CODE_PATH}/share/**/*`]
    }).forEach(m =>{
        console.log('m ' , m)
        const reg = /\/(\w+)\/\w+\.js$/
        const key = m.match(reg)[1]
        console.log('key' , key)

        entries[key] = m
    })
    console.log('ertries' , entries)
    return entries
}
function getEntriesName() {
    const pattern = `${CODE_PATH}/**/*.js`
    const entries = []
    glob.sync(pattern , {
        ignore:[`${CODE_PATH}/share/**/*`]
    }).forEach(f =>{
        console.log('m ' , f)
        const reg = /\/(\w+)\/\w+\.js$/
        const key = f.match(reg)[1]
        console.log('key' , key)

        entries.push(key)
    })

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



// function isDev(){
//     return process.env.NODE_ENV !== 'production'
// }
module.exports = {
    getEntries,
    resolve,
    isDev:getEnv() === 'development',
    getEnv,
    getEntriesName
}