<template>
    <div id="home">
        <top></top>
        <seek class="home_search"></seek>
        <div id="wrap_banner">
            <mt-swipe :auto="0">
                <mt-swipe-item>
                    <banner index="0"></banner>
                </mt-swipe-item>
                <mt-swipe-item>
                    <banner index="1"></banner>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div id="activity">
            <activity></activity>
        </div>
        <advBanner></advBanner>
        <p class="recommend">—推荐商家—</p>
        <div class="sort">
            <span>综合排序</span>
            <span>距离最近</span>
            <span>品质联盟</span>
            <span>筛选</span>
        </div>
        <div id="shop_wrap">
            <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="true"
                infinite-scroll-distance="10">
                <li v-for="(item,i) in $store.state.shopList" :key="i">
                    <shop :key="i" :shopInfo="item" :activityList="$store.state.activityList"></shop>
                </li>
                <mt-spinner v-if="$store.state.isLoading" type="fading-circle"></mt-spinner>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import top from "./top"
    import seek from "./seek"
    import banner from "./banner"
    import activity from "./activity"
    import advBanner from "./advbanner"
    import shop from "./shop"
    export default {
        name : "home",
        data(){
            return {
                shopList : [],
                activityList : [],
                pageIndex : 0,
            }
        },
        components : {
            top,
            seek,
            banner,
            activity,
            advBanner,
            shop
        },
        methods : {
            // getShop(){
            //     axios.get("/getShopList?pageIndex="+this.pageIndex).then(data=>{
            //         setTimeout(()=>{
            //             this.shopList  = this.shopList.concat(data.shopList);
            //             this.activityList = data.activityList;
            //             this.isLoading = true;
            //         },1000)
            //     })
            // },
            loadMore(){
                var _this = this;
                this.$store.commit("CHANGE_LOADING",true)
                this.pageIndex = ++ this.pageIndex;
                this.$store.dispatch("getShop",{
                    pageIndex :　this.pageIndex,
                })
            },
            scorll(){
                var oSearch = document.querySelector(".home_search");
                window.onscroll = function(){
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    if(scrollTop >= 58){
                        oSearch.style.position = "fixed";
                        oSearch.style.top = "0";
                        oSearch.style.zIndex = "99";
                    }else{
                        oSearch.style.position = "";
                    }
                }
            }
        },
        created() {
            // this.$store.dispatch("getShop",1);
        },
        mounted(){
            this.$store.dispatch("getShopType");
            this.scorll();
            
        }
    }
</script>

<style>
#wrap_banner{
    height: 1.53rem;
    background : #fff;
}
 .mint-swipe-indicators{
    bottom : -0.14rem !important;
}
.mint-swipe-indicator{
    width : 0.08rem !important;
    height : 0.02rem !important;
    border-radius : 0 !important;
}
.mint-swipe-indicator.is-active{
    background : #666 !important;
}
#activity{
    height: 1.22rem;
}
#shop_wrap{
    margin-bottom : 0.44rem;
}
.mt-spinner{
    height : 0.4rem;
}
#shop_wrap .mint-spinner-fading-circle{
    height: 60px !important;
    width:60px !important;
    margin: 0 auto !important;
}
.recommend{
    font-size : 0.13rem;
    text-align: center;
    line-height: 0.3rem;
    font-weight: 700;
}
.sort{
    height: 0.4rem;
    background : #fff;
}
.sort span{
    display: block;
    float:left;
    width : 25%;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.13rem;
    border-bottom : 0.01rem solid #ddd;
}
</style>
