import { getBannerListAPI, getCategoryListAPI } from '@/api/index' //引入要加{}
//Home组件的小仓库
const state = {
    //state中的数据默认值不能乱写，根据接口返回值的类型来确定(服务器返回对象==》默认值是对象 ；服务器返回数组 ==》默认值是数组)
    categoryList: [], //保存分类列表数据
    bannerList: [] // 保存banner数据列表
}
const mutations = {
    //value是接收到的数据,在这里是res.data === >类型是数组
    CATEGORYLIST (state, value) {
        state.categoryList = value
    },
    GETBANNERLIST (state, value) {
        state.bannerList = value
    }
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发送请求，存储数据
    //从上下文(context)里面解构出commit
    async categoryList ({ commit }) {
        const res = await getCategoryListAPI()
        if (res.code === 200) {
            //请求成功,把数据提交给mutations
            commit('CATEGORYLIST', res.data)
        }
    },
    // 处理banner数据列表
    async getBannerList ({ commit }) {
        const res = await getBannerListAPI()
        if (res.code === 200) {
            commit('GETBANNERLIST', res.data)
        }
    }
}
const getters = {}

// 暴露仓库 
export default {
    state,
    mutations,
    actions,
    getters
}