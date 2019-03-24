import 'css/index.css'
import 'css/variables.scss'
import Vue from 'vue'
import App from './App'


new Vue({
    render:h => h(App)
}).$mount('#app')

// console.log('index')
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