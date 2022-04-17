<template>
  <div id="song-item">
    <song-item-info v-for="(item, i) in newSongData" :item="item" :i="i" :key="item.id"/>
  </div>
</template>

<script>
import {formatTime} from "../../util";
import songItemInfo from "./song-item-info";

export default {
  name: "song-item",
  props: {
    newSongData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  filters: {
    rounding(value){
      return formatTime(value)
    }
  },
  methods: {
    getData(item, i){
      this.currentIndex = i
    },

  },
  components: {
    songItemInfo
  }
}
</script>

<style scoped>

</style>