<template>
    <!-- <span class="btn add" @click="addCar(goodsId,addNum)">{{sign}}</span> -->
    <div class="addBtn">
        <span  class="add" @click="addCar(goodsId,-1)">-</span>
        <span  class="count">{{count ? count : 0 }}</span>
        <span class="add" @click="addCar(goodsId,1)">+</span>
    </div>
</template>
<script>
    import axios from "axios"
    export default {
        name : "btn",
        props : ["sign","goodsId","count",""],
        methods : {
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
            getCarCount(id){
                axios.get("/getCarCount",{
                    params : {
                        goodsId : id,
                        userId : localStorage.userId
                    }
                }).then(data=>{
                    if(data.ok === 1)
                        state.goodscount = data.count
                })
             }
        },
        mounted(){
        //    this.getCarCount();
        }
    }
</script>

<style scoped>
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
.count{
    float : right;
    margin :0 0.05rem;
    height: 0.17rem;
}
.addBtn{
    width : 0.7rem;
    height: 0.3rem;
    box-sizing: border-box;
    float : right;
}
</style>