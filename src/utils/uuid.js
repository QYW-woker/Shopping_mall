// 封装游客身份模块-》生成一个UUID
// 导入uuid方法
import { v4 as uuidv4 } from 'uuid'
// 生成一个随机字符串，且每次执行不能发生变化，ID持久化存储
export const getUUID = () => {
  // 1. 先从本地存储获取uuid(查看本地有无ID)
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 2. 本地没有的话生成uuid
  if (!uuid_token) {
    // 生成游客临时身份
    uuid_token = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  return uuid_token
}