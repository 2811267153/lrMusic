<template>
  <div id="player" @click="toPlayer">
    <audio ref="audio" autoplay @timeupdate="timeupdate" :src="data[0]" @playing="playing" @ended="ended"></audio>
    <lr-audio :url="data[0]"/>
    <div class="progress">
      <div class="progress-bar" :style="{ width: value }"></div>
    </div>
    <div class="song-info">
      <div class="bar">
                <el-image class="img" v-if="data[1].album" :src="data[1].album.picUrl"/>
                <el-image class="img" v-else :src="data[1].al.picUrl"/>
        <div class="item">
          <span>{{ data[1].name }}</span>
          <p v-if="data[1].ar">
            <span v-for="item in data[1].ar " :key="item.name">{{ item.name }}</span>
          </p>
          <p v-else>
            <span v-for="item in data[1].artists">{{ item.name }} dd</span>
          </p>
        </div>
      </div>
      <div class="icons">
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
      data: ['', {}],
      duration: '00:00',
      currentTime: '00:00',
      value: '',
      player: false,
      playList: [],//播放列表
      currentPlayerIndex: 0
    };
  },
  mounted() {
    this.$bus.$on('upData', (data) => {
      console.log(data)
      this.data[1] = data
      this.$store.commit('musicInfo', data)
      getSearchUrl(data.id).then(res => {
        console.log(res)
        res.data.data[0].url === null ? this.$message.error('歌曲链接为空，播放失败') : this.data[0] = res.data.data[0].url
      }).catch(e => {
        this.$message({
          message: e
        })
      })
      // this.data = data
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
      // const [1] = [this.data]
      _data.info = this.data[1]
      _data.url = this.data[0]
      _data.duration = this.duration
      _data.currentTime = this.currentTime
      this.$store.commit('musicInfo', _data)
      // _data.sName:
    },
    playing() {
      this.player = true
    },
    ended() {
      this.player = false
      console.log(this.$store.state.addToPlayList);
      if (this.$store.state.addToPlayList.length !== 0) {
        this.playList = this.$store.state.addToPlayList
        //首先判断如何进入的播放列表
        if (this.currentPlayerIndex >= 0 && this.currentPlayerIndex <= this.playList.length) {
          this.data = this.playList[this.currentPlayerIndex]
          this.currentPlayerIndex++
        }
      } else {
        this.currentPlayerIndex = 0
      }
    },
    toPlayer() {
      this.$router.push({path: '/player'})
    },
    changeClick(type) {
      this.playList = this.$store.state.addToPlayList
      console.log(type)
      switch (type) {
        case 'Previous':

          if (this.playList.length !== 0 && this.currentPlayerIndex <= this.playList.length && this.currentPlayerIndex >= 0) {
            this.currentPlayerIndex > 0 ? this.currentPlayerIndex-- : this.currentPlayerIndex = 0
            console.log(this.currentPlayerIndex)

            this.data = this.playList[this.currentPlayerIndex]
            this.$refs.audio.play();
          } else {
            this.$message.error('当前播放列表市空的')
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
            this.currentPlayerIndex++
            console.log(this.currentPlayerIndex)
            this.data = this.playList[this.currentPlayerIndex]
            this.$refs.audio.play();

          } else {
            this.$message.error('当前播放列表市空的')
          }
          break
      }
    }
  },
  computed: {
    songs() {
      return this.data[1].song.artists || this.data[1].ar
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
  /*overflow: hidden;*/
  /* position: relative; */
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

.item p span {
  font-size: 12px;
}

.icons i {
  margin: 0 10px;
  font-size: 28px;
}

.fs i {
  color: #ccc;
  font-size: 18px;
}

.bar {
  max-width: 300px;
}
</style>
