import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/qiniu/upload/token', // 假地址 自行替换
    method: 'get'
  })
}

export function getOption(data) {
  return request({
    url: '/data/findAllByPid',
    method: 'post',
    data
  })
}
