//存储token
export const setToken = (token) => {
    // 持久化存储
    localStorage.setItem('TOKEN', token)
}

export const getToken = () => {
    //获取token
    return localStorage.getItem('TOKEN')
}

//清除本地存储的token
export const removeToken = () => {
    localStorage.removeItem("TOKEN")
}