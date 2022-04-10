<template>
  <div>
    <h2>热门歌手</h2>
    <div id="recommend-artist">
      <div class="artist-item" @click="toDetail(item)" v-for="item in recommendArtist">
        <el-image class="artist-img" :src="item.picUrl"></el-image>
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommendArtist",
  props: {
    recommendArtist: {
      type: Array,
      default(){
        return []
      }
    }
  },
  created() {
  },
  methods: {
    toDetail(item){
      this.$router.push({name: 'artist', query: {id: item.id}})
    }
  }
}
</script>

<style scoped>
h2{
  margin: 10px 0 8px 0;
  font-size: 21px;

}
#recommend-artist{

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
}
.artist-item{
}
.artist-item:hover p{
  padding-left: 50px;
}
.artist-img{
  border-radius: 5px;
  width: 150px;
  height: 100px;
}
</style>
