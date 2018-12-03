<template>
    <div class="updateInfo">
        <topTitle title="账户信息"></topTitle>
        <form>
            <input type="password" placeholder="旧密码">
            <input type="password" placeholder="新密码">
            <input type="password" placeholder="确认密码">
        </form>
        <input type="button" class="btn" value="确认并保存">
    </div>
</template>

<script>
    import topTitle from "../top-title"
    export default {
        name : "updateInfo",
        components : {
            topTitle
        }
    }
</script>

<style scoped>
.updateInfo{
    height: 5.68rem;
    background : #f5f5f5;
}
form{
    height: 1.2rem;
    margin : 0 auto;
    background : #fff;
    padding: 0.05rem 0;
}
input{
    display: block;
    width: 3rem;
    height: 0.3rem;
    margin: 0 auto 0.1rem;
    background : #f2f2f2;
    border:0;
    text-indent: 0.1rem;
    font-size: 0.11rem;
    line-height: 0.3rem;
}
.btn{
    background : #ccc;
    color :#fff;
    text-align: center;
    height: 0.4rem;
    font-size: 0.145rem;
    line-height : 0.4rem;
    border-radius: 0.03rem;
    margin-top: 0.1rem;
}
</style>