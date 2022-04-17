<template>
  <div id="my">
    <div class="main">
      <nav-path></nav-path>
      <div class="container"></div>
    </div>
  </div>
</template>

<script>
import navPath from '../components/nav-path'
export default {
  name: "my",
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
