import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/test/getLogin',
    method: 'post',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/test/getInfo',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/test/logout',
    method: 'post'
  })
}

export function getRoutes(data) {
  return request({
    url: '/test/getRoutes',
    method: 'post',
    data
  })
}
