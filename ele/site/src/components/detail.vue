<template>
    <div class="detail">
        <topTitle :title="title"></topTitle>
        <div id="content">
            <shop v-for="(item,i) in num" :key="i" :index="i" :shopInfo="shopList[i]" :activityList="activityList"></shop>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import topTitle from "./top-title"
    import shop from "./home/shop"
    export default {
        name : "detail",
        data(){
            return {
                title : this.$route.params.name,
                shopList : [],
                activityList : [],
                num : 0
            }
        },
        components : {
            topTitle,
            shop
        },
        mounted() {
            axios.get("/getShopInfo",{params :{
                id : this.$route.params.id
            }}).then(data=>{
                console.log(data)
                this.shopList = data.shopList;
                this.activityList = data.activityList;
                this.num = data.pageNum;
            })
        },
    }
</script>

<style scoped>

</style>