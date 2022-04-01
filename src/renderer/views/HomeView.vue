<template>
	<div id="home">
		<div class="main">
      <nav-path></nav-path>
			<div v-if="Object.keys(songsData).length !== 0" class="container">
        <div class="container-item" v-for="(item, i) in searchData.songs" @click="songPlayer(item)">
          <div class="index">{{i}}</div>
          <div class="songs-name">{{item.name}}</div>
          <div v-for="artists in item.artists">
            <span class="songs-info">{{artists.name}}</span>
          </div>
          <div class="songs-info">{{item.album.name}}</div>

        </div>

      </div>
      <div  class="container" >
        <div class="sub-nav">
          <router-link class="sub-nav-item" active-class="active" :to="'/home/'+ item.url" v-for="item in subNav">
            {{item.name}}
            <i></i>
          </router-link>
          <router-view/>
          {{songsData}}
        </div>
      </div>
		</div>
	</div>
</template>

<script>
import navPath from "../components/path";
import {getSearchUrl} from "../network/search";
export default {
	name: "Home",
	data() {
    return {
      songsData: [],
      songListShow: false,
      musicInfo: [],
      subNav: [
        {name: '个性推荐', url:'recommend'},
        {name: '歌单', url:'songsList'},
        {name: '排行榜', url:'rankList'},
        {name: '歌手', url:'artistList'},
        {name: '最新音乐', url:'latestMusic'},
      ]
    }
  },

  components: {
    navPath
  },
  computed: {
    result(){
      return this.songsData.songs
    },
  },
  methods: {
    songPlayer(item){
      getSearchUrl(item.id).then(res => {
        this.musicInfo = res.data
        this.$bus.$emit('upData', this.musicInfo)
        this.$store.commit('musicInfo'. this.musicInfo)
      })
    }
  },
  mounted() {
    // this.$bus.$on('isNull', () => {
    //   this.$store.dispatch('searchData', [])
    //   console.log(this.songsData)
    // })
    this.$bus.on('searchData', (data) => {
      this.songsData = data

    })
  }
};
</script>

<style scoped>
.main {
  padding: 0 10px;
  display: flex;
  background-color: #fff;
}

.container {
  flex: 1;
  height: 680px;
  overflow: scroll;
  padding: 0 15px;
}
.container-item {
  display: flex;
  padding: 20px;
  margin: 15px 0;
  box-shadow: 0 0 5px #ccc;
  border-radius: 10px;
}
.container-item .index {
  width: 50px;
}
.songs-name {
  width: 50%;
}
.songs-info {
  margin: 0 10px;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.active{
  color: var(--active-c);
}
.sub-nav-item{
  display: inline-block;
  position: relative;
  padding: 10px 20px;
}
.sub-nav-item i {
  display: block;
  width: 0;

  height: 2px;
  margin-top: 5px;
  background-color: var(--active-c);
}
.active i {
  width: 100%;
}
</style>
