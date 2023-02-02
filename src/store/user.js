//登录与注册的模块
import { getCodeAPI, registerAPi, loginAPI, getUserInfoAPI, loginOutAPI } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
//Search组件的小仓库
const state = {
    //验证码
    code: '',
    // 本地没有的时候是空，有的时候就是token
    token: getToken(),
    //用户信息
    userInfo: {}
}
const mutations = {
    //获取验证码
    GETCODE (state, value) {
        state.code = value
    },
    // 登录
    LOGIN (state, value) {
        state.token = value
    },
    //获取用户信息
    GETUSERINFO (state, value) {
        state.userInfo = value
    },
    // 清除本地数据
    CLEAR (state) {
        state.token = ""
        state.userInfo = {}
        // 清空token
        removeToken()
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
    async login ({ commit }, data) {
        const res = await loginAPI(data)
        //data:{ nickName: '123', name: '123', userId: 8, token: '322d05cee4b7412893c79470c6a7382b' }
        //token:唯一标识符
        if (res.code === 200) {
            //用户已经成功登录且获得token
            commit('LOGIN', res.data.token)
            // 持久化存储
            setToken(res.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //获取用户信息
    async getUserInfo ({ commit }) {
        const res = await getUserInfoAPI()
        if (res.code == 200) {
            commit('GETUSERINFO', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //退出登录
    async loginOut ({ commit }) {
        //只是向服务器发送一次请求，通知服务器清除token
        const res = await loginOutAPI()
        if (res.code === 200) {
            // 清除本地数据,action不能操作state
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
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