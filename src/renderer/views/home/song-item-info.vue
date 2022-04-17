<template>
  <div class="song-item"  @click="toPlayer(item)" @dblclick="addToPlay(item)">
    <div class="item-l">
      <span>{{ i + 1 }}</span>
      <el-image class="el-img" :src="showImg" :lazy="true"></el-image>
      <span class="name">{{ item.name}}</span>
    </div>
    <div class="item-info">
      <p v-if="item.hasOwnProperty('artists')">
        <span v-for="artists in item.artists">{{ artists.name }}</span>
      </p>
      <p v-else>
        <span v-for="artists in item.ar">{{ artists.name}}</span>
      </p>
    </div>
    <div class="item-r">
      <span>{{ item.dt || item.duration | rounding }}</span>
    </div>

  </div>
</template>

<script>
import {formatTime} from "../../util";
import {getSearchUrl} from "../../network/search";

export default {
  name: "song-item-info",
  props: {
    item: {
      type: Object,
      default(){
        return {}
      }
    },
    i: {
      type: Number,
      default(){
        return 0
      }
    }
  },
  filters: {
    rounding(value){
      return formatTime(value);
    }
  },
  created() {
    // console.log(this.item.ar[0].name);
  },

  computed: {
    showImg(){
      console.log(this.item)
      return this.item.album ===  undefined ? this.item.al.picUrl :   this.item.album.picUrl

    },
    names(){
      return this.item.album === undefined?  this.item.album.name : this.item.ar[0].name
    }
  },
  methods: {
    toPlayer(item) {
      if (this.timer) {
        this.timer = null
      }
      const data = {}
      console.log(item)
      data.alg = item.al.name
      data.id = item.id
      data.name = item.name
      data.picUrl = item.al.picUrl
      data.song = item.ar
      getSearchUrl(item.id).then(res => {
        data.url = res.data.data[0].url
      })

      this.$bus.$emit('upData')
      this.$store.commit('musicInfo', data)
    },
    addToPlay(item) {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }

      getSearchUrl(item.id).then(res => {
        this.$store.commit('addToPlay', [res.data.data[0].url, item,])

        console.log(this.$store.state)
        this.$message({
          message: '已将歌曲添加到播放列表中'
        })
      }).catch(e => {
        this.$message({
          message: e
        })
      })
    }
  }
}
</script>

<style scoped>

.song-item{
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
.item-info p{
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  white-space: nowrap;

}
.item-l{
  flex: 1;
}

.item-l .el-img{
  width: 100px;
  height: 100px;
  border-radius: 10px;
  vertical-align: middle;
  margin: 0 20px;
}
.item-l span{
  display: inline-block;
  width: 40px;
  text-align: center;
  vertical-align: middle;
}

.item-l .name{
  width: 350px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}
.item-info span{
  margin: 0 10px;
  vertical-align: top;
}
.item-r a{
  padding: 0 10px;
  vertical-align: top;

  display: inline-block;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
.item-r a i{
  font-style: normal;
  color: #cccccc;
}
</style>