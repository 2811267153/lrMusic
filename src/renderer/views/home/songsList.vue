<template>
  <div id="songs-list">
    <div class="songs-list-nav">
      <div class="nav-l">
        <div class="nav-l-info">
          <button class="nav-l-info-btn" @click="isShows">{{ selector }}</button>
          <div class="selector_warp" v-show="isShow">
            <div class="icon iconfont icon-xiangshang"></div>
            <div class="bg-triangle">
              <p class="tags-title">
                <button>全部歌单</button>
              </p>
              <div class="tags-body">
                <p>语言 <i></i></p>
                <div class="tags-warp" >
                  <div @click="getAlbum(item.name, 30)" v-for="item in tagsData(0)">
                    {{ item.name }}
                  </div>
                </div>
                <p>风格</p>
                <div class="tags-warp">
                  <div v-for="item in tagsData(1)" @click="getAlbum(item.name, 30)">
                    {{ item.name }}
                  </div>
                </div>
                <p>场景</p>
                <div class="tags-warp">
                  <div v-for="item in tagsData(2)" @click="getAlbum(item.name, 30)">
                    {{ item.name }}
                  </div>
                </div>
                <p>情绪</p>
                <div class="tags-warp">
                  <div v-for="item in tagsData(3)" @click="getAlbum(item.name, 30)">
                    {{ item.name }}
                  </div>
                </div>
                <p>主题</p>
                <div class="tags-warp">
                  <div @click="getAlbum(item.name, 30)" v-for="item in tagsData(4)">
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="nav-r">
        <div class="nav-item" @click="getAlbum(item.name, limit, before, i)" v-for="(item, i) in recommendTags" :class="{active: currentIndex === i}">
          {{item.name}}
          <i></i>
        </div>
      </div>
    </div>
    <div class="container">
      <recommend-item :recommend-data="songsPlayList"></recommend-item>

    </div>
  </div>
</template>

<script>
import {getRecommendAlbums, getRecommendAlbumSort,getRecommendAlbumsContent} from "@/network/home";
import recommendItem from "./recommendItem";
export default {
  name: "songsList",
  components: {
    recommendItem
  },

  data() {
    return {
      isShow: false,
      selector: '全部',
      tags: [],
      categories: [],
      recommendTags: [],
      cat: '',
      limit: 30,
      before: '',
      songsPlayList: [],
      currentIndex: 0,
    }
  },
  created() {
    this._getRecommendAlbumSort();
    this._getRecommendAlbum(),
    this.getAlbum(this.cat,this.limit, this.before)
  },
  methods: {
    _getRecommendAlbumSort() {
      getRecommendAlbumSort().then(res => {
        this.tags = res.data.sub
        this.categories = res.data.categories
      })
    },
    _getRecommendAlbum() {
      getRecommendAlbums().then(res => {
        this.recommendTags = res.data.tags
      })
    },
    getAlbum(cat,limit, before, i){
      this.currentIndex = i
      cat == '' ? this.selector = '全部' : this.selector = cat;
      getRecommendAlbumsContent(cat,limit, before).then(res => {
        console.log(res)
        this.songsPlayList =res.data.playlists
        // this.before = this.songsPlayList[this.songsPlayList.length - 1].createTime
      })
    },
    tagsData(type) {
      return this.tags.filter(item => item.category === type)
    },
    isShows(){
      this.isShow = !this.isShow
    }

  },
  computed: {},

};

</script>

<style scoped>
.songs-list-nav {
  display: flex;
  justify-content: space-between;
}

.songs-list-nav > div {
  flex: 1;
}
.tags-body{
  margin-top: 15px;
}
.icon {
  position: absolute;
  left: 15px;
  color: rgba(27, 25, 25, 0.18);
  font-size: 22px;
  z-index: 9;
}

.selector_warp {
  position: relative;
}

.bg-triangle {
  top: 16px;
  left: 0;
  position: absolute;
  width: 800px;
  height: 300px;
  overflow: auto;
  z-index: 99;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 0px 0px 15px #ccc;
}

.nav-l-info .nav-l-info-btn {
  padding: 10px 25px;
  background-color: #f2f2f2;
  border-radius: 10px;
  border: 1px solid #fff;
}

.tags-title {
  padding: 10px 15px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 5px;
}

.tags-title button {
  /*margin-top: ;*/
  border-radius: 20px;
  padding: 10px 15px;
}

.tags-warp {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
}
.tags-body div{
  text-align: center;
}

.tags-warp div {
  padding: 10px 15px;
  cursor: pointer;
}
.tags-warp{
  color: #cccccc;
}
.tags-body > p{
  padding-left: 15px;
}
.nav-r {
  display: flex;
  justify-content: space-between;
}
.nav-r .nav-item{
  cursor: pointer;
}
.nav-item i {
  width: 0;
  height: 2px;
  display: block;
  background-color: var(--active-c);
}
.active i{
  width: 100%;
}


</style>
