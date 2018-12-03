<template>
    <div class="shopcar-bottom">
        <div class="goodsBuy" v-if="open">
            <div class="BuyTop">
                <span class="select-goods">已选商品</span>
                <span class="ck" @click="clearCar">清空</span>
            </div>
            <ul>
                <li v-for="(item,i) in $store.state.carList" :key="i">
                    <openCar :carInfo="item"></openCar>
                </li>
                <!-- <li v-for="(item,i) in carList" :key="i">
                    <openCar :carInfo="item" :getCar="getCar.bind(this)"></openCar>
                </li> -->
            </ul>
        </div>
        <div class="car" @click="openCar">
            <span>&#xe61d;</span>
            <b class="carCount" v-if="this.$store.state.count">{{this.$store.state.count}}</b>
        </div>
        <div class="detail">
            <p :style="{color : this.$store.getters.txcolor,'font-size' : this.$store.getters.fsize}">{{this.$store.state.count ? '￥'+ this.$store.getters.allMoney : '未选购商品'}}</p>
            <p>另需配送费8.5元</p>
        </div>
        <div class="money" :style="{'background' : this.$store.getters.bgColor}" @click="balance">{{this.$store.getters.balanced}}</div>
    </div>
</template>

<script>
    import { MessageBox,Toast } from 'mint-ui';
    import openCar from "./openCar"
    import axios from "axios"
    export default {
        name : "shopCarBottom",
        data(){
            return {
                open : false,
                carList : [],
                // count : 0,
            }
        },
        components : {
            openCar
        },
        computed : {
            // balanced(){
            //    return this.count ? "去结算" : "20元起送"
            // },
            // bgColor(){
            //     return this.count ? "#38ca73" : ""
            // },
            // txcolor(){
            //     return this.count ? "#fff" : ""
            // },
            // fsize(){
            //     return this.count ? "0.14rem" : ""
            // },
            // allMoney(){
            //     var sum = 0;
            //     this.carList.forEach((v)=>{
            //         sum += v.count * v.goodsInfo[0].goodsPrice
            //     })
            //     return sum;
            // }
        },
        methods : {
            // getCar(){
            //     axios.get("/getCarList",{
            //             params : {
            //                 userId : localStorage.userId
            //             }
            //         }).then(data=>{
            //             if(data.ok === 1){
            //                 this.count = 0;
            //                 this.carList = data.carList;
            //                 data.carList.forEach((v)=>{
            //                     this.count += v.count;
            //                 })
            //             }else{
            //                 alert(data.msg);
            //             }
            //         })
            // },
            openCar(){
                this.open = ! this.open;
                if(this.open){
                    this.$store.dispatch("getcarList");
                }
            },
            clearCar(){
                axios.delete("/clearCar",{
                    params :　{
                        userId : localStorage.userId
                    }
                }).then(data=>{
                    console.log(data);
                    this.$store.dispatch("getcarList");
                })
            },
            balance(){
                if(this.$store.getters.allMoney > localStorage.gold){
                    alert("您的资金不足，请充值")
                }else{
                    axios.post("/balance",{
                        money : this.$store.getters.allMoney,
                        userId : localStorage.userId
                    }).then(data=>{
                        if(data.ok === 1){
                            MessageBox.confirm('确认购买?').then(() => {
                                axios.post("/confirmBuy",{
                                    userId : localStorage.userId,
                                    orderId : data.orderId
                                }).then(data=>{
                                    if(data.ok === 1){
                                        localStorage.gold = data.gold;
                                        Toast({
                                            message: '支付成功',
                                            iconClass: 'icon icon-success'
                                        });
                                        this.$store.dispatch("getcarList");
                                    }
                                })
                            }).catch(()=>{
                                Toast({
                                    message: '您已取消付款',
                                    iconClass: 'icon icon-success'
                                });
                            });
                        }
                    })
                }
            }
        },
        mounted(){
        }
    }
</script>

<style scoped>
@font-face {
  font-family: iconfont;
  src: url("../../font/iconfont.svg"), url("../../font/iconfont.woff"), url("../../font/iconfont.eot"), url("../../font/iconfont.ttf");
}
.shopcar-bottom{
    height: 0.5rem;
    font-family: iconfont;
    background: rgba(61,61,63,.9);
    position: fixed;
    left: 0;
    right: 0;
    bottom : 0;
    z-index: 99;
}
.goodsBuy{
    position : absolute;
    bottom : 0.5rem;
    left : 0;
    right : 0;
}
.BuyTop{
    height : 0.3rem;
    background : #eceff1;
    color : #666;
}
.ck{
    float : right;
    line-height: 0.3rem;
    font-size: 0.12rem;
    margin-right: 0.1rem;
}
.select-goods{
    float:left;
    font-size: 0.12rem;
    line-height: 0.3rem;
    text-indent: 0.1rem;
}
.car{
    width: 0.3rem;
    height: 0.3rem;
    float: left;
    border-radius : 50%;
    border: 0.05rem solid #444;
    background: #363636;
    margin-left : 0.1rem;
    margin-top:-0.1rem;
    font-size: 0.25rem;
    color:#999;
    position: relative;
}
.carCount{
    position : absolute;
    width: 0.15rem;
    height: 0.15rem;
    border-radius: 50%;
    right: -0.05rem;
    top : -0.05rem;
    color:#fff;
    font-size: 0.06rem;
    text-align: center;
    font-weight: 100;
    background : linear-gradient(-90deg,#ff7416,#ff3c15 98%);
}
.detail{
    height: 0.5rem;
    float : left;
    font-size: 0.1rem;
    color: #999;
    padding-left: 0.2rem;
    padding-top : 0.1rem;
}
.detail p{
    height: 0.15rem;
    line-height: 0.15rem;
}
.money{
    float:right;
    width: 1rem;
    height: 0.5rem;
    background: pink;
    font-size : 0.12rem;
    background: #535356;
    color: #fff;
    text-align: center;
    line-height: 0.5rem;
}
ul{
    background:#fff;
}
</style>