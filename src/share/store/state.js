import {getSession} from "@/utils/common";

let timeline = getSession('timeline')
timeline = timeline ? JSON.parse(timeline) : null

let openid = getSession('openid')
let nickname = getSession('nickname')


export default {
    loading:false,
    loadingText:'',
    recordId:null,
    isPlaying:false,
    isPlayingRecord:false,
    isStartRecording:false,
    //cdn base url
    base : 'https://cdnpepsi.ysmine.com/',
    signInfo:null,
    appid:'',
    noncestr:'',
    signature:'',
    timestamp:'',
    showVideo:true,
    openid:openid,
    headimgurl:'',
    nickname:nickname,
    sex:'',
    timeline:[],
    isConfigedShare:false
}
