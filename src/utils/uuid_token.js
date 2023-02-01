//引入uuid
import { v4 as uuidv4 } from 'uuid';
// 生成随机字符串，并且每次执行不能发生变化，保证游客身份持久化
export const getUUID = () => {
    // 存储在本地
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //    如果没有
    if (!uuid_token) {
        // 生成游客临时身份
        uuid_token = uuidv4()
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    // 一定要返回uuid_token【函数返回值】
    return uuid_token
}