//登录与注册的模块
import { getCodeAPI, registerAPi, loginAPI } from '@/api'
//Search组件的小仓库
const state = {
    //验证码
    code: ''
}
const mutations = {
    //获取验证码
    GETCODE (state, value) {
        state.code = value
    }
}
const actions = {
    // 获取验证码
    async getCode ({ commit }, phone) {
        // 获取验证码的接口，把验证码返回，但是正常情况是返回到用户手机上【这里为了省钱】
        const res = await getCodeAPI(phone)
        if (res.code === 200) {
            // 发送数据
            commit('GETCODE', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    // 注册
    async register ({ commit }, userInfo) {
        const res = await registerAPi(userInfo)
        if (res.code === 200) {
            // 注册成功,没有返回数据，不需要三连环,只需要给调用处返回成功与失败
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //登录业务token
    async login ({ commit }, userInfo) {

    }
}

const getters = {

}

// 暴露仓库
export default {
    state,
    mutations,
    actions,
    getters
}