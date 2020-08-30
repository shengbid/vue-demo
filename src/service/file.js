import request from '@/utils/request'

export const getFileList = () => {
  return request({
    url: '/get/file/list',
    method: 'get'
  })
}