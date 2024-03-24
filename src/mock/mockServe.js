// 引入mockjs模块
import Mock from "mockjs";

// 引入json模拟数据
// webpack默认对外暴露的：图片，JSON格式数据。所以不需要对外暴露也能引入
import banner from './banner.json'
import floor from './floor.json'

// mock数据:第一个参数：请求的地址  第二个参数：请求数据
Mock.mock('/mock/banner', { code: 200, data: banner }) // 模拟首页轮播图数据
Mock.mock('/mock/floor', { code: 200, data: floor })