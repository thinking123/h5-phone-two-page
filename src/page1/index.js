import Vue from 'vue'
import App from './App'


new Vue({
    render:h => h(App)
}).$mount('#app')

// console.log('page1')
//
//
// function t() {
//     return new Promise((res, rej) => {
//         setTimeout(() => {
//             res()
//         }, 2000)
//     })
// }
//
//
// async function main() {
//     console.log('begin main')
//     await t()
//     console.log('stop main')
// }
//
// main()