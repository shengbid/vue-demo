import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else {
      return Promise.reject(new Error(res.message || 'error'))
    }
  },
  error => {
    Message.error(error.message)
    return Promise.reject(error)
  }
)

export default service