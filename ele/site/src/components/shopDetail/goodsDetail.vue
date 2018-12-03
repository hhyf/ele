<template>
    <div class="goodsDetail">
        <div class="goods_pic">
            <img :src="goodsInfo.goodsPic | imgUrl" alt="">
        </div>
        <a href="javascript:;" class="exit" @click="$router.go(-1)">x</a>
        <p>{{goodsInfo.goodsName}}</p>
        <p>月售352份</p>
        <p>
            {{goodsInfo.goodsPrice | currency}}
            <btn :goodsId="goodsInfo._id" v-if="$store.state.carList.find(v=>v.goodsId == goodsInfo._id)"  :count="$store.state.carList.find(v=>v.goodsId == goodsInfo._id).count"></btn>
            <span class="add btn" v-else @click="addCar(goodsInfo._id,1)">+</span>
        </p>
        <p>只做最美的自己，品尝最美的味道</p>
    </div>
</template>

<script>
    import axios from "axios"
    import btn from "../shopCar/btn"
    export default {
        name : "goodsDetail",
        data(){
            return {
                goodsInfo : {}
            }
        },
        components : {
            btn
        },
        methods : {
            getGoods(){
                axios.get("/getGoods",{
                    params :{
                         goodsId : this.$route.params.id
                    }
                }).then(data=>{
                    console.log(data)
                    if(data.ok === 1){
                        this.goodsInfo = data.goodsInfo;
                    }else{
                        alert(data.msg)
                    }
                })
            },
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
            this.getGoods();
        },
    }
</script>

<style scoped>
.goods_pic{
    height: 2.5rem;
}
.goods_pic img{
    width : 100%;
    height : 100%;
}
p{
    height: 0.3rem;
    padding-left: 0.2rem;
    font-size : 0.1rem;
}
p:nth-of-type(1){
    color: #000;
    font-size: 0.14rem;
}
p:nth-of-type(2){
    color: #999;
}
p:nth-of-type(4){
    color: #999;
}
p:nth-of-type(3){
    font-size: 0.11rem;
    color : rgb(255, 83, 57);
}
.add{
    float: right;
    margin-right: 0.3rem;
    width : 0.17rem;
    height :0.17rem;
    border-radius: 50%;
    text-align: center;
    line-height: 0.14rem;
    font-size: 0.2rem;
    font-weight: bolder;
    text-indent: 0;
    background: rgb(35, 149, 255);
    color:#fff;
}
.exit{
    width : 0.25rem;
    height: 0.25rem;
    font-size:0.16rem;
    text-decoration: none;
    color : #fff;
    background : #eee;
    position: absolute;
    top : 0.1rem;
    right:0.1rem;
    border-radius: 50%;
    text-align: center;
    line-height : 0.2rem;
}
</style>