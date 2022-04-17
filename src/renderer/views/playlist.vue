<template>
  <div id="playlist">
    <p class="nav-title">当前正在播放的歌曲列表</p>
    <div class="player-list-warp">
      <div class="player-list-item" v-for="(item, i) in data">
        <div class="item-l">
          <span>{{i + 1}}</span>
          <el-image class="el-img" :src="item.picUrl" :lazy="true"></el-image>
          <span class="name">{{ item.name }}</span>
        </div>
        <div class="item-info">
          <p>{{item.alg}}</p>
        </div>
        <div class="item-r">
          <p><span v-for="artists in item.song.artists">{{artists.name}}</span></p>
          <span >{{Number(item.duration) * 1000 | rounding}}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import songItem from "./home/song-item";
import {formatTime} from "../util";
export default {
  name: "playlist",
  components: {
    songItem
  },
  data(){
    return{
      data: []
    }
  },
  mounted() {
    this.timer = setTimeout( () => {
      this.data = this.$store.state.musicInfo
      console.log(this.data)
    }, 100)
  },
  filters: {
    rounding(value){
      console.log(value)
      return formatTime(value);
    }
  }
}
</script>

<style scoped>
.nav-title{
  display: inline;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 15px 10px;
}

.player-list-item{
  font-size: 12px;
  box-shadow: 0 0 15px #f2f2f2;
  margin: 20px 0;
  border-radius: 10px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  color: #cccccc;
  align-items: center;
}
.item-info, .item-r{
  width: 190px;
  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;
}
.item-l .el-img{
  width: 100px;
  height: 100px;
  border-radius: 10px;
  vertical-align: middle;
  margin: 0 20px;
}
.item-info span{
  display: inline-block;
  width: 40px;
  text-align: center;
  vertical-align: middle;
}
.item-l{
  flex: 1;
}

.item-info .name{
  width: 350px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}
</style>
