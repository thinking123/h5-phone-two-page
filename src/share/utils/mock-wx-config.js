export function wx_config(appid , timestamp , nonceStr , signature , jsApiList) {
    return new Promise((resolve, reject) => {
        resolve()
    })
}
//定义分享到朋友圈内容
export function wx_timelineShare(title, link, imgUrl) {
    return new Promise((resolve, reject) => {
        resolve()
    })
}

//定义“分享给朋友”及“分享到QQ”按钮的分享内容
export function wx_appMessageShare(title, desc , link, imgUrl) {
    return new Promise((resolve, reject) => {
        resolve()
    })
}

export const wx_startRecord = () => {
    return new Promise((resolve, reject) => {
        resolve()
    })
}
export const wx_stopRecord = () => {
    return new Promise((resolve, reject) => {
        resolve('localId')
    })
}
export const wx_playRecord = (localId) => {

}

export const wx_stopPlayRecord = (localId) => {
}

export const wx_playEnd = (localId) => {
    return new Promise((resolve, reject) => {
        resolve('localId')
    })
}


export const wx_registerOnVoicePlayEnd = (cb) => {

}


export const wx_uploadRecord = (localId) => {
    return new Promise((resolve, reject) => {
        resolve()
    })
}
