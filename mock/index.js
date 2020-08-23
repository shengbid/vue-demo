import Mock from 'mockjs'
import list from './list'

const info = [
  ...list
]

for (const item of info) {
  Mock.mock(item.url, item.type || 'get', item.response)
}