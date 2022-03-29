<template>
  <div id="rank">
    <p class="warning"><i class="icon iconfont icon-yinliang"></i> {{listInfo.name}} {{listInfo.upateFrequency}}</p>
    <div class="official">
      <h2>官方榜</h2>
      <div class="official-warp">
        <div class="official-item" v-for="(item) in list.slice(0, 4)">
          <img :src="item.coverImgUrl" alt="">
          <div class="list_info" >
            <p class="name">  {{item.name}} <span>{{item.updateFrequency}}</span> </p>
            <div class="song-list">
              <a @click="player(song.third)" v-for="(song, i) in item.tracks"><p><span> <i>{{i + 1}}</i> {{song.second}} </span><span>{{song.first}}</span></p></a>
            </div>
          </div>
          <div class="mask">
            <div class="info">
              <i class="icon iconfont icon-bofang-02"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {getDailyList} from "../../network/home";
import {roundingData} from "../../util";
export default {
  name: "rankList",
  data(){
    return {
      list: [],
      listInfo: {},
    }
  },
  created() {
    getDailyList().then(res => {
      console.log(res)
      this.listInfo = res.data.artistToplist
      this.list = res.data.list
    }).catch(e => {
      this.$message({
        type: 'error',
        message: '数据加载异常， 请重试'
      })
    })
  },
  filters: {
    getRoundingData(value){
      return roundingData(value)
    }
  },
  methods: {
    player(id){
      console.log(id)
    }
  }

}
</script>

<style scoped>
#rank{
  padding: 10px 15px;
}
.warning {
  padding: 10px 15px;
  color: #cccccc;
  background-color: #eaeaea;
}
.warning i{
  margin-right: 10px;
}
#rank h2{
  margin: 10px 0;
  font-size: 21px;
}
.official {
  border: 1px solid #f2f2f2;
  padding: 20px;
  margin-top: 10px;
  border-radius: 10px;
}
.official-warp{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.official-item{
  position: relative;
  margin: 15px 0;
  width: 45%;
  box-shadow: 0 0  15px #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.official-item img{
  width: 200px;
  vertical-align: top;
  height: 100%;
}
.list_info {
  flex: 1;
  width: 282px;
  overflow: hidden;
  padding: 10px 15px;
  display: inline-block;
  vertical-align: top;
}
.list_info .name{
  font-size: 18px;
}
.list_info .name span{
  text-align: justify-all;
  color: #cccccc;
  padding-left: 5px;
  font-size: 16px;
}
.song-list{
  margin-top: 55px;

}
.song-list p{
  display: flex;
  margin: 10px 0;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  justify-content: space-between;
}
.song-list p i {
  padding: 5px;
  color: var(--active-c);
}
.tags{
  position: absolute;
  right: 0;
  top: 0;
  z-index: 9;
  padding: 5px;
  border-radius: 10px;
  color: #f2f2f2;
  background-color: var(--active-c);
}
.mask{
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  width: 200px;
  height: 100%;
  background-color: rgba(80, 80, 80, 0);

}
.mask .info{
  line-height: 200px;

}
.list_info b {
  display: inline-block;
  height: 2px;
  width: 30px;
  background-color: var(--active-c);
}
.mask i {
  font-size: 0px;
  color: var(--active-c);
}
.official-item:hover .mask{
  background-color: rgba(80, 80, 80, 0.9);
}
.mask p{
  z-index: 9;
}
.official-item:hover .mask i{
  font-size: 60px;
}
.song-list a p:hover{
  color: #ea4c89;
  cursor: pointer;
  transition: all 0.1s !important;
}
</style>
