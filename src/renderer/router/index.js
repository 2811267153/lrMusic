import Vue from 'vue'
import Router from 'vue-router'

import homeView from "../views/HomeView";
import playerMain from '../views/playerMain'
import recommend from '../views/home/recommend'
import latestMusic from "../views/home/latestMusic";
import rankList from "../views/home/rankList";
import songsList from "../views/home/songsList";
import detail from "../views/home/detail";
import detailArtist from "../views/home/detailArtist";
import artistList from "../views/home/artistList";
Vue.use(Router)

 const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      redirect: '/home/recommend',
      component: homeView,
      children: [
        {name: 'recommend',path: '/home/recommend', component: recommend,meta:{keepAlive: true}},
        {name: 'latestMusic',path: '/home/latestMusic', component: latestMusic, meta:{keepAlive: true}},
        {name: 'rankList',path: '/home/rankList', component: rankList, meta:{keepAlive: true}},
        {name: 'songsList',path: '/home/songsList', component: songsList, meta:{keepAlive: true}},
        {name: 'detail',path: '/home/detail', component: detail, meta:{keepAlive: false}},
        {name: 'artist',path: '/home/detailArtist', component: detailArtist, meta:{keepAlive: false}},
        {name: 'artistList',path: '/home/artistList', component: artistList, meta:{keepAlive: true}} ,
      ]
    },
    {
      path: '/player',
      name: 'player',
      component: playerMain
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log(to)
  return next()
})
export default router
