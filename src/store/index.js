import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    pageInfo:null,//缓存页面筛选过的信息
  },
  mutations:{
    setPageInfo(state,pageInfo){
      state.pageInfo = pageInfo;
    },
    removePageInfo(state){
      state.pageInfo = null;
    },
  },
  modules: {
    app,
    settings,
    user
  },
  getters
})

export default store
