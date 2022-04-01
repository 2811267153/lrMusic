<template>
  <div id="Headers">
    <div id="myHeader">
      <div class="off-controller">
        <div  @click="close" class="btn r"></div>
        <div  @click="minimizeWin" class="btn g"></div>
        <div @click="maximizeWin" class="btn b"></div>
      </div>
      <div class="nav-man">
        <div class="nav-path">
          <button @click="toPath(1)" class="path-item"><i class="icon iconfont icon-zuo-01"></i></button>
          <button @click="toPath(2)" class="path-item"><i class="icon iconfont icon-you-01"></i></button>
        </div>
        <div class="nav-search">
          <div class="search-bar"><i class="icon iconfont icon-sousuoguanjianci"></i><input type="text" @input="clearSearch(search)" @keyup.enter="getSearch(search)" v-model="search"></div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {getSearch} from "../network/search";
import { ipcRenderer, shell } from "electron";
export default {

  data() {

    return {
      search: '',
      form: {
        id: '',
        limit: 30,
        type: '',
        songsData: [],
      }
    };
  },
  methods: {
    clearSearch(search){
      if(search.length === 0){
        this.$bus.$emit('isNull')
      }
    },
    getSearch(search){
      getSearch(search, 20, 1).then(res => {
        this.songsData = res.data.result
        console.log(this.songsData)
        this.$bus.$emit('searchData', this.songsData)
        // this.$store.dispatch('searchData', this.songsData)
      })
    },
    minimizeWin() {
      console.log('aaa')
      ipcRenderer.send("min"); // 通知主进程我要进行窗口最小化操作
    },
    min() {
    },
    maximizeWin() {
      this.winFlag = !this.winFlag;
      ipcRenderer.send("max", { winFlag: this.winFlag });
    },
    close() {
      ipcRenderer.send("close");
      // this.$electron.ipcRenderer.send("window-close");
    },
    toPath(type){
      if (type === 1){
        this.$router.go(-1)
      }else{
        this.$router.go(+1)
      }
    }
  },
};
</script>


<style>
#Headers{
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
}
#myHeader {
  position: sticky;
  top: 0;
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 50px;
  line-height: 50px;
  border: 1px solid #f2f2f2;
  padding: 0 10px;
  display: flex;
-webkit-app-region: drag;

}
.off-controller {
  width: 300px;
  border-right: 1px solid #f2f2f2;
}
.btn {
  margin: 0 5px;
  transition: all .3s;
  width: 15px;
  height: 15px;
  border-radius: 10px;
  -webkit-app-region: no-drag;
}
.off-controller{
  display: flex;
  align-items: center;
}
.r{
  background-color: #ff6a47;
}
.r:hover{
  box-shadow: 1px 1px 10px #ff6a47;
}
.g{
  background-color: #fece6b;
}
.g:hover{
  box-shadow: 1px 1px 10px #fece6b;
}
.b{
  background-color: #9bd060;
}
.b:hover{
  box-shadow: 1px 1px 10px #9bd060;
}
.nav-man{
  display: flex;
  padding-left: 30px;
  align-items: center;
}

.path-item{
  -webkit-app-region: no-drag;
  margin: 0   10px;
  background-color: #fff;
}
.path-item i{
  text-align: center;
  font-size: 18px;
  padding: 10px;
  transition: all .2s;
  border-radius: 20px;
}
.path-item i:hover{
  background-color: #f2f2f2;
}
.nav-search{
  flex: 1;
  width: 500px;
  -webkit-app-region: no-drag;

}
.search-bar{
  background-color: #fafafb;
  padding-left: 20px;
  border-radius: 30px;
  position: relative;
  height: 40px;
  line-height: 40px;
}
.search-bar i {
  font-size: 22px;
  padding: 0 10px;
}
.search-bar input {
  width: calc(100% - 42px);
  background-color: transparent;
  font-size: 18px;
  outline: none ;
}
</style>
