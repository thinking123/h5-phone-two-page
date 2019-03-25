import Vue from 'vue'
import Vuex from 'vuex'

import App from './App'
import store from './store'

import 'compatibility/flexible'
import 'debug'

import SoundPlay from 'utils/SoundPlay'

import 'css/index.css'
import 'css/variables.scss'
import 'weui/dist/style/weui.min.css'

Vue.config.productionTip = false

Vue.prototype.$sound = new SoundPlay()

new Vue({
    store,
    render:h => h(App)
}).$mount('#app')
