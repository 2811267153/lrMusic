<template>
  <div id="player" v-if="isShow" @click="toPlayer">
    <audio ref="audio" autoplay @timeupdate="timeupdate" :src="url" @playing="playing" @ended="ended"></audio>
    <lr-audio :url="data[currentPlayerIndex].url"/>
    <div class="progress">
      <div class="progress-bar" :style="{ width: value }"></div>
    </div>
    <div class="song-info">
      <div class="bar">
<!--        <el-image class="img" v-if="data[currentPlayerIndex].album" :src="data[1].album.picUrl"/>-->
        <el-image class="img"  :src="data[currentPlayerIndex].picUrl"/>
        <div class="item">
          <span>{{ data[currentPlayerIndex].name }}</span>
          <p >
            <span v-for="item in data[currentPlayerIndex].song.artists">{{ item.name }}</span>
          </p>
        </div>
      </div>
      <div class="controller-icons">
        <i @click.stop="changeClick('Previous')" class="icon iconfont icon-zuo-02"></i>

        <i @click.stop="changeClick('pause')" v-if="player" class="icon iconfont icon-zanting-01"></i>
        <i @click.stop="changeClick('play')" v-else class="icon iconfont icon-bofang-02"></i>
        <i @click.stop="changeClick('next')" class="icon iconfont icon-you-02"></i>
      </div>
      <div class=" bar icons fs">
        <i class="icon iconfont icon-yinliang"></i>
        <i class="icon iconfont icon-yinle-07"></i>
      </div>
    </div>
  </div>
</template>

<script>
import lrAudio from "../components/lr-audio";
import {getSearchUrl} from "../network/search";

export default {

  name: 'player',
  data() {
    return {
      data: [],
      duration: '00:00',
      currentTime: '00:00',
      value: '',
      player: false,
      playList: [],//播放列表
      currentPlayerIndex: 0,
      isShow: false,
      music: {}
    };
  },
  mounted() {
    this.$bus.$on('upData', (data) => {
      this.isShow = true
      this.data = this.$store.state.musicInfo
    });
    document.onkeyup = (event) => {
      // key.preventDefault()
      if (event.code === 'Space') {
        event.preventDefault()
        if (this.player === true) {
          this.$refs.audio.pause();
          this.player = false;
        } else {
          this.player = true;
          this.$refs.audio.play();
        }
      }
    };
  },
  components: {
    lrAudio
  },
  methods: {
    timeupdate() {
      this.currentTime = this.$refs.audio.currentTime;
      this.duration = this.$refs.audio.duration;
      this.value = (this.currentTime / this.duration) * 100 + '%';
      const _data = {}
      _data.info = this.data[1]
      _data.url = this.data[0]
      _data.duration = this.duration
      _data.currentTime = this.currentTime
      this.$store.commit('musicInfos', _data)
      this.$bus.$emit('upCurrentMusic')

      // _data.sName:
    },
    playing() {
      this.player = true
    },
    ended() {
      this.player = false
      this.currentPlayerIndex ++
    },
    toPlayer() {
      this.$router.push({path: '/player'})
    },
    changeClick(type) {
      this.playList = this.$store.state.musicInfo
      switch (type) {
        case 'Previous':
          if (this.playList.length !== 0 && this.currentPlayerIndex <= this.playList.length && this.currentPlayerIndex >= 0) {
            this.currentPlayerIndex > 0 ? this.currentPlayerIndex-- : this.currentPlayerIndex = 0

            this.data[this.currentPlayerIndex] = this.playList[this.currentPlayerIndex]
            this.$refs.audio.play();
          } else {
            this.$message.success('当前播放列表市空的')
          }
          break
        case 'pause':
          this.$refs.audio.pause();
          this.player = false
          break
        case 'play':
          this.$refs.audio.play();
          this.player = true
          break
        case 'next':
          if (this.playList.length !== 0 && this.currentPlayerIndex < this.playList.length - 1) {
            this.currentPlayerIndex ++
            this.data[this.currentPlayerIndex] = this.playList[this.currentPlayerIndex]
            this.$refs.audio.play();

          } else {
            this.$message.success('已经是最后一首歌曲了')
          }
          break
      }
    },

  },
  computed: {
    url(){


      this.music= this.data[this.currentPlayerIndex] // 获取当前正在播放的歌曲
      this.music.currentTime = this.currentTime
      this.music.duration = this.duration
      this.$store.commit('music', this.music)
      if(this.data[this.currentPlayerIndex].url === null){
        this.$message.success('当前歌曲播放链接为空， 即将为你播放下一首歌曲')
        if(this.currentPlayerIndex <= this.data.length){
          this.$refs.audio.pause()
        }else {
          this.$refs.audio.play()
        }

        return null
      }else {
        return  this.data[this.currentPlayerIndex].url
      }
    }
  },
};
</script>

<style scoped>
/* .warp{
  position: fixed;
  bottom: 0;
} */
#player {
  z-index: 10;
  width: 100%;
  height: 60px;
  background-color: #fff;
  box-shadow: 0 0px 10px #ccc;
}

.progress {
  position: relative;
  top: 0;
  width: 100%;
  height: 3px;
  border-radius: 10px;
  /* position: relative; */
  background-color: #ff7300;
}

.progress .progress-bar {
  position: absolute;
  width: 25%;
  height: 100%;
  border-radius: 10px;
  background-color: #fff;
}

.song-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 6px;
}

.bar .img {
  float: left;
  width: 40px;
  height: 40px;
  vertical-align: top;
  border-radius: 5px;
}

.item {
  vertical-align: top;
  /*float: left;*/
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 10px;
  display: inline-block;
}

.item p {
}

.item span {
  font-size: 14px;
  vertical-align: top;
}
.controller-icons{
  text-align: center;
  flex: 1;
}
.item p span {
  font-size: 12px;
}

.controller-icons i {
  margin: 0 10px;
  font-size: 28px;
}

.fs i {
  color: #ccc;
  font-size: 18px;
}

.bar {
  width: 300px;
  overflow: hidden;
}
</style>
