import {getSession} from "@/utils/common";


let openid = getSession('openid')
let nickname = getSession('nickname')


export default {
    loading:false,
    loadingText:'',
    base : 'https://cdnpepsi.ysmine.com/',
    appid:'',
    noncestr:'',
    signature:'',
    timestamp:'',
    openid:openid,
    headimgurl:'',
    nickname:nickname,
    sex:'',
}
