import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  copy_vendor_menu_id:"",
  copy_vendor_id:"",
  copy_day:"",
  pageInfo:null,//缓存页面筛选过的信息
  fromPath:"",
}

const mutations = {
  setFromPath(state,path){
    state.fromPath = path;
  },
  setPageInfo(state,pageInfo){
    state.pageInfo = pageInfo;
  },
  removePageInfo(state){
    state.pageInfo = null;
  },
  COPYMENUPARM: (state,param) => {
    state.copy_vendor_menu_id = param.copy_vendor_menu_id;
    state.copy_vendor_id = param.copy_vendor_id;
    state.copy_day = param.copy_day;
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
