import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({

  strict: process.env.NODE_ENV !== 'production',
  state: {
    addToPlayList: [],
    isLoading: false,
    musicInfo: {}
  },
  mutations: {
    addToPlay(state, playList){
      state.addToPlayList.push(playList)
      console.log(state.addToPlayList)
    },
    musicInfo(state, musicInfo){
      state.musicInfo = musicInfo
    }
  }
})
