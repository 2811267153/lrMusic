<template>
  <div id="player">

  </div>
</template>

<script>
import "xgplayer";
import Music from "xgplayer-music";
export default {
  name: "player",
  data(){
    return {
      player: null,
      url: '',
    }
  },
  mounted() {
    this.$bus.$on('upData', (data) => {
      if(this.player == null){
        this.player = new Music({
          id: 'player',
          url: [
            {
              src: data.data[0].url
            }
          ]
        })
        console.log()
      }else {
        console.log(this.player.config.url = null)
      }

    })

  },
}
</script>

<style scoped>

</style>
