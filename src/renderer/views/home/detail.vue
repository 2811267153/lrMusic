<template>
  <div id="detail">
    <div class="listInfo">
      <div class="list-img">
        <img :src="playList.coverImgUrl" alt="">
      </div>
      <div class="foo">
        <div class="title"><b class="tags">歌单</b> <span>{{playList.name}}</span></div>
        <div class="creator">
          <img class="creator-img" :src="creators.avatarUrl" alt="">
          <span class="nickname">{{creators.nickname}}</span>
          <span>创建时间: {{ playList.createTime | showData }}</span>
        </div>
        <div class="tags-info">
          <p>标签: <span v-for="item in playList.tags" :key="item.id">{{item}} <b>\</b></span></p>
          <p>播放量: {{playList.playCount | rounding}}次 | 订阅人数: {{playList.subscribedCount | rounding}}人</p>
          <p class="time">创建时间: {{ playList.createTime | showData }} | 更新时间: {{ playList.updateTime | showData }}</p>
          <p class="desc"> {{playList.description}} </p>
        </div>
      </div>
    </div>
    <el-table
        v-show="all"
        :data="playList.tracks"
        stripe
        @cell-dblclick="cellClick"
        style="width: 100%">
      <el-table-column
          prop="name"
          label=""
          width="50">
        <template scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="标题"
          width="500">
      </el-table-column>
      <el-table-column
          prop="ar"
          label="歌手"
          width="400">
        <template scope="scope">
          <span class="ar-item" v-for="item in scope.row.ar">{{item.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="al"
          label="专辑">
        <template scope="scope">{{scope.row.al.name}}</template>
      </el-table-column>
    </el-table>

    <el-table
        v-show="!all"
        :data="allPlayList"
        @cell-dblclick="cellClick"
        style="width: 100%">
      <el-table-column
          prop="name"
          label=""
          width="50">
        <template scope="scope">{{scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="标题"
          width="500">
      </el-table-column>
      <el-table-column
          prop="ar"
          label="歌手"
          width="400">
        <template scope="scope">
          <span class="ar-item" v-for="item in scope.row.ar">{{item.name}}</span>
        </template>
      </el-table-column>
      <el-table-column
          prop="al"
          label="专辑">
        <template scope="scope">{{scope.row.al.name}}</template>
      </el-table-column>
    </el-table>
    <div  id="end-btn"><button @click="getAll">加载所有歌曲</button></div>
  </div>
</template>

<script>
import {getResourceAll, getResourceInfo} from "../../network/home";
import {formatDate, roundingData} from "../../util";
import {getSearchUrl} from "../../network/search";
export default {
  name: "detail",
  data(){
    return{
      id: '',
      all: true,
      playList: [],
      allPlayList: [],

    }
  },
  created() {
    this.id = this.$route.query.id
    this.getResourceInfo(this.id)
  },
  methods: {
    getResourceInfo(id){
      getResourceInfo(id).then(res => {
        console.log(res)
        this.playList = res.data["playlist"]
      })
    },
    cellClick(row){
      getSearchUrl(row.id).then(res => {
        this.$bus.$emit('upData', res.data)
      }).catch( e => {
        this.$message({
          message: e
        })
      })
    },
    getAll(){
      getResourceAll(this.id,this.limit ,this.offset).then(res => {
        this.allPlayList = res.data.songs
        this.all = false
      })
    }
  },
  filters: {
    showData(value){
      const data = new Date(value * 1)
      return formatDate(data)
    },
    rounding(value){
      return roundingData(value)
    }
  },
  computed:{
    creators(){
      return this.playList.creator
    }
  }
}
</script>

<style scoped>
.listInfo{
  display: flex;
  padding: 20px 30px;
}
.list-img img{
  border-radius: 10px;
  width: 200px;
  height: 225px;
}
.foo{
  padding: 0 20px;
}
.title .tags {
  display: inline-block;
  border: 2px solid var(--active-c);
  padding: 5px 10px;
  border-radius: 10px;
  color: var(--active-c);
  font-weight: normal;
}
.title span{
  font-size: 18px;
  margin-left: 10px;

}
.creator{
  margin: 10px 0;
}
.creator-img{
  vertical-align: bottom;
  border-radius: 5px;
  width: 40px;
}
.nickname{
  color: var(--active-c);
}
.creator span{
  margin: 0 10px;
}
.tags-info b{
  margin: 0 2px;
}
.tags-info b:last-child{
  color: transparent;
}
.tags-info p{
  margin: 5px 0;
}
.ar-item{
  margin: 0 5px;
}
#end-btn{
  text-align: right;
}
#end-btn button {
  padding: 20px 30px;
  background-color: var(--active-c);
  color: #f2f2f2;
  margin-top: 20px;
  border-radius: 10px;
}
#end-btn button:hover{
  background-color: #f2f2f2;
  color: var(--active-c);
}
.desc{
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
