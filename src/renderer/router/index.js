import Vue from 'vue'
import Router from 'vue-router'

import homeView from "../views/HomeView";

import recommend from '../views/home/recommend'
import latestMusic from "../views/home/latestMusic";
import rankList from "../views/home/rankList";
import songsList from "../views/home/songsList";
import detail from "../views/home/detail";
import detailArtist from "../views/home/detailArtist";
Vue.use(Router)

export default new Router({
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
        {name: 'recommend',path: '/home/recommend', component: recommend,},
        {name: 'latestMusic',path: '/home/latestMusic', component: latestMusic},
        {name: 'rankList',path: '/home/rankList', component: rankList},
        {name: 'songsList',path: '/home/songsList', component: songsList},
        {name: 'detail',path: '/home/detail', component: detail},
        {name: 'artist',path: '/home/detailArtist', component: detailArtist},
      ]

    }
  ]
})
