<template>
  <div id="lr-audio">
    <audio :src="url" ref="audio" @timeupdate="timeupdate"></audio>
  </div>
</template>

<script>
export default {
  name: "lr-audio",
  props: {
    url: {
      type: String,
      default(){
        return ''
      }
    }
  },
  methods: {
    timeupdate(){
      this.$emit('timeupdate', this.$refs.audio.currentTime, this.$refs.audio.duration)
    }
  }
}
</script>

<style scoped>

</style>