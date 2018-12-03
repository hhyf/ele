<template>
    <div class="shop" @click="toShopDetail(shopInfo._id)">
        <div class="shop_top">
            <!-- :src="$store.state.shopList[index].shopPic | imgUrl" -->
            <img class="shopPic" v-if="shopInfo.shopPic" :src="shopInfo.shopPic | imgUrl" alt="">
            <div class="shopInfo">
                <!-- {{$store.state.shopList[index].shopName}} -->
                <h4>{{shopInfo.shopName}}</h4>
                <p class="sales">1625单
                    <span style="float:right;margin-right:0.3rem;background : #0097ff;color:#fff">蜂鸟专送</span>
                </p>
                <p class="price">￥20起送 | 配送费 ￥4
                    <span style="margin-left:0.5rem">2.4km|27分钟</span>
                </p>
            </div>
        </div>
        <div class="shop_bottom">
            <p class="shopType">
                <span class="shopType_wrap">{{shopInfo.shopTypeInfo[0].shopTypeName}}</span>
            </p>
            <p class="shop_activity1"><span class="squre" :style="{background : '#'+activityList[Math.floor(Math.random()*6)].icon_color}">{{activityList[Math.floor(Math.random()*6)].icon_name}}</span>{{activityList[Math.floor(Math.random()*6)].name}}</p>
            <p class="shop_activity2"><span class="squre" :style="{background : '#'+activityList[Math.floor(Math.random()*6)].icon_color}">{{activityList[Math.floor(Math.random()*6)].icon_name}}</span>{{activityList[Math.floor(Math.random()*6)].name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name : "shop",
        props : ["index","shopInfo","activityList"],
        methods : {
            toShopDetail(id){
                this.$router.push("/shopDetail/"+id);
                // this.$store.commit("CHANGE_COM",3)
            }
        },
        mounted() {
        },
    }
</script>

<style scoped>
.shop{
    height : 1.4rem;
    padding-top: 0.1rem;
    border-bottom : 1px solid #eee;
}
.shop_top{
    height: 0.8rem;
}
.shopPic{
    float: left;
    width:0.8rem;
    height: 0.8rem;
    margin: 0 0.05rem;
}
.shopInfo{
    margin-left: 0.95rem;
    height: 100%;
}
.shopInfo h4{
    height: 0.3rem;
    font-size: 0.15rem;
    line-height: 0.3rem;
    font-weight: bolder;
}
.shopInfo .sales{
    height: 0.15rem;
    margin: 0.1rem 0;
    font-size: 0.1rem;
}
.shopInfo .price{
    height: 0.15rem;
    font-size: 0.1rem;
}
.shop_bottom{
    padding-left : 0.95rem;
    height: 0.6rem;
    font-size: 0.1rem
}
.shop_bottom .shopType{
    height: 0.18rem;
    font-size: 0.08rem;
    color: rgb(102, 102, 102)
}
.shopType_wrap{
    padding: 0.02rem;
    border: 1px solid rgb(221, 221, 221);
    margin-top: 0.3rem
}
.shop_bottom .shop_activity1{
    height: 0.18rem;
    margin:0.02rem 0;
}
.shop_bottom .shop_activity2{
    height: 0.18rem;
}
.squre{
    box-sizing : border-box;
    width: 0.18rem;
    height: 0.18rem;
    color: #fff;
    margin-right: 0.1rem;
}
</style>