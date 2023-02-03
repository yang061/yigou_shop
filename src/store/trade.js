//登录与注册的模块
import { getOrderInfoAPI, getUserAddressAPI } from '@/api'
//Search组件的小仓库
const state = {
    //用户地址
    address: [],
    //用户订单信息
    orderInfo: {}
}
const mutations = {
    //获取用户地址
    GETUSERADDRESS (state, value) {
        state.address = value
    },
    //获取用户订单信息
    GETORDERINFO (state, value) {
        state.orderInfo = value
    },
}
const actions = {
    //获取用户地址
    async getUserAddress ({ commit }) {
        const res = await getUserAddressAPI()
        if (res.code === 200) {
            commit('GETUSERADDRESS', res.data)
        }
    },
    //获取用户订单信息
    async getOrderInfo ({ commit }) {
        const res = await getOrderInfoAPI()
        if (res.code === 200) {
            commit('GETORDERINFO', res.data)
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