<template>
    <div id="user" @click="enterUser">
        <div class="user_pic"></div>
        <div class="user_name">
            <p class="user_login">{{userName}}</p>
            <p class="user_pri">&#xe619;{{phoneId}}</p>
        </div>
        <div class="user_enter">
            &gt;
        </div>
    </div>
</template>

<script>
    export default {
        name : "user",
        data(){
            return {
                userName : localStorage.userName || "登录/注册",
                phoneId : localStorage.phoneId || '登录后享受更多特权'
            }
        },
        methods : {
            enterUser(){
                console.log(localStorage.userId)
                if(localStorage.userId){
                    this.$router.push('/my/userinfo');
                }else{
                    this.$router.push('/login');
                }
            }
        }
    }
</script>

<style scoped>
#user{
    height: 0.51rem;
    background-image: linear-gradient(90deg,#0af,#0085ff);
    padding: 0.2rem 0.12rem;
    font-family: iconfont;
}
.user_pic{
    width: 0.48rem;
    height:  0.48rem;
    border-radius: 50%;
    float: left;
    background : url(../../img/ele_user.png) no-repeat left top / cover;
}
.user_name{
    width: 1.8rem;
    height: 0.51rem;
    float: left;
    margin-left: 0.1rem;
    font-size: 0.12rem;
}
.user_login{
    height : 0.3rem;
    color : #fff;
    line-height: 0.3rem;
}
.user_pri{
    height: 0.2rem;
    color: #fff;
    line-height: 0.2rem;
}
.user_enter{
    float : right;
    height: 0.51rem;
    color: #fff;
    font-size: 0.13rem;
    line-height: 0.51rem;
}

</style>