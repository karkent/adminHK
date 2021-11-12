import 'nprogress/nprogress.css' // progress bar style
import { asyncRoutes, constantRoutes } from '@/router'
import request from '../../utils/request'
/* Layout */
import Layout from '@/layout'
import { getToken } from '@/utils/auth'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    console.log('获取账号信息：' + getToken())
    console.log('state.token信息：' + state.token)
    return new Promise(resolve => {
      request.post('/test/getRoutes', {
        acc: getToken()
      }).then(res => {
        console.log('根据账号信息，返回权限表')
        console.log(res)
        console.log('加入前')
        console.log(asyncRoutes)
        console.log('打印返回的list')
        console.log(res)
        // var array = [
        //   {
        //     path: '/postSaleManage',
        //     component: 'Layout',
        //     children: [
        //       {
        //         path: 'index',
        //         component: '/postSaleManage/index',
        //         name: 'PostSaleManage',
        //         title: '售后管理',
        //         icon: 'list'
        //       }
        //     ],
        //     title: '售后管理',
        //     icon: 'list'
        //   },
        //   {
        //     path: '/documentation',
        //     component: 'Layout',
        //     children: [
        //       {
        //         path: 'index',
        //         component: '/documentation/index',
        //         name: 'Documentation',
        //         title: '文档',
        //         icon: 'documentation'
        //       }
        //     ],
        //     title: '文档',
        //     icon: 'documentation'
        //   },
        //   {
        //     path: '/nested',
        //     component: 'Layout',
        //     redirect: '/nested/menu1/menu1-1',
        //     name: 'Nested',
        //     title: 'nested',
        //     icon: 'nested',
        //     children: [
        //       {
        //         path: 'menu1',
        //         component: '/nested/menu1/index', // Parent router-view
        //         name: 'Menu1',
        //         redirect: '/nested/menu1/menu1-1',
        //         title: 'menu1',
        //         children: [
        //           {
        //             path: 'menu1-1',
        //             component: '/nested/menu1/menu1-1',
        //             name: 'Menu1-1',
        //             title: 'menu1-1'
        //           },
        //           {
        //             path: 'menu1-2',
        //             component: '/nested/menu1/menu1-2',
        //             name: 'Menu1-2',
        //             redirect: '/nested/menu1/menu1-2/menu1-2-1',
        //             title: 'menu1-2',
        //             children: [
        //               {
        //                 path: 'menu1-2-1',
        //                 component: '/nested/menu1/menu1-2/menu1-2-1',
        //                 name: 'Menu1-2-1',
        //                 title: 'menu1-2-1'
        //               },
        //               {
        //                 path: 'menu1-2-2',
        //                 component: '/nested/menu1/menu1-2/menu1-2-2',
        //                 name: 'Menu1-2-2',
        //                 title: 'menu1-2-2'
        //               }
        //             ]
        //           },
        //           {
        //             path: 'menu1-3',
        //             component: '/nested/menu1/menu1-3',
        //             name: 'Menu1-3',
        //             title: 'menu1-3'
        //           }
        //         ]
        //       },
        //       {
        //         path: 'menu2',
        //         name: 'Menu2',
        //         component: '/nested/menu2/index',
        //         title: 'menu2'
        //       }
        //     ]
        //   }
        // ]
        asyncRoutes.length = 0
        const loadMenuData = []
        Object.assign(loadMenuData, res)
        generaMenu(asyncRoutes, loadMenuData)
        var accessedRoutes = asyncRoutes || []
        console.log('加入后的asyncRoutes')
        console.log(asyncRoutes)

        console.log('加入后的accessedRoutes')
        console.log(accessedRoutes)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
      // if (roles.includes('admin')) {
      //
      // } else {
      //   console.log('如果不是admin')
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
    })
  }
}

export function generaMenu(routes, data) {
  data.forEach(item => {
    const menu = {
      path: item.path,
      noRedirect: 'noRedirect',
      component: item.component === 'Layout' ? Layout : (resolve) => require([`@/views${item.component}`], resolve),
      children: [],
      name: item.rname,
      meta: {
        title: item.title,
        icon: item.icon
      }
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
