import Mock from 'mockjs'
import list from './list'
import upload from './upload'

const info = [
  ...list,
  ...upload
]

for (const item of info) {
  // 使用正则处理url带参数情况
  Mock.mock(new RegExp(item.url), item.type || 'get', item.response)
}