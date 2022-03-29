<template>
  <div id="recommend-item">
    <h2>{{ title }}</h2>
    <div class="recommend-warp">
      <a class="recommend-item" @click="toDetail(item,i)" v-for="(item, i) in recommendData">
        <el-image class="rec-img" :src="itemImg(i)"></el-image>
        <p class="recommend-name">
          <span>{{ item.name }}</span>
          <i></i>
        </p>
        <div class="mask">
          <b class="icon iconfont icon-bofang-02"></b>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "recommendItem",
  data() {
    return {
      title: '推荐歌单'
    }
  },
  props: {
    recommendData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    toDetail(item){
      this.$router.push({name: 'detail', query: {id: item.id}})
    },

    itemImg(i){
      return this.recommendData[i].coverImgUrl ||this.recommendData[i].picUrl
    }
  },
  computed: {
  }
}
</script>

<style scoped>
h2 {
  font-size: 20px;
}

.recommend-warp {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
}

.recommend-item {

  position: relative;
  padding-top: 10px;
  overflow: hidden;
  border: 1px solid #f2f2f2;
  text-align: center;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #f2f2f2;
  cursor: pointer;
}

.recommend-name {
  width: 275px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin: 10px 0px;
  text-wrap: normal;
}
.recommend-item i{
  display: block;
  height: 2px;
  width: 0;
  transition: all .3s;
  margin-top: 10px ;
  background-color: var(--active-c);
}

.recommend-item:hover i{
  width: 100%;
}
.recommend-item:hover .mask{
  /*background-color: rgba(255 255 255 .5);*/
  /*background: rgba( 0, 0, 0, 0.25 );*/
  backdrop-filter: blur( 4px );
  -webkit-backdrop-filter: blur( 4px );
  border-radius: 10px;
}
.recommend-item:hover  b{
  color: var(--active-c);
}
.rec-img {
  background-color: #cccccc;
  border-radius: 10px;
  margin: 10px 0;
  width: 200px;
  height: 250px;
}
.mask{
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 96%;

}
.mask b{
  line-height: 302px;
  font-size: 60px;
  font-weight: 100;
  color: transparent;
}
</style>
