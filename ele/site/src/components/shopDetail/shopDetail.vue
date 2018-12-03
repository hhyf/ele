<template>
    <div class="shopDetail">
        <shopTop class="shopTop" :shopDetailInfo="$store.state.shopDetailInfo"></shopTop>
        <ul class="aside">
            <li v-for="(item,i) in $store.state.shopDetailInfo.goodsTypeList" :key="i" >
                <goodsType :goodsTypeName="item.goodsTypeName" :goodsTypeId="item._id" :index="i"></goodsType>
            </li>
        </ul>
        <section>
            <goods v-for="(item,i) in $store.state.shopDetailInfo.goodsList" :key="i" :goodsInfo="item"></goods>
        </section>
        <div>
            <shopCarBottom></shopCarBottom>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import shopTop from "./shop-top"
    import goodsType from "./goodsType"
    import goods from "./goods"
    import shopCarBottom from "../shopCar/shopcar-bottom"
    export default {
        name : "shopDetail",
        data(){
            return {
                shopDetailInfo : {},
            }
        },
        components : {
            shopTop,
            goodsType,
            goods,
            shopCarBottom
        },
        methods : {
            scutionTop(){
                var oAside = document.querySelector(".aside");
                var shopTop = document.querySelector(".shopTop")
                window.onscroll = function(){
                    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                    if(scrollTop >= 100){
                        oAside.style.position = "fixed";
                        shopTop.style.position = "fixed";
                        shopTop.style.top = "-100px";
                        oAside.style.top = "120px";
                    }else{
                        oAside.style.position = "";
                        shopTop.style.position = "";
                    }
                }
            },
            addClass(){
                var oli = document.querySelectorAll("li");
                for(let i = 0;i < oli.length;i ++){
                    oli[i].onclick = function(){
                        for(var j = 0;j < oli.length;j ++){
                            oli[j].style.background = "";
                            oli[i].style.background = "#fff"
                        }
                    }
                }
            }
        },
        mounted(){
            this.$store.dispatch("getShopGoods",{
                shopId : this.$route.params.id
            })
            this.$store.dispatch("getcarList");
            this.scutionTop();
            this.addClass();
        }
    }
</script>

<style scoped>
.aside{
    width: 25% ;
    background : #f8f8f8;
    float : left;
}
section{
    width : 70%;
    float: right;
    margin-bottom : 0.5rem;
}
</style>