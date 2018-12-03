<template>
    <div class="goodsType" @click="getGoods(goodsTypeId)">
        {{goodsTypeName}}
    </div>
</template>

<script>
    export default {
        name : "goodsType",
        props : ["goodsTypeName","goodsTypeId","index"],
        methods : {
            getGoods(goodsTypeId){
                this.$store.dispatch("getGoodsTypeGoods",{goodsTypeId});
            }
        }
    }
</script>

<style scoped>
.goodsType{
    height : 0.2rem;
    padding: 0.08rem; 
    font-size: 0.1rem;
    line-height: 0.2rem;
    color: #666;
    text-align: center
}
</style>