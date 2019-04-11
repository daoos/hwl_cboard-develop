import req from '@/utils/http/request'
import api from '@/utils/http/api'

const state = {
  widgetListUser: [],
  datasetListUser: []
}
const mutations = {
  setWidgetListUser (state, widgetListUser) {
    state.widgetListUser = widgetListUser
  },
  setDatasetListUser (state, datasetListUser) {
    state.datasetListUser = datasetListUser
  }
}
const actions = {
  getWidgetListUser ({commit}) {
    return new Promise((resolve, reject) => {
      req.get(api.getWidgetListUser)
        .then(({data}) => {
          const widgetListUser = formatData(data.data)
          commit('setWidgetListUser', widgetListUser)
          console.log('getWidgetListUser')
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },
  getDatasetListUser ({commit}) {
    return new Promise((resolve, reject) => {
      req.get(api.getDatasetListUser)
        .then(({data}) => {
          const datasetListUser = formatData(data.data)
          commit('setDatasetListUser', datasetListUser)
          console.log('getDatasetListUser')
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  }
}
const getters = {}

function formatData (data) {
  return data
}
export default {
  namespace: true,
  state,
  mutations,
  actions,
  getters
}
