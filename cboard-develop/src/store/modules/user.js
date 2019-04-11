import req from '@/utils/http/request'
import api from '@/utils/http/api'

const state = {
  users: [],
  roles: [],
  userRoleList: []
}

const getters = {
  userList ({users}) {
    return users
  },
  roleList ({roles}) {
    return roles
  }
}

const mutations = {
  setUserList (state, data) {
    state.users = data
  },
  setRoleList (state, data) {
    state.roles = data
  }
}

const actions = {
  getUserList ({commit}) {
    req.get(api.getUserList)
      .then(({data: {data}}) => {
        data.forEach(item => {
          Object.assign(item, {
            selected: false,
            show: true,
            $id: item.userId,
            $name: `${item.loginName}(${item.userName})`
          })
        })
        commit('setUserList', data)
      })
      .catch((err) => console.log(err))
  },
  getRoleList ({commit}) {
    req.get(api.getRoleList)
      .then(({data: {data}}) => {
        data.forEach(item => {
          Object.assign(item, {
            selected: false,
            show: true,
            $id: item.roleId,
            $name: item.roleName
          })
        })
        commit('setRoleList', data)
      })
      .catch((err) => console.log(err))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
