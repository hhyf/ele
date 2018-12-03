<template>
    <div id="my">
        <Toptitle title="我的"></Toptitle>
        <User></User>
        <div id="activity">
            <IndexActivity title="钱包" color="#0098fb" :icon="wallet ? wallet : '￥'" unit="元"></IndexActivity>
            <IndexActivity title="红包" color="#ff5f3e" :icon="money ? money : '￥'" unit="个"></IndexActivity>
            <IndexActivity title="金币" color="#6ac20b" :icon="gold ? gold : '￥'" unit="个"></IndexActivity>
        </div>
        <div id="main">
            <div id="addr">
                <div class="left addrIcon">&#xe61c;</div>
                <Item title="我的地址"></Item>
            </div>
            <div id="acti_item">
                <div class="left acitIcon1">&#xe65a;</div>
                <Item title="金币商城"></Item>
                <div class="left acitIcon2">&#xe61a;</div>
                <Item title="分享拿10元现金"></Item>
            </div>
            <div id="my_item">
                <div class="left myIcon1">&#xe711;</div>
                <Item title="我的客服"></Item>
                <div class="left myIcon2">&#xe722;</div>
                <Item title="下载饿了么App"></Item>
            </div>
        </div>
    </div>
</template>

<script>
import Toptitle from "@/components/top-title"
import User from "@/components/my/user"
import IndexActivity from "@/components/my/index-activity"
import Item from "@/components/my/item"
    export default {
        name : "my",
        data(){
            return {
                wallet : localStorage.wallet,
                money : localStorage.money,
                gold : localStorage.gold,
            }
        },
        components :{
            Toptitle,
            User,
            IndexActivity,
            Item
        }
    }
</script>

<style scoped>
@font-face {
  font-family: iconfont;
  src: url("../../font/iconfont.svg"), url("../../font/iconfont.woff"), url("../../font/iconfont.eot"), url("../../font/iconfont.ttf");
}
#activity{
    height : 0.71rem;
    background : #fff;
}
#addr{
    height: 0.38rem;
    margin-top : 0.2rem;
}
#acti_item{
    height: 0.76rem;
    margin : 0.2rem 0;
}
#my_item{
    height: 0.76rem;
}
.left{
    float: left;
    width : 11%;
    height : 0.38rem;
    font-family: iconfont;
    background : #fff;
    text-align: center;
    line-height: 0.38rem;
    font-size: 0.2rem;
}
#main{
    background : #fafafa;
    overflow: hidden;
}
.addrIcon{
    color : #4aa5f0;
}
.acitIcon1{
    font-size : 0.15rem;
    color : #94d94a;
}
.acitIcon2{
    font-size : 0.15rem;
    color : #fc7b53;
}
.myIcon1{
    font-size : 0.22rem;
    color : #4da6f0;
}
.myIcon2{
    font-size:0.22rem ;
    color : #3cabff;
}
</style>