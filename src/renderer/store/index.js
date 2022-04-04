import Vue from 'vue'
import Vuex from 'vuex'
import fa from "element-ui/src/locale/lang/fa";
Vue.use(Vuex)

export default new Vuex.Store({

  strict: process.env.NODE_ENV !== 'production',
  state: {
    addToPlayList: [],
    isLoading: false,
  },
  mutations: {
    addToPlay(state, playList){
      state.addToPlayList.push(playList)
      console.log(state.addToPlayList)
    },
  }
})
