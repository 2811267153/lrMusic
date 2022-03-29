const state = {
  searchData: {}
}

const mutations = {
  musicInfo(state, musicInfo){
    this.state.musicInfo = musicInfo
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
