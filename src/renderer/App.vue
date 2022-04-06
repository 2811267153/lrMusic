<template>
  <div id="apps">
    <my-header @searchData="search"/>
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive === true"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive === true"/>

    <player class="player"></player>

  </div>
</template>

<script>
import player from "./views/player";
import myHeader from "./components/myHeader";
export default {
  name: 'App',
  data: () => ({
    songs: []
  }),
  components: {
    myHeader,
    player
  },
  methods: {
    search(searchData){
      this.songs = searchData
    }
  },
};
</script>
<style>
@import "assets/css/index.css";
@import "//at.alicdn.com/t/font_3255979_h82dn0ymwch.css";

.player{
  position: sticky;
  bottom: 0;
}
</style>
