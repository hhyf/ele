<template>
    <div class="openCar">
        <div class="goodsName">{{carInfo.goodsInfo[0].goodsName}}</div>
        <div class="goodsPrice"><span>￥</span>{{carInfo.goodsInfo[0].goodsPrice * carInfo.count}}</div>
        <div class="addordown">
            <btn :goodsId="carInfo.goodsInfo[0]._id" :count="carInfo.count"></btn>
            <!-- <btn sign="-" addNum="-1" :goodsId="carInfo.goodsInfo[0]._id"></btn>
            <span class="count">{{carInfo.count}}</span>
            <btn sign="+" addNum="1" :goodsId="carInfo.goodsInfo[0]._id"></btn> -->
        </div>
    </div>
</template>

<script>
    import btn from "./btn"
    export default {
        name : "openCar",
        props : ["carInfo"],
        components :{
            btn
        }
    }
</script>

<style scoped>
.openCar{
    height : 0.4rem;
    padding: 0.05rem 0.1rem;
    font-size: 0.12rem;
    background: #fff;
}
.goodsName{
    width: 60%;
    line-height: 0.4rem;
    float : left;
}
.goodsPrice{
    width : 10%;
    line-height: 0.4rem;
    float : left;
    color : rgb(255, 83, 57);
}
.addordown{
    width: 30%;
    float: left;
    margin-top:0.1rem;
}
.count{
    float: right;
    width : 0.2rem;
    height: 0.2rem;
    margin-left: 0.1rem;
}
</style>