<template>
    <div id="order">
        <topTitle title="订单"></topTitle>
        <div class="bg" v-if="isShow">
            <p class="title">近三个月无外卖订单记录</p>
            <a class="link" href="javascript:;">查询三个月前的外卖订单</a>
        </div>
        <div class="order-main" v-else>
            <p class="order_top">
                <span>商品图片</span>
                <span>商品名称</span>
                <span>商品单价</span>
                <span>商品数量</span>
            </p>
            <orderItem v-for="(item,i) in $store.state.orderList" :key = "i" :orderInfo="item"></orderItem>
        </div>
    </div>
</template>

<script>
    import topTitle from "../top-title" 
    import orderItem from "./orderItem"
    import axios from "axios"
    export default {
        name : "order",
        data(){
            return {
                isShow :　this.$store.state.orderList.length < 1 ? true : false
            }
        },
        components:{
            topTitle,
            orderItem
        },
        methods : {
            scroll(){
                window.onscroll = function(){
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    var oTop = document.querySelector(".order_top");
                    if(scrollTop >= 47){
                        oTop.style.position = "fixed";
                        oTop.style.top = "0"
                    }else{
                        oTop.style.position = "";
                    }
                }
            }
        },
        mounted(){
            this.$store.dispatch("getOrderList");
            this.scroll();
            console.log(this.$store.state.orderList);
        }
    }
</script>

<style scoped>
#order{
    width : 100%;
    height : 5rem;
    
}
.bg{
    width : 100%;
    height : 100%;
    overflow: hidden;
    background : #f5f5f5 url("../../img/bbe5984003cb26fc7b445a4a15195png.png") no-repeat center 1rem;
}
.title{
    color : #6a6a6a;
    font-size: 0.2rem;
    text-align: center;
    margin-top : 2.2rem;
    margin-bottom:0.2rem;
}
.link{
    text-decoration: none;
    color : #999;
    font-size: 0.12rem;
    text-align: center;
    display: block
}
.order-main{
    margin-bottom:0.5rem;
}
.order_top{
    height: 0.3rem;
    width : 100%;
    background : #fff;
}
.order_top span{
    width : 25%;
    float : left;
    text-align: center;
    font-size: 0.13rem;
    line-height : 0.3rem;
}
</style>