<template>
    <div id="search">
        <topTitle title="发现"></topTitle>
        <div>
            <img src="../../img/253ca6a440ced6fa22044a96e6721jpeg.jpeg" alt="">
        </div>
        <div class="search_act">
            <div class="search_left">
                <p style="color:rgb(255, 153, 0)">金币商城</p>
                <p class="word">0元好物在这里</p>
            </div>
            <div class="search_right">
                <div>
                    <p style="color:rgb(27, 169, 225)">推荐有奖</p>
                    <p  class="word">10元现金拿不停</p>
                </div>
                <div>
                    <p style="color:rgb(237, 102, 96)">周边优惠</p>
                    <p  class="word">领取口碑好券</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import topTitle from "../top-title"
    export default {
        name : "search",
        components : {
            topTitle
        }
    }
</script>

<style scoped>
#search img{
    width : 100%;
}
.search_act{
    height: 1.4rem;
}
.search_left,.search_right{
    float : left;
    width:50%;
    height: 100%;
    font-size: 0.12rem;
    text-indent: 0.2rem
}
.search_left{
    padding-right:0.2rem;
    padding-top : 0.15rem;
    box-sizing: border-box;
    background : url(../../img/img1.jpeg) no-repeat right bottom/0.7rem 0.7rem;
    border-right: 0.01rem solid #eee;
}
.search_right div{
    height: 50%;
    font-size: 0.12rem;
    padding-top: 0.15rem;
}
.search_right div:nth-of-type(1){
    border-bottom : 0.01rem solid #eee;
    background : url(../../img/img2.jpeg) no-repeat right center/0.4rem 0.4rem
}
.search_right div:nth-of-type(2){
    background : url(../../img/img3.jpeg) no-repeat right center/0.35rem 0.35rem
}
.word{
    font-size:0.1rem;
    color : #999;
    margin-top : 0.05rem;
}
</style>