<template>
  <div id="app">
    <el-form :model="RegForm" status-icon :rules="rules" ref="regForm" label-width="100px" class="demo-ruleForm">
      <h3>饿了么后台管理系统</h3>
      <el-form-item label="姓名" prop="adminName">
        <el-input type="text" v-model="RegForm.adminName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input type="password" v-model="RegForm.passWord" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passWord2">
        <el-input type="password" v-model="RegForm.passWord2" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input type="text" v-model="RegForm.phone" />
      </el-form-item>
      <el-form-item label="验证码" prop="valiCode">
        <el-input type="text" v-model="RegForm.valiCode" style="width:100px"/>
        <el-button class="code" type="primary" style="width:100px" @click="sendCode">发送验证码</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="$store.state.admin.isLoadingReg" @click="submitForm('regForm')">注册</el-button>
        <el-button type="primary" @click="$store.commit('CHANGE_COMPONENT',0)">去登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from "axios"
  export default {
    name: 'App',
    data(){
      var validateName = (rule, value, callback) => {
        if(! /^[\u4e00-\u9fa5]{2,4}$/.test(value)){
          callback(new Error("用户名2-4个中文"))
        }else{
          callback();
        }
      };
      var validatePass = (rule,value,callback)=>{
        if(! /^\w{6,16}$/.test(value)){
          callback(new Error("请输入6-16位的密码，由数字字母下划线组成"))
        }else{
          callback()
        }
      };
      var validatePass2 = (rule,value,callback)=>{
        if(this.RegForm.passWord !== this.RegForm.passWord2){
          callback(new Error("两次密码不一致，请重新输入"))
        }else{
          callback();
        }
      }
      var validatePhone = (rule,value,callback) =>{
        if(! /^1[3|5|7|8|9]\d{9}$/.test(value)){
          callback(new Error("请输入正确的手机格式"))
        }else{
          this.flag = true;
          callback()
        }
      }
      return {
        rules : {
          adminName : [
            { required:true,message:"请输入管理员账号", trigger: 'blur' },
            { validator: validateName, trigger: 'blur' }
          ],
          passWord : [
            { required:true,message:"请输入密码", trigger: 'blur'},
            { validator: validatePass, trigger: 'blur' }
          ],
          passWord2 : [
            { required:true,message:"请输入密码", trigger: 'blur'},
            { validator: validatePass2, trigger: 'blur' }
          ],
          phone : [
            { required : true,message:"请输入密码",trigger:'blur'},
            { validator: validatePhone, trigger: 'blur' }
          ],
          valiCode : [
            { required : true,message:"请输入验证码",trigger:'blur'},
          ]
        },
        RegForm : {
          adminName : "",
          passWord : "",
          passWord2 : "",
          phone : "",
          valiCode : "",
        },
        flag : false,
        isLoadingReg : false
      }
    },
    components : {},
    methods : {
      submitForm(regForm){
        this.isLoading = true;  
        var _this = this;
        console.log(_this.flag)
        this.$refs[regForm].validate((valid)=>{
          console.log(111111,_this.flag)
          // if(_this.flag){
          //   if(valid){
          //   this.isLoadingReg = true;
          //   console.log(this.RegForm.phone);
          //   axios.post("/register",{
          //     adminName : this.RegForm.adminName,
          //     passWord : this.RegForm.passWord,
          //     phoneId : this.RegForm.phone,
          //     code : this.RegForm.valiCode
          //   }).then(data=>{
          //     if(data.ok === 1){
          //       this.$store.commit("CHANGE_COMPONENT",0);
          //       this.isLoadingReg = false;
          //     }else{
          //       alert(data.msg)
          //       this.isLoadingReg = false;
          //     }
          //   })
          // }else{
          //   console.log("submit error!");
          //   return false;
          // }
          // }else{
          //   this.$message.error("验证码已过期或未输入，请重新输入");
          //   return false;
          // }
        })
      },
      sendCode(){
        var _this = this;
        if(this.flag){
           axios.post("/sendCode",{
            phoneId : this.RegForm.phone
          }).then((data)=>{
            if(data.ok === 1){
              var btn = document.getElementsByClassName("code")[0];
              var time = 10;
              btn.innerHTML = time + "秒";
              this.RegForm.valiCode = data.code;
              btn.disabled = true;
              btn.style.opacity = ".3"
              var timer = setInterval(()=>{
                btn.innerHTML = -- time + "秒";
                if(time <= 0){
                  clearInterval(time);
                  btn.innerHTML = "发送验证码";
                  btn.disabled = true;
                  btn.style.opacity = "";  
                  _this.flag = false;
                  console.log(22222,_this.flag);
                }
              },1000)
            }else{
              this.$message.error(data.msg);
            }
          })
        }else{
          this.$message.error("请检查您的手机号是否正确填写");
        }
      }
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .demo-ruleForm{
    width: 350px;
    margin: 150px auto;
    padding: 35px 30px 15px 30px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 15px pink;
  }
  h3{
    text-align: center;
  }
</style>
