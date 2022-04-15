import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: '',
    cur_user: {}
  },
  mutations: {
    setToken(state, token) {
      localStorage.token = token // 同步存储token至localStorage
      state.token = token
    },
    setCurUser(state, cur_user) {
      localStorage.cur_user = cur_user
      state.cur_user = cur_user
    }
  },
  getters: {
    // 获取token方法
    // 判断是否有token, 如果没有就重新赋值， 返回给state的token
    getToken(state) {
      if (!state.token) {
        state.token = localStorage.getItem('token')
      }
      return state.token
    },
    getCurUser(state) {
      if (!state.cur_user) {
        state.cur_user = localStorage.getItem('cur_user')
      }
      return state.cur_user
    },
    tokenNotExist: (state) => {
      console.log(state.token)
      return (state.token === null || state.token === '')
    }
  }
})

export default store