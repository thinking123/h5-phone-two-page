import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'
import store from 'store'

import 'compatibility/flexible'
import 'debug'


import 'css/index.css'

Vue.config.productionTip = false

document.title = "会员查询"
new Vue({
    store,
    render:h => h(App)
}).$mount('#app')
