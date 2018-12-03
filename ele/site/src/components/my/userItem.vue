<template>
    <div class="userItem">
        <div class="info-left">{{title}}</div>
        <div class="info-link" @click="toLink(path)">&gt;</div>
        <span class="info-right">{{dec}}</span>
    </div>
</template>

<script>
    import userItem from "./userItem"
    export default {
        name : "userItem",
        props : ["title","dec","path"],
        components : {
            userItem
        },
        methods : {
            toLink(path){
                this.$router.push(path);
            }
        }
    }
</script>

<style scoped>
.userItem{
    background : #fff;
    padding: 0.12rem;
    overflow: hidden;
}
.info-left{
    float : left;
    font-size: 0.12rem;
    font-weight: bold;
}
.info-right{
    float : right;
    font-size: 0.12rem;
    margin-right : 0.1rem;
    color : #666;
}
.info-link{
    float : right;
    font-size: 0.08rem;
    color : #eee;
}
</style>