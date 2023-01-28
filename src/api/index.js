// 当前这个模块：API进行统一管理
import requests from "../utils/request"

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