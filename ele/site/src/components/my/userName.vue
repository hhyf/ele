<template>
    <div class="userName">
        <topTitle title="账户信息"></topTitle>
        <p><input type="text" v-model="userName" :placeholder="name"></p>
        <p class="label_username">用户名只能修改一次（5-24个字）</p>
        <p class="btn_p"><input type="button" class="btn" @click="updateName" value="确认修改"></p>
    </div>
</template>

<script>
    import axios from "axios"
    import topTitle from "../top-title"
    export default {
        name : "userName",
        components : {
            topTitle
        },
        data(){
            return {
                userName : "",
                name : localStorage.userName ? localStorage.userName : '用户名'
            }
        },
        methods : {
            updateName(){
                axios.put("/updateName",{
                    userId : localStorage.userId,
                    userName : this.userName
                }).then(data=>{
                    if(data.ok === 1){
                        localStorage.userName = this.userName;
                        this.$router.go(-1)
                    }else{
                        alert(data.msg)
                    }
                })
            }
            
        }
    }
</script>

<style scoped>
.userName{
    height: 5.68rem;
    background: #f5f5f5;
}
p{
    margin-top:0.1rem;
    height: 0.42rem;
    font-size: 0.1rem;
    background : #fff;
}
.label_username{
    height: 0.2rem;
    background : #f5f5f5;
    text-indent: 0.15rem;
    color : #a9a9a9;
}
input{
    border: 0;
    display: block;
    height: 0.4rem;
    font-size: 0.13rem;
    line-height: 0.4rem;
    text-indent: 0.15rem;
}
.btn{
    width: 2.8rem;
    border-radius: 0.05rem;
    text-align: center;
    font-size: 0.135rem;
    height: 0.4rem;
    line-height: 0.4rem;
    margin : 0 auto;
    color: #fff;
    background: #c7c7c7;
}
.btn_p{
    background : #f5f5f5;
}
</style>