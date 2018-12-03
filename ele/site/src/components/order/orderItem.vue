<template>
    <div class="orderItem">
        <orderGoods v-for="(v,i) in orderInfo.carList" :key="i" :goods="v"></orderGoods>
        <p>
            <span>总计：{{orderInfo.sum | currency}}</span>
            <button class="clearBtn" @click="deleteOrder(orderInfo._id)">删除</button>
        </p>
    </div>
</template>

<script>
    import orderGoods from "./orderGoods"
    import axios from "axios"
    export default {
        name : "orderItem",
        props : ["orderInfo"],
        components :　{
            orderGoods
        },
        methods : {
            deleteOrder(id){
                axios.delete("/deleteOrder",{
                    params : {
                        orderId : id
                    }
                }).then(data=>{
                    console.log(data)
                    if(data.ok === 1){
                        this.$store.dispatch("getOrderList");
                    }else{
                        alert(data.msg)
                    }
                })
            }
        }
    }
</script>

<style scoped>
.orderItem{
    margin-bottom : 0.2rem;
    border-top:0.01rem solid #eee;
    border-bottom:0.01rem solid #eee;
}
p{
    text-align: right;
    font-size: 0.13rem;
    margin-right: 0.2rem;
    color :#ff7315;
}
.clearBtn{
    padding : 0.02rem;
    font-size: 0.13rem;
    color : #fff;
    background :chartreuse;
    border : 0;
    margin-left : 0.2rem;
}
</style>