import Vue from "vue"
import vuex from "vuex"
import admin from "./admin"
import shop from "./shop"
var vue = new Vue();
Vue.use(vuex);
const state = {
  index : localStorage.id ? 1 : 0,
  comArr : ["Login","App","Register"]
};
const mutations = {
  CHANGE_COMPONENT(state,index){
    state.index = index;
  },
    OUT_LOGIN(state){
        localStorage.clear();
        state.index = 0;
        vue.$message({
            message : "退出成功",
            type :"success"
        })
    }
};
const getters = {

};
const actions = {

};
const modules = {
  admin,
    shop
}
export default new vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
