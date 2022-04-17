<template>
  <div class="recommend-music">
    <h2>最新音乐</h2>
    <div id="songList_warp">
      <div class="songList-item" @click="toPlayer(item)" @dblclick="addToPlay(item)" v-for="item in recommendSong"
           :key="item.id">
        <el-image class="item-img" :src="item.picUrl"></el-image>
        <div class="mask"><i class="icon iconfont icon-bofang-01"></i></div>
        <div class="song-info">
          <p>{{ item.name }}</p>
          <p>专辑: <i class="icon iconfont icon-zhuanji"></i>{{ item.song.album.name }}</p>
          <p><span v-for="artist in item.song.artists" :key="artist.name">{{ artist.name }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getSearchUrl} from "../../network/search";

export default {
  name: "recommendSong",
  props: {
    recommendSong: {
      type: Array,
      default() {
        return {
          timer: ''
        }
      }
    }
  },
  methods: {
    toPlayer(item) {
      if (this.timer) {
        this.timer = null
      }
      this.timer = setTimeout(() => {
        getSearchUrl(item.id).then(res => {
          item.url = res.data.data[0].url
        }).catch(e => {
          this.$message({
            message: e
          })
        })
        this.$bus.$emit('upData')
        this.$store.commit('musicInfo', item)
      }, 300)

    },
  }

}
</script>

<style scoped>
.recommend-music h2 {
  padding-top: 20px;
  font-size: 21px;
}

#songList_warp {
  display: grid;
  /*flex-wrap: wrap;*/
  grid-template-columns:1fr 1fr;
  justify-content: space-between;

}

.songList-item {
  position: relative;
  padding: 0 10px 0 0;
  /*width: 30%;*/
  display: grid;
  margin: 10px 20px;
  grid-template-columns: 200px auto;
  overflow: hidden;
  border-radius: 10px;
  background-color: #f2f2f2;
}

.item-img {
  vertical-align: bottom;
  height: 150px;
  width: 200px;
}

.song-info {
  padding-left: 10px;
  align-self: end;
  /*float: right;*/
  width: 190px;
  flex: 1;

}

.song-info p {
  margin: 5px 0;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;
}

.song-info span {
  margin-right: 10px;
}

.song-info i {
  color: #ccc;
  margin: 0 5px;
}

.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 200px;
  text-align: center;
  line-height: 150px;
  /*background-color: #fff;*/
  height: 150px;
}

.mask i {
  font-size: 0px;
  color: var(--active-c);
}

.songList-item:hover {
  box-shadow: 0 0 15px #ccc;
}

.songList-item:hover .mask {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.songList-item:hover .mask i {
  font-size: 60px;
}
</style>
