<template>
    <div class="shop-top">
        <div class="bg"></div>
        <a class="back" href="javascript:;" @click="$router.go(-1)">&lt;</a>
        <div class="shopLogo">
            <img v-if="shopDetailInfo.shopPic" :src="shopDetailInfo.shopPic | imgUrl" alt="">
        </div>
        <p class="shopName">{{shopDetailInfo.shopName}}</p>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name : "shopTop",
        props : ["shopDetailInfo"],
    }
</script>

<style scoped>
.shop-top{
    width : 100%;
    background : #fff;
}
.bg{
    height: 1rem;
    background :url(../../img/a62c176c7d874de19c90ad3d30accpng.png) no-repeat left top/cover;
}
.shopLogo{
    height: 0.8rem;
    width: 0.8rem;
    margin: -0.6rem auto 0;
}
.shopLogo img{
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 0.05rem;
}
.shopName{
    height: 0.5rem;
    font-size: 0.15rem;
    text-align: center;
    line-height: 0.5rem;
    font-weight : bolder;
}
.back{
    position : absolute;
    top : 0.02rem;
    left : 0.1rem;
    font-size: 0.22rem;
    text-decoration: none;
    color : #fff;
}
</style>