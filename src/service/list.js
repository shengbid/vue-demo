import request from '@/utils/request'

export const getClassify = () => {
  return request({
    url: '/get/classify/list',
    method: 'get'
  })
}