<template>
  <div id="apps">
    <my-header @searchData="search"/>
    <nav-path>
      <div class="context-container" slot="container-context">
        <keep-alive >
          <router-view v-if="$route.meta['keepAlive'] === true"/>
        </keep-alive>
        <router-view v-if="!$route.meta['keepAlive'] === true"/>
      </div>
    </nav-path>

    <player class="player"></player>

  </div>
</template>

<script>
import navPath from "./components/nav-path";
import player from "./views/player";
import myHeader from "./components/myHeader";
export default {
  name: 'App',
  data: () => ({
    songs: []
  }),
  components: {
    myHeader,
    player,
    navPath
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
@import "https://at.alicdn.com/t/font_3255979_h82dn0ymwch.css?spm=a313x.7781069.1998910419.125&file=font_3255979_h82dn0ymwch.css";

.player{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 60px;
}
.context-container{
  width: 100%;
}
</style>
