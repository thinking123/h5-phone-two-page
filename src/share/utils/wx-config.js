// import store from '../store'
import {getSignInfo} from "./http";
import {showMsg} from "./common";

export function wx_config(appId , timestamp , nonceStr , signature , jsApiList , imgUrl) {
    return new Promise((resolve, reject) => {
        wx.config({
            debug: false,
            appId,
            timestamp,
            nonceStr,
            signature,
            jsApiList
        })

        wx.ready(function () {
            resolve()
        })
        wx.error(reject)
    })
}

export async function initShare(link , imgUrl) {
    try {
        // if(isNotSharePage){
        //     return
        // }
        const title = '我的音乐人格'
        const desc = '来测测你的音乐人格吧'

        let appid,
            noncestr,
            signature,
            timestamp

        const res = await getSignInfo()
        console.log('getSignInfo' , res)
        // store.commit('setsignInfo' , res)
        appid = res.appid
        noncestr = res.noncestr
        signature = res.signature
        timestamp = res.timestamp
        console.log('share data' , link , imgUrl)
        const jsApiList = [
            'updateAppMessageShareData',
            'updateTimelineShareData',
            //下面这两个api，虽然已经废弃，但是android必须调用，否则不能分享
            'onMenuShareAppMessage',
            'onMenuShareTimeline'
        ]
        await wx_config(appid, timestamp, noncestr, signature, jsApiList)
        // store.commit('setisConfigedShare' , true)

        console.log('分享数据' , title, desc, link, imgUrl)
        console.log('分享结束1')
        await wx_appMessageShare(title, desc, link, imgUrl)
        console.log('分享结束2')
        await wx_timelineShare(title, link, imgUrl)
        // console.log('分享结束3')
        onMenuShareTimeline(title, link, imgUrl)
        // console.log('分享结束4')
        onMenuShareAppMessage(title, desc, link, imgUrl)

    }catch (e) {
        showMsg(e)
    }
}
//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
export function onMenuShareTimeline(title, link, imgUrl) {
    wx.onMenuShareTimeline({
        title,
        link,
        imgUrl,
        success:res=>{
            console.log('分享到朋友圈 即将废弃 success')

        },
        fail:err=>{
            console.log('分享到朋友圈 即将废弃 fail')

        },
        cancel:res=>{
            console.log('分享到朋友圈 即将废弃 fail')
        },
    })
}
//获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
export function onMenuShareAppMessage(title, desc , link, imgUrl) {
    wx.onMenuShareAppMessage({
        title,
        desc,
        link,
        imgUrl,
        success:res=>{
            console.log('分享给朋友 即将废弃 success')
        },
        fail:err=>{
            console.log('分享给朋友 即将废弃 fail')
        },
        cancel:res=>{
            console.log('分享给朋友 即将废弃 fail')
        },
    })
}

//获取“分享到QQ”按钮点击状态及自定义分享内容接口（即将废弃）
export function onMenuShareQQ(title, desc , link, imgUrl) {
    return new Promise((resolve, reject) => {
        wx.onMenuShareQQ({
            title,
            desc,
            link,
            imgUrl,
            success:res=>{
                console.log('分享到QQ success')
                resolve(res)
            },
            fail:err=>{
                console.log('分享到QQ fail')
                reject(err)
            },
            cancel:res=>reject(new Error('用户取消分享')),
        })
    })
}

//获取“分享到QQ空间”按钮点击状态及自定义分享内容接口（即将废弃）
export function onMenuShareQZone(title, desc , link, imgUrl) {
    return new Promise((resolve, reject) => {
        wx.onMenuShareQZone({
            title,
            desc,
            link,
            imgUrl,
            success:res=>{
                console.log('分享到QQ空间 success')
                resolve(res)
            },
            fail:err=>{
                console.log('分享到QQ空间 fail')
                reject(err)
            },
            cancel:res=>reject(new Error('用户取消分享')),
        })
    })
}



//定义分享到朋友圈内容
export function wx_timelineShare(title, link, imgUrl) {
    return new Promise((resolve, reject) => {
        wx.updateTimelineShareData({
            title,
            link,
            imgUrl,
            success:res=>{
                console.log('定义分享到朋友圈内容 success')
                resolve(res)
            },
            fail:err=>{
                console.log('定义分享到朋友圈内容 fail')
                reject(err)
            },
            cancel:res=>reject(new Error('用户取消分享')),
        })
    })
}

//定义“分享给朋友”及“分享到QQ”按钮的分享内容
export function wx_appMessageShare(title, desc , link, imgUrl) {
    return new Promise((resolve, reject) => {
        wx.updateAppMessageShareData({
            title,
            desc,
            link,
            imgUrl,
            success:res=>{
                console.log('分享给朋友 success')
                resolve(res)
            },
            fail:err=>{
                console.log('分享给朋友 fail')
                reject(err)
            },
            cancel:res=>reject(new Error('用户取消分享')),
        })
    })
}

export const wx_startRecord = () => {
    return new Promise((resolve, reject) => {
        wx.startRecord({
            success: function (res) {
                resolve(res)
            },
            fail: err => reject(err)
        })
    })
}
export const wx_stopRecord = () => {
    return new Promise((resolve, reject) => {
        wx.stopRecord({
            success: function (res) {
                console.log('wx_stopRecord' , res , res.localId)
                var localId = res.localId;
                resolve(res.localId)
            },
            fail: err => reject(err)
        })
    })
}
export const wx_playRecord = (localId) => {
    console.log('wx_playRecord')
    wx.playVoice({
        localId,// 需要播放的音频的本地ID，由stopRecord接口获得,
        fail:err=>{
            console.log('wx_playRecord error'  ,err)
        }
    });
}

export const wx_stopPlayRecord = (localId) => {
    wx.stopVoice({
        localId // 需要停止的音频的本地ID，由stopRecord接口获得
    });
}

export const wx_playEnd = (localId) => {
    return new Promise((resolve, reject) => {
        wx.onVoicePlayEnd({
            success: function (res) {
                var localId = res.localId; // 返回音频的本地ID
                resolve(res.localId)
            },
            fail: err => reject(err)
        })
    })
}


export const wx_registerOnVoicePlayEnd = (cb) => {
    // 监听语音播放完毕接口
    wx.onVoicePlayEnd({
        complete: cb
    });
}


export const wx_uploadRecord = (localId) => {
    return new Promise((resolve, reject) => {
        wx.uploadVoice({
            localId, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
                var serverId = res.serverId; // 返回音频的服务器端ID
                resolve(serverId)
            },
            fail: err => reject(err)
        });
    })
}
