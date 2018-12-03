<template>
    <div class="goods">
        <div class="goodsPic"><img :src="goodsInfo.goodsPic | imgUrl" alt=""></div>
        <div class="goodsInfo">
            <h4  @click="$router.push('/shopdetail/goodsdetail/'+goodsInfo._id)">{{goodsInfo.goodsName}}</h4>
            <p class="goodsPre">食材：鸡排+培根+叉烧+鸡柳+虾仁+火腿</p>
            <p class="sale">只做最美的自己，品尝最美的味道</p>
            <p class="price">
                {{goodsInfo.goodsPrice | currency}}
                <!-- <span class="add">+</span> -->
                <!-- <btn class="btn" sign="+" @changeCount="changeCon" :goodsId="goodsInfo._id" addNum="1"></btn>
                <span  class="count">{{$store.state.goodscount}}</span>
                <btn class="btn"  sign="-" @changeCount="changeCon" :goodsId="goodsInfo._id" addNum="-1"></btn> -->
                <btn :goodsId="goodsInfo._id" v-if="$store.state.carList.find(v=>v.goodsId == goodsInfo._id)"  :count="$store.state.carList.find(v=>v.goodsId == goodsInfo._id).count"></btn>
                <span class="add" v-else @click="addCar(goodsInfo._id,1)">+</span>
                <!-- $store.state.carList.find(v=>{v.goodsId === goodsInfo._id}).count -->
            </p>
        </div>
    </div>
</template>

<script>
    import btn from "../shopCar/btn"
    import axios from "axios"
    export default {
        name : "goods",
        props : ["goodsInfo"],
        data(){
            return {
                count : 0,
                carList : this.$store.state.carList || []
            }
        },
        components : {
            btn
        },
        methods :{
            addCar(id,num){
                axios.post("/addCar",{
                    userId : localStorage.userId,
                    goodsId : id,
                    addNum : num
                }).then(data=>{
                    if(data.ok===1){
                        this.$store.dispatch("getcarList");
                    }
                })
            },
        },
        mounted() {
            this.$store.dispatch("getcarList");
        },
    }
</script>

<style scoped>
.goods{
    height: 1rem;
    margin-bottom: 0.2rem;
}
.goodsPic{
    width: 30%;
}
.goods img{
    float: left;
    width: 100%;
    height: 0.8rem;
}
.goodsInfo{
    width: 65%;
    height : 0.8rem;
    font-size: 0.14rem;
    box-sizing: border-box;
    padding-right: 0.1rem;
    margin-left : 5%;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}
.goodsPre{
    height: 0.15rem;
    color : #999;
    font-size: 0.08rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
}
.sale{
    height: 0.15rem;
    color : #999;
    font-size: 0.08rem;
}
.price{
    font-size: 0.15rem;
    height: 0.3rem;
    padding-top: 0.08rem;
    /* line-height: 0.3rem; */
    color: rgb(255, 83, 57);
}
.btn{
    margin-top: 0.05rem;
}
.count{
    float : right;
    margin : 0 0.1rem;
    color : #666;
}
.add{
    float: right;
    width : 0.17rem;
    height :0.17rem;
    border-radius: 50%;
    text-align: center;
    line-height: 0.14rem;
    font-size: 0.2rem;
    font-weight: bolder;
    background: rgb(35, 149, 255);
    color:#fff;
}
</style>