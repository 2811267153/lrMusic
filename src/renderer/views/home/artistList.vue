<template>
  <div>
    <div class="nav">
      <div class="nav-warp">
        <span>语种:</span>
        <div id="">
          <div class="nav-item" @click="getSongList(item, i, 'language')"  :class="{active : currentIndexO === i}"  v-for="(item, i) in area">
            <button>{{item.value}}</button>
          </div>
        </div>
      </div>
      <div class="nav-warp">
        <span>分类:</span>
        <div class="nav-item" @click="getSongList(item, i, 'sort')" :class="{active : currentIndexT === i}" v-for="(item, i) in type">
          <button>{{item.value}}</button>
        </div>
      </div>
      <div class="nav-warp">
        <span>筛选:</span>
        <div id>
          <div class="nav-item">
          </div><div class="nav-item" @click="getSongList(item, i, 'artist')" :class="{active : currentIndexS === i}" v-for="(item, i) in filter">
          <button v-if="item === '-1'">热门</button>
          <button v-else>{{item}}</button>
          </div>
        </div>
      </div>
      <recommend-artist :recommend-artist="list"/>
    </div>

  </div>
</template>

<script>
import {getSingerCategory} from "../../network/home";
import recommendArtist from "./recommendArtist";

export default {
  name: "artistList",
  data() {
    return {
      form: {
        limit: 30,
        offset: 0,
        type: -1,
        area: -1,
        initial: ''
      },
      list: [],
      currentIndexO: 0,
      currentIndexT: 0,
      currentIndexS: 0,
      area: [
        {label: '-1', value: '全部'},
        {label: '7', value: '华语'},
        {label: '96', value: '欧美'},
        {label: '8', value: '日本'},
        {label: '16', value: '韩国'},
        {label: '0', value: '其他'},
      ],
      type: [
        {label: '-1', value: '全部'},
        {label: '1', value: '男歌手'},
        {label: '2', value: '女歌手'},
        {label: '3', value: '乐队'},
      ],
      filte: Array.from(new Array(26),(ele, index) => {
        return String.fromCharCode(65 + index)
      }),
      a: ''
    }
  },
  components: {
    recommendArtist
  },
  created() {
    this.a = [ '-1',...this.filte, '#']
    console.log(this.a)
    this._getSingerCategory(this.form.limit, this.form.offset, this.form.area, this.form.type)
  },
  methods: {
    _getSingerCategory(limit,offset,type,area, initial) {
      getSingerCategory(limit,offset, type, area, initial).then(res => {
        console.log(res)
        this.list = res.data.artists
      }).catch(e => {
        this.$message({
          message: e,
          type: 'error'
        })
        console.log(e)
      })
    },
    getSongList(item, i, type){
      if (type === 'language'){
        this.currentIndexO = i
        console.log(item)
        this.form.area = item.label
      }else if(type === 'artist'){
        this.currentIndexS = i
        this.form.initial = item
        console.log(item)
      }else {
        this.currentIndexT = i
        this.form.type = item.label
        console.log(item)
      }
      this._getSingerCategory(this.form.limit, this.form.offset, this.form.type, this.form.ares, this.form.initial)
    }
  },
  computed: {
    filter(){
      return ['-1',...this.filte, '#']
    }
  }
}
</script>

<style scoped>
.nav-warp{
  display: flex;
  flex-wrap: wrap;
  padding: 10px 20px;
}
.nav-warp span{
  width: 80px;
  padding: 10px 0;

}
.nav-item button{
  padding: 10px 20px;
  margin: 10px ;
  border-radius: 5px;
}
div[id]{
  display: flex;
  flex: 1;
  flex-wrap: wrap;
}
.nav-warp span{
  width: 80px;
}
.active button{
  color: #f2f2f2;
  background-color: var(--active-c);
}

</style>
