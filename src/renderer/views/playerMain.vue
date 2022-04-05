<template>
  <div id="player">
    <div class="player-body">
      <div class="player-info">
        {{getKeyArr}}
        <audio :src="musicInfo.url" @timeupdate="timeupdate"  ref="audio" ></audio>
        <p>{{musicInfo.info.name}}</p>
        <p class="artists"><span v-for="item in musicInfo.info.song.artists">{{item.name}}</span></p>
        <img :src="musicInfo.info.picUrl" alt="">


        <div class="music-btn">
aa

        </div>
        <div class="controller-warp">
          <div class="currentTime">{{((currentTime ) * 1000) | rounding}}</div>
          <div class="controller">
            <el-progress :percentage="(currentTime / musicInfo.duration) * 100" color="#ea4c89" :show-text="false"></el-progress>
          </div>
          <div class="duration">{{((musicInfo.duration) * 1000) | rounding}}</div>
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
import {getSongLyric} from "../network/home";
import {formatTime} from "../util";
export default {
  name: "playerMain",
  data(){
    return {
      musicInfo: {},
      lrc: {},
      currentTime: 0,
      KeyArr: []
    }
  },
  created() {
    this.musicInfo = this.$store.state.musicInfo
    console.log(this.musicInfo)
    this._getSongLyric(this.musicInfo.info.id)
  },
  mounted() {
    this.$refs.audio.currentTime =  this.musicInfo.currentTime
    this.$refs.audio.play()
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
            // console.log( time +'----------' +lycObj[time])
            this.lrc = lycObj

          }
        }
      }).catch(e => {
        console.log(e)
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
  filters: {

    rounding(value){
      console.log(value)
      return  formatTime(value)
  }
}}
</script>

<style scoped>
#player {
  height: calc(100vh - 90px);
  overflow: hidden;
}
.nav-top {
  padding: 15px 20px ;
  box-shadow: 0 0 15px #ccc;
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
</style>