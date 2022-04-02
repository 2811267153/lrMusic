const state = {
  addToPlay: []
}

const mutations = {
  addToPlay(state, playList){
    this.state.addToPlay = playList
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  addToPlay(context, playList){
    context.commit('addToPlay', playList)
  }
}

export default {
  state,
  mutations,
  actions
}
