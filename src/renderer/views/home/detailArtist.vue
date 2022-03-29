<template>
  <div>
    <div id="artist-info">
      <img :src="detailArtist.artist.img1v1Url" alt="">
      <div class="artist-info">
        <div class="booth"></div>
        <div class="artist-info-about">
          <img :src="detailArtist.artist.img1v1Url" class="artist-info-img"/>
          <div class="about-info">
            <p class="name">{{detailArtist.artist.name}}</p>
            <p class="name">专辑数： {{detailArtist.artist.albumSize}}</p>
          </div>
        </div>
        <div class="desc">{{detailArtist.artist.briefDesc}}</div>
      </div>
    </div>
    <div class="nav-title">
      <a v-for="(item, i) in tabNav" @click="toPath(i)">
        <span>{{item}}</span>
        <div class="sss" :class="{bar: i ===currentIndex}"></div>
      </a>
    </div>
    <el-table v-if="currentIndex === 0"
              @cell-dblclick="rowClick"
        :data="detailArtist.hotSongs"
        style="width: 100%">
      <el-table-column
          prop="name"
          label=""
          width="180">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="作品列表"
          width="500">
      </el-table-column>
      <el-table-column
          prop="name"
          label="MV"
          width="180">
        <template scope="scope">
          <i class="icon iconfont icon-shipin " v-if="scope.row.mv"></i>
        </template>
      </el-table-column>
      <el-table-column
          prop="al.name"
          label="专辑">
      </el-table-column>
    </el-table>
    <el-table v-else-if="currentIndex === 1"
        :data="album"
        style="width: 100%">
      <el-table-column
          prop="name"
          label=""
          width="180">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="作品列表"
          width="500">
      </el-table-column>
    </el-table>
    <el-table v-else-if="currentIndex === 2"
        :data="album"
        style="width: 100%">
      <el-table-column
          prop="name"
          label=""
          width="180">
        <template scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column
          prop="name"
          label="作品列表"
          width="500">
      </el-table-column>
    </el-table>


  </div>
</template>

<script>
import {getRecommendArtistMv, getRecommendArtistSong, getRecommendArtistAlbum} from "@/network/home";
import {getSearchUrl} from "@/network/search";

export default {
  name: "detailArtist",
  data(){
    return{
      id: '',
      tabNav: ['单曲', '专辑', 'mv'],
      detailArtist: [],
      single: [],
      album: [],
      mv: [],
      currentIndex: 0,
    }
  },
  created() {
    this.id = this.$route.query.id
    this._getRecommendArtistSong(this.id)
    this._getRecommendArtistMv(this.id)
    this._getRecommendArtistAlbum(this.id, this.limit, this.offset)

  },
  methods: {
    _getRecommendArtistSong(id){
      getRecommendArtistSong(id).then(res => {
        this.detailArtist = res.data
      })
    },
    _getRecommendArtistMv(id){
      getRecommendArtistMv(id).then(res => {
        this.mv = res.data.mvs
      })
    },
    _getRecommendArtistAlbum(id, limit, offset){
      getRecommendArtistAlbum(id, limit, offset).then(res => {
        this.album = res.data.hotAlbums
      })
    },
    toPath(i){
      this.currentIndex = i
    },
    rowClick(row){
      getSearchUrl(row.id,).then(res => {
        this.$bus.$emit('upData', res.data)
      })
    }
  }
}
</script>

<style scoped>
#artist-info{
  width: 100%;
  position: relative;
}
#artist-info img{
  width: 100%;
  height: 400px;
}
.artist-info{
  position: absolute;
  left: 0;
  top: 0;
  height: 400px;
  width: 100%;
padding: 0 20px;
  background: rgba( 255, 255, 255, 0.25 );
  backdrop-filter: blur( 10px );
  -webkit-backdrop-filter: blur( 50px );
}
.artist-info .artist-info-img{
  width: 100px !important;
  height: 100px !important;
  border-radius: 50px;
}
.artist-info .booth{
  height: 190px;
}
.artist-info-about{
  display: flex;
}
.artist-info-about .about-info{
  padding-left: 20px;
  padding-top: 50px;
}
.desc{
  display: -webkit-box;
  overflow: hidden;
  padding-top: 5px;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.nav-title{
  margin-top: 20px;
}
.nav-title a{
  text-align: center;
  display: inline-block;
  margin: 0 10px;
  cursor: pointer;
  width: 50px;
}
.sss{
  margin-top: 5px;
  background-color: transparent;
  height: 2px;
  width: 0;

}
.bar{
  width: 100%;
  height: 2px;
  background-color: var(--active-c);
}

</style>
