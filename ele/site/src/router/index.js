import Vue from 'vue'
import Router from 'vue-router'
import home from "@/components/home"
import search from "@/components/search"
import order from "@/components/order"
import login from "@/components/my/login"
import my from "@/components/my"
import detail from "@/components/detail"
import shopDetail from "@/components/shopDetail/shopDetail"
import userInfo from "@/components/my/userInfo"
import userName from "@/components/my/userName"
import reBind from "@/components/my/reBind"
import updateInfo from "@/components/my/updateInfo"
import goodsDetail  from "@/components/shopDetail/goodsDetail"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      alias :"/",
      meta : {
        isShow : true
      }
    },{
      path: '/search',
      name: 'search',
      component: search,
      meta : {
        isShow : true
      }
    },{
      path : "/order",
      name : "order",
      component : order,
      meta : {
        isShow : true
      }
    },{
      path : "/my",
      name : "my",
      component : my,
      meta : {
        isShow : true
      }
    },{
      path : "/login",
      name : "login",
      component : login,
      meta : {
        isShow : false
      }
    },{
      path : "/detail/:id/:name",
      name : "detail",
      component : detail,
      meta : {
        isShow : false
      }
    },{
      path : "/shopdetail/:id",
      name : "shopdetail",
      component : shopDetail,
      meta : {
        isShow : false
      }
    },{
      path : "/shopdetail/goodsdetail/:id",
      name : "goodsDetail",
      component : goodsDetail,
      meta : {
        isShow : false
      }
    },
    {
      path : "/my/userinfo",
      name : "userInfo",
      component : userInfo,
      meta : {
        isShow : false
      }
    },{
      path : "/my/username",
      name : "userName",
      component : userName,
      meta : {
        isShow : false
      }
    },
    {
      path : "/my/rebind",
      name : "reBind",
      component : reBind,
      meta : {
        isShow : false
      }
    },
    {
      path : "/my/updateinfo",
      name : "updateInfo",
      component : updateInfo,
      meta : {
        isShow : false
      }
    }
  ]
})
