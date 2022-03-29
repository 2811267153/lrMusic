<template>
  <div id="playlist">

    <div class="main">
      <nav-path></nav-path>
      <div class="container"></div>
    </div>
  </div>
</template>

<script>
import navPath from "@/components/path";
export default {
  name: "playlist",
  components: {
    navPath
  }
}
</script>

<style scoped>
.main {
  padding: 0 10px;
  display: flex;
  background-color: #fff;
}

.container {
  flex: 1;
  background-color: red;

}
</style>
