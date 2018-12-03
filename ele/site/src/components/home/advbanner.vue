<template>
    <div id="adv_banner">
        <mt-swipe :show-indicators="false">
            <mt-swipe-item>
                <img src="../../img/banner1.jpeg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="../../img/banner2.jpg" class="img2" alt="">
            </mt-swipe-item>
        </mt-swipe>

    </div>
</template>

<script>
    export default {
        name:"advBanner"
    }
</script>

<style scoped>
#adv_banner{
    height: 1rem;
    border-bottom: 1px solid solid;
}
img{
    width: 100%
}
img.img2{
    width: 96%;
    height: 76%;
    display: block;
    margin: 3% auto
}
</style>