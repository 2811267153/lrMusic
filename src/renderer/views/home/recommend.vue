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
        phone: '15337330870',
        password: '1234567890.'
      }
    }
  },
  components: {
    recommendItem,
    recommendSong,
    recommendArtist
  },
  created() {
    // this.getLogin(this.form.phone, this.form.password)
    // this.getLogins('ssss')
    this._getBanner(this.type)
    if (this.isLogin){
      this._getResource()
    }else {
      this._getBoutique(8)
    }
    this._getRecommendSong(20)
    this._gerRecommendArtist(18)
    // getLogin(this.form.phone, this.form.password).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    // getLogin(phone, password){
    //     const data = 'MUSIC_R_T=1561036422261; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1561036422261; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/neapi/feedback;;__remember_me=true; Max-Age=1296000; Expires=Sun, 24 Apr 2022 15:07:40 GMT; Path=/;;MUSIC_A_T=1561035410296; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/wapi/feedback;;MUSIC_A_T=1561035410296; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/api/clientlog;;MUSIC_A_T=1561035410296; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/neapi/feedback;;MUSIC_A_T=1561035410296; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/api/feedback;;MUSIC_SNS=; Max-Age=0; Expires=Sat, 9 Apr 2022 15:07:40 GMT; Path=/;MUSIC_R_T=1561036422261; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/api/clientlog;;MUSIC_A_T=1561035410296; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/wapi/clientlog;;__csrf=2b701c0eedff33f39941f6aa1132dfa1; Max-Age=1296010; Expires=Sun, 24 Apr 2022 15:07:50 GMT; Path=/;;MUSIC_R_T=1561036422261; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/api/feedback;;MUSIC_R_T=1561036422261; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1561035410296; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1561035410296; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/weapi/feedback;;MUSIC_A_T=1561035410296; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1561036422261; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/wapi/feedback;;MUSIC_A_T=1561035410296; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/weapi/clientlog;;MUSIC_U=6456a0328f7313261a023f083460ab3575f789e56f5f1beda7ed4d38a60108091e8907c67206e1ed63ce3bbde0d3e6aacc449b004ace71bf46b14e3f0c3f8af9fe5c85647582a507; Max-Age=1296000; Expires=Sun, 24 Apr 2022 15:07:40 GMT; Path=/;;MUSIC_A_T=1561035410296; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/eapi/feedback;;MUSIC_A_T=1561035410296; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1561036422261; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/weapi/clientlog;;MUSIC_R_T=1561036422261; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1561036422261; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/weapi/feedback;;MUSIC_R_T=1561036422261; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1561036422261; Max-Age=2147483647; Expires=Thu, 27 Apr 2090 18:21:47 GMT; Path=/eapi/feedback;'
    //     this.setCookie(data)
    //     // this.$cookie.set('userInfo', '', 1);
    //   // getLogin(phone, password).then(res => {
    //   // })
    //     // console.log(this.$cookie.get('userInfo'));
    // },
    //
    // setCookie(data){
    //   this.$cookie.set('userInfo',  JSON.stringify(data), 360);
    //   console.log(this.$cookie.get('userInfo'))
    // },
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
