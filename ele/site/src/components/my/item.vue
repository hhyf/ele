<template>
    <div class="item">
        <div class="item_title">{{title}}</div>
        <div class="item_link">&gt;</div>
    </div>
</template>

<script>
    import "../../font/iconfont.css"
    export default {
        name : "item",
        props : ["title","icon"],
        data(){
            return {
                // cicon : "&#xe65a;"
            }
        }
    }
</script>

<style scoped>
.item{
    height: 0.38rem;
    background : #fff;
    font-family: iconfont;
    float: right;
    width: 89%;
}

.item_title{
    float: left;
    font-size: 0.12rem;
    line-height: 0.37rem;
}
.item_link{
    float : right;
    font-size: 0.14rem;
    color : rgb(187, 187, 187);
    line-height: 0.38rem;
    padding-right: 0.2rem;
}
</style>