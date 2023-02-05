import { getShopCartListAPI, delShopCartAPI, changeSkuStateAPI } from "@/api"
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
    },
    // 删除购物车
    async delShopCart ({ commit }, skuId) {
        const res = await delShopCartAPI(skuId)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    //切换商品选中状态接口
    async changeSkuState ({ commit }, { skuId, isChecked }) {
        const res = await changeSkuStateAPI(skuId, isChecked)
        if (res.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'))
        }
    },
    // 删除所有选中的产品
    async deleteAllCheckedCart ({ dispatch, getters }) {
        //context：小仓库，commit【提交mutations修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库数据】
        // 遍历getters里面的ShopCartList，选择出被选中的，获取其id
        let promiseAll = []
        getters.ShopCartList.cartInfoList.forEach((item) => {
            // 这样会返回一个promise对象【因为delShopCart上有async修饰】，dispatch删除成功，promise对象为true ；反之为false
            let promise = item.isChecked == 1 ? dispatch('delShopCart', item.skuId) : ''
            // 把每一个promise存到数组中
            promiseAll.push(promise)
        })
        // 只有全部的p1|p2...都成功，返回值才是成功
        // 如果有一个失败，返回值即为失败
        return Promise.all(promiseAll)
    },
    //切换全选状态
    async changeAllSkuState ({ dispatch, getters }, isChecked) {
        // 通过changeSkuState切换,下面的是数组
        let promiseAll = []
        getters.ShopCartList.cartInfoList.forEach(item => {
            // 遍历
            let promise = dispatch('changeSkuState', { skuId: item.skuId, isChecked })
            // 存储到promiseAll中，便于判断是否成功
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
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