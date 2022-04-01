import { login, logout, getInfo } from '@/api/user'
import {
  getToken,
  setToken,
  removeToken,
  getUserName,
  setUserName,
  removeUserName,
  getRoleType,
  setRoleType,
  removeRoleType,
  setAccId,
  removeAccId,
  getAccId,
  getHospitalId,
  setHospitalId,
  removeHospitalId,
  getName,
  setName,
  removeName,
  getHospitalName,
  setHospitalName,
  removeHospitalName
} from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: getName(),
  avatar: '',
  introduction: '',
  roles: [],
  username: getUserName(),
  roletype: getRoleType(),
  accid: getAccId(),
  hospitalid: getHospitalId(),
  hospitalname: getHospitalName()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ROLETYPE: (state, roletype) => {
    state.roletype = roletype
  },
  SET_ACCID: (state, accid) => {
    state.accid = accid
  },
  SET_HOSPITALID: (state, hospitalid) => {
    state.accid = hospitalid
  },
  SET_HOSPITALNAME: (state, hospitalname) => {
    state.hospitalname = hospitalname
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        // const { data } = response
        commit('SET_TOKEN', response.token)
        commit('SET_USERNAME', response.username)
        commit('SET_ROLETYPE', response.roletype)
        commit('SET_ACCID', response.accid)
        commit('SET_HOSPITALID', response.hospitalid)
        commit('SET_NAME', response.name)
        commit('SET_HOSPITALNAME', response.hospitalName)
        setToken(response.token)
        setUserName(response.username)
        setRoleType(response.roletype)
        setAccId(response.accid)
        setHospitalId(response.hospitalid)
        setName(response.name)
        setHospitalName(response.hospitalName)

        resolve() // 执行这条代码，会跳到login\index文件的handleLogin.then中
        // commit('SET_TOKEN', response.token)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo({
        token: state.token,
        username: state.username,
        roletype: state.roletype,
        accid: state.accid
      }).then(response => {
        // if (!response.roles || response.roles.length <= 0) {
        //   reject('getInfo: roles must be a non-null array!')
        // }
        commit('SET_ROLES', response.roles)
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', response.avatar)
        // commit('SET_INTRODUCTION', introduction)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_ROLETYPE', '')
        commit('SET_ACCID', '')
        commit('SET_HOSPITALID', '')
        commit('SET_NAME', '')
        commit('SET_HOSPITALNAME', '')

        removeToken()
        removeRoleType()
        removeUserName()
        removeAccId()
        removeHospitalId()
        removeName()
        removeHospitalName()
        resetRouter()
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
