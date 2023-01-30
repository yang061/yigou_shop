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