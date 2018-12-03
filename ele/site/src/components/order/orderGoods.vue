<template>
    <div class="orderGoods">
        <div class="orderGoods_pic">
            <img :src="goods.goodsInfo[0].goodsPic | imgUrl" alt="">
        </div>
        <div class="orderGoods_name">{{goods.goodsInfo[0].goodsName}}</div>
        <div class="orderGoods_price">{{goods.goodsInfo[0].goodsPrice | currency}}</div>
        <div class="orderGoods_count">{{goods.count}}</div>
    </div>
</template>

<script>
    export default {
        name : "orderGoods",
        props : ["goods"]
    }
</script>

<style scoped>
.orderGoods{
    height: 0.6rem;
    box-sizing: border-box;
    font-size : 0.12rem;
    padding: 0.05rem 0.1rem;
}
.orderGoods_pic{
    float: left;
    width : 25%;
    height: 0.6rem;
}
.orderGoods_pic img{
    width : 0.6rem;
    height: 0.6rem;
}
.orderGoods_name,.orderGoods_price,.orderGoods_count{
    float: left;
     width : 25%;
    line-height: 0.6rem;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>