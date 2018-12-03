// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './vuex'
import Login from './components/Login'
import Register from './components/Register'
import axios from 'axios'
import filters from "./filters"
Vue.config.productionTip = false
Vue.use(ElementUI);
for(var key in filters){
    Vue.filter(key,filters[key]);
}
axios.interceptors.request.use((config)=>{
    config.url = "/ele"+config.url;
    console.log(config.url);
    return config;  
})
axios.interceptors.response.use(({data})=>{
    return data;
})
//路由拦截
router.beforeEach((to,from,next)=>{//全局拦截器：默认所有都拦截
    if(localStorage.id && localStorage.adminName){
        next();
    }else{
        store.commit("OUT_LOGIN");
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {Login, App,Register },
  template: `<component :is="$store.state.comArr[$store.state.index]"></component>`
})
