import axios from 'axios';
import { createMsg } from './ADS';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
let baseURL = 'https://pumudata.qingtime.cn';

axios.interceptors.response.use(
    (response) => {
        switch (response.data.statusCode || response.data.status) {
            case '701':
                localStorage.clear()
                createMsg('登录失效');
                break
            case '201':
                createMsg(response.data.msg)
                break
            default:
        }

        return response
    },
    (err) => {
      console.log(err)
    }
)

const request = {
    get: (url, params, base = '') => {
        return new Promise((resolve, reject) => {
            axios
            .get((base ? base : baseURL)+url, {params})
            .then((response) => {
                resolve(response.data);
                if(response.data.status == 301){// 验证码失效 => 跳转 验证码校验UI 2022.07.02 -> baolf
                    createMsg(response.data.msg);
                    router.push('/authentication');
                }
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            })
        })
    },
    post: (url, params, base) => {
        return new Promise((resolve, reject) => {
            axios
            .post((base ? base : baseURL)+url, params)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
        })
    },
    patch: (url, params) => {
        return new Promise(function(resolve, reject) {
            axios
            .patch(baseURL+url, params)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
        })
    },
    delete: (url, params) => {
        return new Promise(function(resolve, reject) {
            axios
            .delete(baseURL+url, {
                data: params
            })
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                console.log(error)
                reject(error)
            })
        })
    }
}

const user = {
    getUserInfo(token){
        let param = {
            token: token
        }
        return request.get('/sgbh/account/userinfo', param, 'https://baokudata.qingtime.cn');
    },
    switchTokenBatch(token, appHighs){
        let param = {
            token: token,
            appHighs: appHighs
        }
        return request.post('/sgbh/account/switchTokenBatch', param, 'https://baokudata.qingtime.cn');
    }
}

const camera = {
    getDeviceList(userKey, siteKey){// 拍机号列表
        let param = {
            userKey: userKey,
            siteKey: siteKey
        }
        return request.get('/camera/device/list', param);
    },
    verfiyCode(deviceKey, code, userKey, siteKey){//验证码校验
        let param = {
            deviceKey: deviceKey,
            code: code,
            userKey: userKey,
            siteKey: siteKey
        }
        return request.post('/camera/device/verfiyCode', param);
    },
    editDevice(deviceKey, clientUser, mobile){// 编辑拍机号
        let param = {
            deviceKey: deviceKey,
            clientUser: clientUser,
            mobile: mobile,
        }
        return request.patch('/camera/device', param);
    },
    deleteVolume(code, volumeKey){//删除卷册
        let param = {
            code: code,
            volumeKey: volumeKey,
        }
        return request.delete('/camera/catalog/volume', param);
    },
}

const version = {
    getVersion(){
        let param = {
            
        }
        return request.get('/version.json', param, window.location.origin);
    },
}

export {
    camera, user, version, 
}