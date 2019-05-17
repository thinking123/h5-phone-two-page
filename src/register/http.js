import http from '@/utils/axios'

function parseRespond(res, errMsg, resolveStatus = []) {
    console.log("res : " , res)

    if (!!res && res.status && res.status.indexOf('2') == 0) {
        return res.rows ? res.rows : res

        // return res.data ? res.data.rows : res.data
    } else {
        const msg = res && res.message ? res.message : errMsg
        throw new Error(msg ? msg : 'error')
    }
}


export async function getCode(phone) {
    const url = `/get`
    const params = {
        phone
    }
    return http.get(url, {params}, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => parseRespond(res.data))
}

export async function register(
    userName,//(string, optional): 会员名 注册填写 ,
    userPhone,//(string, optional): 手机号 注册填写 ,
    userPhoneCode,//(string, optional): 验证码 注册填写
) {
    const url = `/register`
    return http.post(url, {
        userName,
        userPhone,
        userPhoneCode,
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => parseRespond(res.data))
}