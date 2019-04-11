import Vue from 'vue'
import Vuex from 'vuex'
import dashboard from './modules/dashboard'
import menu from './modules/menu'
import config from './modules/config'
import params from './modules/params'
import widget from './modules/widget'
import job from './modules/job'
import user from './modules/user'
import role from './modules/role'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dashboard,
    menu,
    config,
    params,
    widget,
    job,
    user,
    role
  }
})
