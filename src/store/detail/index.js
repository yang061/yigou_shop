import { getGoodsDetailInfoAPI } from '@/api'
// 详情页的vuex
const state = {
    goodsDetailList: {}
}
const mutations = {
    // 获取商品详情信息
    GETGOODSDETAILINFO (state, value) {
        state.goodsDetailList = value
    }
}
const actions = {
    // 获取详情信息
    async getGoodsDetailInfo ({ commit }, skuId) {
        const res = await getGoodsDetailInfoAPI(skuId)
        if (res.code === 200) {
            commit('GETGOODSDETAILINFO', res.data)
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