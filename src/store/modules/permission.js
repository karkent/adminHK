import 'nprogress/nprogress.css' // progress bar style
import { asyncRoutes, constantRoutes } from '@/router'
/* Layout */
import Layout from '@/layout'
import { getRoleType, getUserName, getAccId } from '@/utils/auth'
import { getRoutes } from '@/api/user'

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
    return new Promise((resolve, reject) => {
      getRoutes({
        username: getUserName(),
        roletype: getRoleType(),
        accid: getAccId()
      }).then(res => {
        asyncRoutes.length = 0
        generaMenu(asyncRoutes, res.routeslist)
        var accessedRoutes = asyncRoutes || []
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
        title: item.label,
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
