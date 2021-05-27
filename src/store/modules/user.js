import { login, logout,changePwd } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    messageCount:0
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLE_ID: (state, role_id) => {
    state.role_id = role_id
  },
  SET_MSG_COUNT: (state, count) => {
    state.messageCount = count
  } 
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { token,admin_data } = response   
        commit('SET_TOKEN', token)
        commit('SET_ROLE_ID',admin_data.role_id)
        setToken(token)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //user changePwd
  changePwd({ commit, state },payload) {
    return new Promise((resolve, reject) => {
      changePwd({token:state.token,users_id:payload.id,password:payload.password}).then((res) => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        localStorage.removeItem("userName")
        localStorage.removeItem("router")
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout({token:state.token}).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        localStorage.removeItem("userName")
        localStorage.removeItem("router")
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      localStorage.removeItem("userName")
      localStorage.removeItem("router")
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

