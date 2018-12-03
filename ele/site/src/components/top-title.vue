<template>
    <div id="top-title">
        <mt-header :title="title"> 
            <a href="javascript:;" @click="toBefore" slot="left">
                <mt-button icon="back"></mt-button>
            </a>
        </mt-header>
    </div>
</template>

<script>
    export default {
        name : "shop-title",
        props : ["title"],
        methods : {
            toBefore(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style>
#top-title{
    height: 0.36rem;
    background-image: linear-gradient(90deg,#0af,#0085ff);
    text-align: center;
    font-size: 0.14rem;
    line-height: 0.36rem;
    color: #fff;
}
.mint-header-title{
    font-size: 0.14rem;
}
</style>