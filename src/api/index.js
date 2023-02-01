// 当前这个模块：API进行统一管理
import requests from "../utils/request"
import mockRequest from '../utils/mockRequest'
// 三级联动的接口
/**
 * 获取商品分类列表的接口
 * @returns promise对象
 */
export const getCategoryListAPI = () => {
    // 发请求：axios发送请求
    return requests({
        url: '/product/getBaseCategoryList'
    })
}

/**
 * 获取banner数据(Home首页轮播图接口)
 * @returns promise对象
 */
export const getBannerListAPI = () => mockRequest.get('/banner')

/**
 * 获取floor组件的列表数据接口
 * @returns promise 对象
 */
export const getFloorListAPI = () => mockRequest.get('/floor')

/**
 * 获取搜索模块数据接口
 * @param {*} params 当前接口需要传递一个默认参数，至少是一个空对象
 * @returns promise对象
 */
export const getSearchInfoAPI = (params) => {
    return requests({
        url: '/list',
        method: 'post',
        data: params
    })
}

/**
 * 获取商品详情信息接口
 * @param {*} skuId 商品的id
 * @returns promise对象
 */
export const getGoodsDetailInfoAPI = (skuId) => requests({ url: `/item/${skuId}` })

/**
 * 将产品添加到购物车中(或更新一个产品的个数)
 * @param {} param0  skuID：产品id  skuNum：产品数量
 * @returns promise对象
 */
export const addOrUpdateShopCartAPI = (skuId, skuNum) => {
    return requests({
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        method: 'post',
    })
}