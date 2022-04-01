<template>
  <div id="player">

  </div>
</template>

<script>
import Aplater from 'vue-aplayer'
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
      console.log(data)
    })
  },
  methods: {
  },
  components: {
    Aplater
  }
}
</script>

<style scoped>

</style>
