const rimraf = require('rimraf')
const path = require('path')
const dist = path.resolve( __dirname ,'..' , 'dist')
console.log('dist' , dist)
rimraf.sync(dist, {} , err=>{
    console.log('rm dist failure' , err)
})

console.log('rimraf' , dist)