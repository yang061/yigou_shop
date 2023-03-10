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

/**
 * 获取购物车列表信息
 * @returns promise
 */
export const getShopCartListAPI = () => requests({ url: '/cart/cartList' })

/**
 * 删除购物车产品接口
 * @param {*} skuId 商品id
 * @returns promise对象
 */
export const delShopCartAPI = (skuId) => {
    return requests({
        url: `/cart/deleteCart/${skuId}`,
        method: 'delete'
    })
}

/**
 * 切换商品选中状态接口
 * @param {*} skuID 产品id
 * @param {*} isChecked 产品选中状态
 * @returns promise对象
 */
export const changeSkuStateAPI = (skuID, isChecked) => requests({ url: `/cart/checkCart/${skuID}/${isChecked}` })

/**
 * 获取验证码接口
 * @param {*} phone 用户手机号
 * @returns promise
 */
export const getCodeAPI = (phone) => requests({ url: `/user/passport/sendCode/${phone}` })

/**
 * 注册接口
 * @param {*} param0 data:{ phone:手机号, password：密码, code：验证码 }
 * @returns promise对象
 */
export const registerAPi = (data) => {
    return requests({
        url: '/user/passport/register',
        method: 'post',
        data
    })
}

/**
 * 登录接口
 * @param {*} data {phone:手机号，password：m密码}
 * @returns promise
 */
export const loginAPI = (data) => {
    return requests({
        url: '/user/passport/login',
        method: 'post',
        data
    })
}

/**获取用户信息
 * 参数：token【在请求头里】
 * 返回 promise
 */
export const getUserInfoAPI = () => {
    return requests({
        url: "user/passport/auth/getUserInfo"
    })
}

/**
 * 退出登录
 * @returns promise
 */
export const loginOutAPI = () => requests({ url: "/user/passport/logout" })

/**
 * 获取用户地址信息
 * @returns promise
 */
export const getUserAddressAPI = () => {
    return requests({
        url: '/user/userAddress/auth/findUserAddressList'
    })
}

/**
 * 获取用户订单信息
 * @returns promise
 */
export const getOrderInfoAPI = () => requests({ url: '/order/auth/trade' })

/**
 * 提交订单接口
 * @param {*} tradeNo 交易编号(拼接在路径中)
 * @param {*} data {consignee：收件人姓名，consigneeTel：收件人电话，deliveryAddress：收件地址，paymentWay：支付方式(ONLINE代表在线)，orderComment：订单备注，orderDetailList：存储多个商品对象的数组}
 * @returns promise
 */
export const SubmitOrderAPI = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })

/**
 * 获取支付信息
 * @param {*} orderId 订单号
 * @returns promise
 */
export const getPayInfoAPI = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}` })

/**
 * 获取支付状态
 * @param {*} orderId 订单号信息
 * @returns promise
 */
export const getPayStatusAPI = (orderId) => requests({
    url: `/payment/weixin/queryPayStatus/${orderId}
` })

/**
 * 获取个人中心的数据
 * @param {*} page:页码, limit :每页显示的数据
 * @returns promise
 */
export const getMyOrderAPI = (page, limit) => requests({
    url: `/order/auth/${page}/${limit}
` })