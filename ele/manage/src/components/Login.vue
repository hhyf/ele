<template>
  <div id="app">
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
      <h3>饿了么后台管理系统</h3>
      <el-form-item label="姓名" prop="adminName">
        <el-input type="text" v-model="loginForm.adminName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input type="password" v-model="loginForm.passWord" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="$store.state.admin.isLoadingLogin" @click="submitForm('loginForm')">登录</el-button>
        <el-button type="primary" @click="$store.commit('CHANGE_COMPONENT',2)">去注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
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
      }
      return {
        isLoading : false,
        rules : {
          adminName : [
            { required:true,message:"请输入管理员账号", trigger: 'blur' },
            { validator: validateName, trigger: 'blur' }
          ],
          passWord : [
            { required:true,message:"请输入密码", trigger: 'blur'},
            { validator: validatePass, trigger: 'blur' }
          ]
        },
        loginForm : {
          adminName : "",
          passWord : ""
        }
      }
    },
    components : {},
    methods : {
      submitForm(formName) {
        this.isLoading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('login',{
              adminName : this.loginForm.adminName,
              passWord : this.loginForm.passWord
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
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
