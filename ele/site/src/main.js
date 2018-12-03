// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from "@/vuex"
import filters from "@/filters"

import login from "@/components/my/login"
import detail from "@/components/detail"
import shopDetail from "@/components/shopDetail/shopDetail"
Vue.config.productionTip = false

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

Vue.use(MintUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App ,login,detail,shopDetail},
  template: `<App></App>`
})
