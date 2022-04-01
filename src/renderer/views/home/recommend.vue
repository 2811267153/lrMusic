<template>
  <div>
    <el-carousel indicator-position="none" class="banner" :interval="4000" type="card" height="250">
      <el-carousel-item v-for="item in banners" :key="item.id">
        <a :href="item.url">
          <img :src="item.imageUrl" alt="">
        </a>
      </el-carousel-item>
    </el-carousel>
    <recommend-item v-if="!isLogin" :recommend-data="recommendData"></recommend-item>
    <recommend-item v-else :recommend-data="recommendData"></recommend-item>
    <recommend-song :recommend-song="recommendSong"></recommend-song>
    <recommend-artist :recommend-artist="recommendArtist"></recommend-artist>
  </div>
</template>

<script>
import recommendItem from "./recommendItem";
import recommendSong from "./recommendSong";
import recommendArtist from "./recommendArtist";

import {getBanner, getResource, getLogin, getBoutique,getRecommendSong, getRecommendArtist} from "../../network/home.js";

export default {
  name: "recommend",
  data(){
    return{
      isLogin: false,
      type: 0,
      banners: [],
      recommendArtist: [],
      recommendData: [],
      recommendSong: [],
      form: {
        phone: '17572696252',
        password: 'xybwdhxd0422'
      }
    }
  },
  components: {
    recommendItem,
    recommendSong,
    recommendArtist
  },
  created() {
    this.getLogin(this.form.phone, this.form.password)
    this._getBanner(this.type)
    if (this.isLogin){
      this._getResource()
    }else {
      this._getBoutique(8)
    }
    this._getRecommendSong(20)
    this._gerRecommendArtist(18)
    getLogin(this.form.phone, this.form.password).then(res => {
    })
  },
  methods: {
    getLogin(phone, password){
      getLogin(phone, password).then(res => {
        console.log(res)
      })
    },
    _getBanner(type){
      getBanner(type).then(res => {
        this.banners =res.data.banners
      })
    },
    _getResource(){
      getResource().then( res => {
        this.recommendData =res.data.recommend
      })
    },
    _getBoutique(limit){
      getBoutique(limit).then(res => {
        this.recommendData = res.data.playlists
      })
    },
    _getRecommendSong(limit){
      getRecommendSong(limit).then(res => {
        this.recommendSong = res.data.result
      })
    },
    _gerRecommendArtist(limit){
      getRecommendArtist(limit).then(res => {
        this.recommendArtist = res.data.artists
      })
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.banner img {
  width: 100%;
  height: 100%;
}

</style>
