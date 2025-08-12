//前回の課題から名前変更だけ
import Vue from 'vue'
import VueRouter from 'vue-router'
import RegisterView from '../views/RegisterView.vue' //登録ページ
import ListView from '../views/ListView.vue'     // 一覧ページ


Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/delete',
    name: 'delete',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DeleteView.vue')
  },
  
  {
    path: '/list',        
    name: 'list',         
    component: ListView    
  },
  {
    path: '/',            //初期画面つくれたらつくる。一旦登録ページに。
    redirect: '/register'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
