<template>
    <div id="userInfo">
        <topTitle title="账户信息"></topTitle>
        <div class="user-Info">
            <user-item title = "头像" :dec="userPic" path=""></user-item>
            <user-item title = "用户名" :dec="userName" path="/my/username"></user-item>
        </div>
        <div>
            <p  class="user-label">账号绑定</p>
            <user-item title = "手机" :dec="phoneId" path="/my/rebind"></user-item>
        </div>
        <div>
            <p  class="user-label">安全设置</p>
            <user-item title = "密码登录" dec="修改" path="/my/updateinfo"></user-item>
        </div>
        <div class="reset-login" @click="exitLogin">
            退出登录
        </div>
    </div> 
</template>

<script>
    import topTitle from "../top-title"
    import userItem from "./userItem"
    export default {
        name : "userInfo",
        data(){
            return {
                userPic : "lalala",
                userName : localStorage.userName,
                phoneId : localStorage.phoneId
            }
        },
        components :{
            topTitle,
            userItem
        },
        methods : {
            exitLogin(){
                localStorage.clear();
                this.$router.push("/");
            }
        }
    }
</script>

<style scoped>
#userInfo{
    background : #f5f5f5;
    height: 5.68rem;
}
.user-Info{

}
.user-label{
    height : 0.3rem;
    font-size: 0.12rem;
    line-height: 0.3rem;
    color : #999;
    text-indent: 0.12rem;
}
.reset-login{
    text-align : center;
    line-height : 0.3rem;
    font-size: 0.14rem;
    color : #ff5339;
    font-weight: 700;
    background : #fff;
    margin-top : 0.2rem;
}
</style>