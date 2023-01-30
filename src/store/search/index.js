import { getSearchInfoAPI } from "@/api"
//Search组件的小仓库
const state = {
    //search模块的数据
    SearchList: {}
}
const mutations = {
    // 处理search模块数据
    GETSEARCHLIST (state, value) {
        state.SearchList = value
    }
}
const actions = {
    // 获取search模块数据
    async getSearchList ({ commit }, value = {}) {
        // value形参：是用户派发action时的第二个参数传进来的，至少是一个空对象
        const res = await getSearchInfoAPI(value)
        if (res.code === 200) {
            commit('GETSEARCHLIST', res.data)
        }

    }
}
//计算属性：在项目中是为了简化仓库中的数据
// 可以把在组件中需要用到的数据简化一下【这样在组件获取数据时就方便了】
const getters = {
    // state是当前仓库的state，并不是大仓库的state
    goodsList (state) {
        // 这样书写是有问题的，因为当前组件的state有两种状态{}【空对象，此时返回undefined】、服务器返回的数据
        // 假如网络不好||没有网，state.SearchList.goodsList会返回undefined
        // 但是该属性在其他组件需要遍历，所以至少是一个数组
        return state.SearchList.goodsList || []
    },
    attrsList (state) {
        return state.SearchList.attrsList || []
    },
    trademark (state) {
        return state.SearchList.trademark || []
    }
}

// 暴露仓库
export default {
    state,
    mutations,
    actions,
    getters
}