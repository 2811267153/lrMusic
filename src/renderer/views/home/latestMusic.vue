<template>
  <div class="nav-type">
    <nav>
      <div class="btn-warp">
        <button v-for="(item, i) in nav" :class="{active: currentIndex === i}" @click="getData(item, i)"> {{item}}</button>
      </div>
      <div class="nav-types">
        <div class="nav-l" ><button :class="{navActive: navCurrentIndex === index}" v-for="(item, index) in type" @click="getNewSong(item.label, index)">{{item.value}}</button></div>
        <div class="nav-r"><button>全部播放</button></div>
      </div>
    </nav>
<!--    <div id="song-item">-->
<!--      <div class="song-item" v-for="(item, index) in newSongData">-->
<!--        <div class="item-l">-->
<!--          <span>{{index + 1}}</span>-->
<!--          <img :src="item.album.blurPicUrl" alt="">-->
<!--          <span class="name">{{item.name}}</span>-->
<!--        </div>-->
<!--        <div class="item-info">-->
<!--          <p >-->
<!--            <span v-for="artists in item.artists">{{artists.name}}</span>-->
<!--          </p>-->
<!--        </div>-->
<!--        <div class="item-r">-->
<!--          <a><i>{{item.album.name}}</i></a>-->
<!--          <span>{{item.duration | rounding }}</span>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <song-item :new-song-data="newSongData"></song-item>
  </div>
</template>

<script>
import {getNewSong} from "../../network/home";
import {formatTime} from "../../util";
import songItem from "./song-item";
export default {
  name: "latestMusic",
  data() {
    return {
      nav: ['新歌速递', '新碟上架'],
      currentIndex: 0,
      navCurrentIndex: 0,
      type: [
        {label: '0', value: '全部'},
        {label: '7', value: '华语'},
        {label: '96', value: '欧美'},
        {label: '8', value: '日本'},
        {label: '16', value: '韩国'},
      ],
      newSongData: []
    }
  },
  created() {
    this.getNewSong(this.type[0].label)
  },
  components: {
    songItem
  },
  methods: {
    getData(item, i){
      this.currentIndex = i
    },
    getNewSong(label, index){
      this.navCurrentIndex = index
      getNewSong(label).then(res => {
        this.newSongData = res.data.data
      }).catch(e => {
        console.log(e)
      })
    },
  },

}
</script>

<style scoped>
nav{
  text-align: center;
}
.btn-warp{
  border: 4px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  display: inline-block;
  height: 47px;
  background-color: #f2f2f2;
}
nav button {
  float: left;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #fff;
  border: none;
}
.active{
  color: #f2f2f2;
  background-color: var(--active-c);
}
.nav-types{
  text-align: left;
  display: flex;
}
.nav-l{
  flex: 1;
}
.nav-r button {
  color: #f2f2f2;
  padding: 10px 15px;
  background-color: var(--active-c);
}
.navActive{
  color: var(--active-c);
}
</style>
