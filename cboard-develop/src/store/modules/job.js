import req from '@/utils/http/request'
import api from '@/utils/http/api'
import format from '@/utils/formatTime'

const state = {
  jobData: []
}

const getters = {}
const mutations = {
  setJobData (state, jobData) {
    state.jobData = jobData
  }
}

const actions = {
  getJobData ({ commit }) {
    return new Promise((resolve, reject) => {
      req.get(api.getJobList)
        .then(({ data }) => {
          const jobData = formatData(data.data)
          commit('setJobData', jobData)
          console.log('getJobData', data)
          resolve()
        }).catch((error) => {
          reject(error)
        })
    })
  },
  saveJob ({commit, dispatch}, jobData) {
    console.log('saveJob', jobData)
    return new Promise((resolve, reject) => {
      req.post(api.saveJob, jobData)
        .then(({data}) => {
          dispatch('getJobData')
          resolve()
        }).catch((error) => {
          reject(error)
        })
    })
  },
  updateJob ({commit, dispatch}, jobData) {
    console.log('updateJob', jobData)
    return new Promise((resolve, reject) => {
      req.post(api.updateJob, jobData)
        .then(({data}) => {
          dispatch('getJobData')
          resolve()
        }).catch((error) => {
          reject(error)
        })
    })
  },
  deleteJob ({commit, dispatch}, deleteItem) {
    console.log('deleteJob', deleteItem)
    return new Promise((resolve, reject) => {
      req.get(`${api.deleteJob}?id=${deleteItem}`)
        .then(({data}) => {
          dispatch('getJobData')
          resolve()
        }).catch((error) => {
          reject(error)
        })
    })
  }
}
function formatData (list) {
  list.forEach(item => {
    item.daterange = `${format.formatDate(item.daterange.startDate)}~${format.formatDate(item.daterange.endDate)}`
    item.lastExecTime = `${format.formatDate(item.lastExecTime)} ${format.formatTime(item.lastExecTime)}`
    item.jobStatus = formatStatus(item.jobStatus)
  })
  return list
}
function formatStatus (status) {
  let jobStatus
  switch (status) {
    case 0: {
      jobStatus = '失败'
      break
    }
    case 1: {
      jobStatus = '处理中'
      break
    }
    case 2: {
      jobStatus = '成功'
      break
    }
    default: {
      jobStatus = 'N/A'
      break
    }
  }
  return jobStatus
}

export default {
  namespace: true,
  state,
  getters,
  mutations,
  actions
}
