import http from './axios'

function parseRespond(res, errMsg, resolveStatus = []) {
    if (!!res && res.status && res.status.indexOf('2') > -1) {
        // return res.rows ? res.rows : res
        return res.rows
    } else {
        const msg = res && res.message ? res.message : errMsg
        throw new Error(msg ? msg : 'error')
    }
}
//获取h5头像
/*
* createTime (string, optional),
id (integer, optional),
musicUrl (string, optional): 节奏信息 ,
openidGzh (string, optional),
updateTime (string, optional),
userHead (string, optional),
userName (string, optional),
userPhone (string, optional)
* */
export async function getAvater(id) {
    const url = `/login/api/login/HFiveUser?id=${id}`
    // const params = {
    //     id
    // }
    return http.post(url, {}).then(parseRespond)
}


export async function uploadRecord(openid , mediaId) {


    const url = `/login/api/misic/uploadRecord`
    return http.post(url, {
        openid,mediaId
    }).then(res=>{
        console.log('uploadQiniuyun record' , res)
        return res.rows
    })
}

export async function getSignInfo() {


    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    let signUrl=''
    if (isAndroid) {
        signUrl=location.href.split('#')[0]
        // signUrl=link
        signUrl = encodeURIComponent(signUrl)
        console.log("signUrl" , signUrl)
    }
    if (isIOS) {
        signUrl=location.href.split('#')[0]  //hash后面的部分如果带上ios中config会不对
        signUrl = encodeURIComponent(signUrl)
    }

    const url = `/login/api/misic/signature?url=${signUrl}`
    const data = {
        url: signUrl
    }
    return http.post(url, {}, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res=>res.rows)
}
export async function login() {
    const url = `/login/login/api/login/htmllogin`
    return http.post(url, {}, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res=>res)
}




