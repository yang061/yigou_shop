import { getShopCartListAPI } from "@/api"
//购物车组件的小仓库
const state = {
    ShopCartList: []
}
const mutations = {
    // 获取购物车列表
    GETSHOPCARTLIST (state, value) {
        state.ShopCartList = value
    }
}
const actions = {
    // 获取购物车列表
    async getShopCartList ({ commit }) {
        const res = await getShopCartListAPI()
        if (res.code === 200) {
            commit('GETSHOPCARTLIST', res.data)
        }
    }
}

const getters = {
    ShopCartList (state) {
        return state.ShopCartList[0] || {}
    },

}

// 暴露仓库
export default {
    state,
    mutations,
    actions,
    getters
}