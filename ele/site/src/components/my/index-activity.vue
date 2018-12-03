<template>
    <div class="index-activity">
        <div v-if="isShow" class="act-icon" :style="{background : color}">{{icon}}</div>
        <p v-else class="show">
            <span :style="{'color' : color}">{{icon}}</span>
            <b  :style="{'color' : color}">{{unit}}</b>
        </p>
        <p class="act-title">{{title}}</p>
    </div>
</template>

<script>
    export default {
        name : "indexActivity",
        props : ["title","color","icon","unit"],
        data(){
            return {
                isShow : localStorage.userId ? false : true
            }
        }
    }
</script>

<style scoped>
.index-activity{
    width : 33%;
    float: left;
    height: 0.7rem;
    box-sizing: border-box;
    border-left : 1px solid #ddd;
    background : #fff;
    padding: 0.2rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.act-icon{
    width : 0.15rem;
    height: 0.15rem;
    font-size: 0.1rem;
    text-align: center;
    line-height: 0.15rem;
    color : #fff;
    border-radius: 50%;
}
.show{
    text-align: center;
    height: 0.15rem;
}
.show span{
    display: block;
    float : left;
    font-size: 0.2rem;
    margin-top: -0.1rem;
}
.show b{
    display: block;
    float: left;
    font-size: 0.08rem;
}
.act-title{
    height: 0.4rem;
    font-size: 0.1rem;
    margin-top: 0.05rem;
    color: #333;
}
</style>