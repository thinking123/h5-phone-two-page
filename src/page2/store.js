import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

export const CHANGE_LOADING_BAR = "CHANGE_LOADING_BAR"

const state = {
    loading:false,
    loadingText:'',
    base : 'https://cdnpepsi.ysmine.com/',
    appid:'',
    noncestr:'',
    signature:'',
    timestamp:'',
    openid:''
}

const getters = {
    loading: state => state.loading,
    loadingText: state => state.loadingText,
    base: state => state.base,
    openid: state => state.openid,
}

const actions = {

}


const loadQueue = []
const mutations = {
    [CHANGE_LOADING_BAR](state , loadingBarState){
        if (loadingBarState) {
            loadQueue.push(true)
        } else {
            loadQueue.pop()
        }

        state.loading =  loadQueue.length > 0
        if(!state.loading){
            state.loadingText = ''
        }
    },
}


export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})