<template>
  <div id="apps">
    <my-header @searchData="search"/>
    <keep-alive include="home">
      <router-view />

    </keep-alive>
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

.player{
  position: sticky;
  bottom: 0;
}
</style>
