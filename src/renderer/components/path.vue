<template>
  <div class="path">
    <div class="path-warp" >
      <router-link to="/home" active-class="active" class="path-item">
        <span>首页</span>
        <div class="r-var"></div>
      </router-link>
    </div>
    <div class="path-warp">
      <router-link to="/playlist" active-class="active" class="path-item">
        <span>播放列表</span>
        <div class="r-var"></div>
      </router-link>
    </div>
    <div class="path-warp">
      <router-link to="/my" active-class="active" class="path-item">
        <span>我的</span>
        <div class="r-var"></div>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "path",
  data(){
    return{
    }
  }
}
</script>

<style scoped>

.path-warp{
  line-height: 50px;
  width: 300px;
  height: 50px;
}
.active{
  color: var(--active-c);
}
.path-item{
  height: 50px;
  display: flex;
}
.path-item span{
  flex: 1;
}
.r-var{
  width: 2px;
  height: 0;
  transition: all .3s;
  background-color: var(--active-c);
}
.active .r-var{
  height: 100%;
}
</style>
