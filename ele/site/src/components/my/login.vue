<template>
    <div id="login">
        <h1 class="logo" @click="$router.push('/home')">
            <img src="../../img/logo.jpg" alt="">
        </h1>
        <form>
            <div class="phone">
                <input type="text" class="txt phone" :style="{'border-color' : bcolor}" v-model="phoneId" maxlength="11" placeholder="手机号" @keyup="changeBtn">
                <button class="getCode" @click="getCode" :style="{'color' : color}" >获取验证码</button>
            </div>
            <input type="text" class="txt" :style="{'border-color' : tcolor}" v-model="code" placeholder="验证码">
            <p class="assess">新用户登录即自动注册，并表示已同意<a href="">《用户服务协议》</a></p>
            <input type="button" class="btn" @click="login" value="登录">
            <p class="about">关于我们</p>
        </form>
    </div>
</template>

<script>
    import axios from "axios"
    export default {
        name : "login",
        data(){
            return {
                phoneId : "",
                code : "",
                bcolor : "#ddd",
                tcolor : "#ddd",
                color : "#999",
                timer : null,
            }
        },
        methods : {
            getCode(){
                var otxt = document.querySelector(".getCode");
                axios.post("/sendCode",{
                    phoneId : this.phoneId
                    }).then(data=>{
                    if(data.ok === 1){
                        this.bcolor = "#ddd";
                        this.color = "#999";
                        this.tcolor = "rgb(35, 149, 255)";
                        this.code = data.code;
                        var time = 30;
                        otxt.innerHTML = "已发送(30S)"
                        this.timer = setInterval(()=>{
                            otxt.innerHTML = "已发送("+ --time + "S)";
                            if(time <= 0){
                                clearInterval(this.timer);
                                otxt.innerHTML = "重新获取"
                            }
                        },1000)
                    }else{
                        alert(data.msg)
                    }
                })
            },
            changeBtn(){
                this.bcolor = "rgb(35, 149, 255)";
                console.log(this.phoneId.length)
                var obtn = document.querySelector(".getCode");
                if(this.phoneId.length >=11){
                    obtn.disabled = false;
                    this.color = "rgb(35, 149, 255)"
                }else{
                    obtn.disabled = true;
                }
            },
            login(){
                axios.post("/login",{
                    phoneId : this.phoneId,
                    code : this.code
                }).then((data)=>{
                    if(data.ok === 1){
                        localStorage.userId = data.userId;
                        localStorage.userName = data.userName;
                        localStorage.phoneId = data.phoneId;
                        localStorage.wallet = data.wallet;
                        localStorage.money = data.money;
                        localStorage.gold = data.gold;
                        this.$router.push("/my");
                    }else{
                        alert(data.msg);
                    }
                })
            }
        }
    }
</script>

<style scoped>
*{margin:0;padding:0}
.logo{
    width: 2rem;
    height: 0.6rem;
    margin : 0.2rem auto;
}
.logo img{
    display: block;
    margin: 0.1rem auto;
}
#login form{
    width : 2.5rem;
    height: 2.5rem;
    margin-top : 0.5rem;
    margin : 0 auto;
}
.txt{
    display: block;
    width : 2.3rem;
    height: 0.4rem;
    margin: 0 auto;
    border: 0;
    margin-bottom : 0.1rem;
    box-sizing: border-box;
    padding-left: 0.1rem;
    border : 1px solid #ddd;
    border-radius: 0.05rem;
}
.phone{
    position : relative;
    margin:0 auto;
    margin-bottom : 0.1rem;
    width : 2.3rem;
    height: 0.4rem;
}
.getCode{
    color : #999;
    position: absolute;
    height: 0.35rem;
    right : 0.1rem;
    top : 0;
    bottom : 0;
    margin: auto;
    font-size: 0.1rem;
    background: #fff;
    border: 0
}
.btn{
    display: block;
    width : 2.3rem;
    height: 0.35rem;
    margin: 0 auto;
    border: 0;
    margin-bottom : 0.1rem;
    margin-top : 0.1rem;
    text-align: center;
    background : #4cd96f; 
    color : #fff;
    font-size: 0.14rem; 
    line-height: 0.35rem;  
    border-radius: 0.05rem;
}
.assess{
    font-size: 0.11rem;
    height: 0.3rem;
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    color : #999;
}
a{
    color : #2395ff;
    text-decoration: none;
}
.about{
    text-align: center;
    font-size: 0.1rem;
    color : #999;
}
</style>