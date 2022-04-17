<template>
  <div id="player">
    <div class="player-body">
      <div class="player-info">
        {{getKeyArr}}
        <audio :src="musicInfo.url"  ref="audio" ></audio>
        <p>{{musicInfo.name}}</p>
        <img :src="musicInfo.picUrl" alt="">
        <div class="music-btn">
        </div>
        <div class="blank"></div>
        <div class="controller-warp">
          <div class="currentTime">{{((currentTime ) * 1000) | rounding}}</div>
          <div class="controller">
            <el-progress :percentage="(currentTime / musicInfo.duration) * 100" color="#ea4c89" class="progress" :show-text="false"></el-progress>
          </div>
          <div class="duration">{{((musicInfo.duration) * 1000) | rounding}}</div>
        </div>
        <div class="btn-controller">
          <i @click="_getRecSongs(musicInfo.info.id, '', musicInfo.info.id)" class="icon iconfont icon-icon_xindong"></i>
          <i class="icon iconfont icon-xiazai"></i>
          <i @click="_getCloudSongs" class="icon iconfont icon-yunpan"></i>
        </div>
      </div>
      <div class="player-lyrics">
        <div class="lrc-container"  ref="player">
          <p  :class="{active: (parseInt(currentTime) >= KeyArr[value]) && (parseInt(currentTime) < KeyArr[value + 1] )}" v-for="(key, i, value) in lrc">
            {{key}}  {{ srcoolLrc(i, value) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCloudSongs, getRecSongs, getSongLyric} from "../network/home";
import {formatTime} from "../util";
export default {
  name: "playerMain",
  data(){
    return {
      musicInfo:[],
      lrc: {},
      currentTime: 0,
      KeyArr: []
    }
  },
  created() {
    this.musicInfo = this.$store.state.music
    console.log(this.musicInfo)
    this._getSongLyric(this.musicInfo.id)
    setInterval(() => {
      this.currentTime = this.$store.state.music.currentTime
      this.duration = this.$store.state.musicInfo.duration
    }, 100)
  },

  methods: {
    goBack(){
      this.$router.back()
    },
    _getSongLyric(id){
      getSongLyric(id).then(res => {
        const lyric = res.data.lrc.lyric.split('\n');
        let lycObj ={}
        for (let i = 0; i < lyric.length; i++){
          let lyr = decodeURIComponent(lyric[i])
          let timeReg = /\[\d*:\d*(([.:])\d*)*]/g;
          let timeRegExpArr = lyr.match(timeReg)
          if(!timeRegExpArr)continue;
          let claue = lyr.replace(timeReg, '');
          for(let k = 0, h = timeRegExpArr.length; k  <  h;  k ++){
            let t = timeRegExpArr[k]
            let min = Number(String(t.match(/\[\d*/i)).slice(1))
            let sec = Number(String(t.match(/\:\d*/i)).slice(1))
            let time = min * 60 + sec
            lycObj[time] = claue
            this.lrc = lycObj

          }
        }
      }).catch(e => {
        this.$message.error('请求失败 请重试');
      })
    },

    _getRecSongs(id,pid, sid){
      getRecSongs(id,pid, sid).then(res => {
        console.log(res)
      }).catch(e => {})
    },
    _getCloudSongs(){
      getCloudSongs().then(res => {
        // console.log(res)
      })
    },
    timeupdate(){
      this.currentTime = this.$refs.audio.currentTime;
    },
    srcoolLrc(key, i){
      const lrcDiv = this.$refs.player
      if(key < this.currentTime && key > this.currentTime - (this.KeyArr[i + 1] - this.KeyArr[i])){
        lrcDiv.style.top = -((i - 2) *30) + 'px'
      }
    }
  },
  computed: {
    getKeyArr(){
      for (let i in this.lrc){
        this.KeyArr.push(i)
      }
    },
    rounding(){
      return (this.currentTime)
    }
  },
  mounted() {
    //监听歌曲是否发生更改 如果发生更改 则更新页面数据
    this.$bus.$on('upCurrentMusic', () => {
      this.musicInfo = this.$store.state.music
      this._getSongLyric(this.musicInfo.id)

    })
  },

  filters: {
    rounding(value){
      return  formatTime(value)
  },
}}
</script>

<style scoped>
#player {
  height: calc(100vh - 90px);
  overflow: hidden;
}
.nav-top span{
  cursor: pointer;
}
.nav-top span:hover{
  color: var(--active-c);
}
.player-body{
  display: flex;
  justify-content: space-between;
  padding: 50px;
  width: 100%;
}
.player-body > div{
  flex: 1;
  height: 500px;
}
.player-body .player-info{
  text-align: center;
}
.player-info .artists {
  margin: 10px 0;
}
.player-info .artists span{
  margin: 20px 10px;
}
.player-info img{
  width: 300px;
  height: 350px;
  border-radius: 20px;
}
.player-lyrics {
  position: relative;
  padding: 50px 0;
  overflow: auto;
  text-align: center;
}
.player-lyrics p{
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.active{
  color: var(--active-c);
}
.lrc-container{
  padding: 50px 0;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
.player-info .controller-warp{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.controller-warp, .currentTime, .duration{
  width: 50px;
}
.controller-warp .controller {
  flex: 1;
  padding:0 40px;
}
.music-btn {
  margin: 20px 0;
}
.progress {
  height: 3px;
}
.blank {
  height: 20px;
}
.btn-controller{
  display: flex;
  margin-top: 20px;
  justify-content: space-evenly;
}
.btn-controller i{
  font-size: 25px;
  width: 30%;
  text-align: center;
}
</style>