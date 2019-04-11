import Vue from 'vue' // In Dev
import App from './App'
import router from './router'
import i18n from './i18n/'
import ElementUI from 'element-ui' // In Dev
import 'element-ui/lib/theme-chalk/index.css' // In Dev
import './styles/bootstrap.css'
import 'admin-lte/dist/css/AdminLTE.min.css'
import 'admin-lte/dist/css/skins/skin-blue.min.css'
import 'font-awesome/css/font-awesome.min.css'
import store from './store'
import numbro from 'numbro'
import './utils/initEcharts.js'
import req from '@/utils/http/request'
import api from '@/utils/http/api'
import './styles/base.css'

Vue.config.productionTip = false
Vue.prototype.$numbro = numbro

Vue.use(ElementUI) // In Dev

Vue.prototype.$req = req
Vue.prototype.$api = api

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
