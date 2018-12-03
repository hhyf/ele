<template>
    <div id="seek">
        <input type="text" class="txt" v-model="shopName" @keyup="searchShop" placeholder="搜索饿了么商家、商品名称">
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name : "seek",
        data(){
            return {
                shopName : ""
            }
        },
        methods : {
            searchShop(){
                this.$store.commit("CHANGE_KEYWORD",this.shopName);
                this.$store.commit("CHANGE_LOADING",true);
                this.$store.dispatch("getShop",{pageIndex : 1});
            }
        },
        mounted(){
        }
    }
</script>

<style scoped>
#seek {
  height: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  background: #0092ff;
  padding : 0.09rem 0.16rem;
}
#seek .txt {
  display: block;
  font-weight: 100;
  width: 100%;
  height: 0.31rem;
  background: #fff;
  color: #999;
  font-size: 0.11rem;
  text-align: center;
  line-height: 0.31rem;
}
</style>