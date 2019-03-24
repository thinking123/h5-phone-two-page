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
/*
* H5标题：今天，我为邮储女性代言；内容简介：快来编写专属你的邮储女性“代言海报”
* */
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
