<template>
    <div class="userName">
        <topTitle title="换绑手机"></topTitle>
        <form>
            <p>
                <label for="re-phone" class="leb">手机号</label>
                <input type="text" v-model="phone"  class="txt phone">
                <input type="button" class="sendcode" @click="sendCode" value="获取验证码">
            </p>
            <p>
                <label for="re-code" class="leb">验证码</label>
                <input id="re-code" class="txt code" v-model="code" type="text" placeholder="请输入验证码">
            </p>
        </form>
        <p>
            <input type="button" class="btn" @click="changePhone" :value="vadl">
        </p>
    </div>
</template>

<script>
    import topTitle from "../top-title"
    import axios from "axios"
    export default {
        name : "userName",
        components : {
            topTitle
        },
        data(){
            return {
                phone : localStorage.phoneId,
                code : "",
                timer : null,
                dis : true,
                vadl : "验证后绑定新手机号"
            }
        },
        methods : {
            //获得验证码
            sendCode(){
                var obtn = document.querySelector(".sendcode")
                axios.post("/sendCode",{
                    phoneId : localStorage.phoneId
                    }).then(data=>{
                    if(data.ok === 1){
                        var time = 30;
                        this.code = data.code;
                        obtn.disabled = "false"
                        obtn.value = "已发送(30S)"
                        this.timer = setInterval(()=>{
                             obtn.value = "已发送("+ --time + "S)";
                            if(time <= 0){
                                clearInterval(this.timer);
                                obtn.value = "重新获取";
                                obtn.disabled = "true";
                            }
                        },1000)
                    }else{
                        alert(data.msg)
                    }
                })
            },

            //更换手机号码
            changePhone(){
                if(localStorage.phoneId){
                    axios.post("/submitCode",{
                        code : this.code,
                        phoneId : localStorage.phoneId
                    }).then(data=>{
                        if(data.ok === 1){
                            this.phone = "";
                            this.code = "";
                            clearInterval(this.timer);
                            document.querySelector(".phone").disabled = "false";
                            document.querySelector(".sendcode").value = "获取验证码";
                            this.vadl = "提交";
                            document.querySelector(".sendcode").disabled = "true";
                            localStorage.removeItem("phoneId");
                        }else{
                            alert(data.msg)
                        }
                    })
                }else{
                    axios.put("/updatePhone",{
                        userId : localStorage.userId,
                        phoneId : this.phone
                    }).then(data=>{
                        if(data.ok === 1){
                            localStorage.phoneId = this.phone;
                            this.$router.go(-1);
                        }else{
                            alert(data.msg)
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped>
form{
    padding: 0.1rem;
    background : #fff;
    font-size: 0.12rem;
}
.leb{
    float : left;
    height: 0.4rem;
    line-height: 0.4rem;
    border : 0;
    margin-right : 0.3rem;
}
.sendcode{
    background:#0097ff;
    border : 0;
    color:#fff;
    padding: 0.05rem 0.1rem;
    border-radius: 0.05rem;
    margin-top:0.08rem;
}
.txt{
    line-height: 0.4rem;
    border : 0;
    height: 0.4rem;
    font-size: 0.12rem;
    background : #fff;
}
p{
    height: 0.4rem;
}
.btn{
    display: block;
    width: 2.8rem;
    margin : 0 auto;
    height: 0.4rem;
    font-size: 0.13rem;
    color : rgba(0,0,0,.8);
    background : rgba(0,0,0,.06);
    border : 0;
}
</style>