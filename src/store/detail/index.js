import { getGoodsDetailInfoAPI, addOrUpdateShopCartAPI } from '@/api'
// 详情页的vuex
const state = {
    goodsDetailList: {},
    // shopCartInfo: {}

}
const mutations = {
    // 获取商品详情信息
    GETGOODSDETAILINFO (state, value) {
        state.goodsDetailList = value
    },
    // // 将产品添加到购物车
    // ADDORUPDATESHOPCART (state, value) {
    //     state.shopCartInfo = value
    // }
}
const actions = {
    // 获取详情信息
    async getGoodsDetailInfo ({ commit }, skuId) {
        const res = await getGoodsDetailInfoAPI(skuId)
        if (res.code === 200) {
            commit('GETGOODSDETAILINFO', res.data)
        }
    },
    // 将产品添加到购物车
    async addOrUpdateShopCart ({ commit }, { skuId, skuNum }) {
        const res = await addOrUpdateShopCartAPI(skuId, skuNum)
        // 加入购物车后，只是把数据保存了，此时，不需要存储【没有返回其他数据】
        if (res.code === 200) {
            // 加入成功
            return "ok"
        } else {
            // 代表加入购物车失败
            return Promise.reject(new Error('false'))
        }
    }
}
const getters = {
    // 服务器没回来时应该有个空对象值，不能为undefined
    // 路径导航(面包屑)简化
    categoryView () {
        return state.goodsDetailList.categoryView || {}
    },
    // 商品详情简化
    skuInfo () {
        return state.goodsDetailList.skuInfo || {}
    },
    // 商品售卖属性简化
    spuSaleAttrList () {
        return state.goodsDetailList.spuSaleAttrList || []
    }

}

// 暴露仓库
export default {
    state,
    mutations,
    actions,
    getters
}