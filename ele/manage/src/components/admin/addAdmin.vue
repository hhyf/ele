<template>
    <div id="app">
        <el-form :model="RegForm" status-icon :rules="rules" ref="regForm" label-width="100px" class="demo-ruleForm">
            <h3>新增管理员</h3>
            <el-form-item label="姓名" prop="adminName">
                <el-input type="text" v-model="RegForm.adminName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-select placeholder="请选择" v-model="type">
                    <el-option :key = "'1'" :label = "'超级管理员'" :value="'1'">超级管理员</el-option>
                    <el-option  :key = "'2'" :label = "'普通管理员'" :value="'2'">普通管理员</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
                <el-input type="password" v-model="RegForm.passWord" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passWord2">
                <el-input type="password" v-model="RegForm.passWord2" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="$store.state.admin.isLoadingReg" @click="submitForm('regForm')">提交</el-button>
                <el-button type="primary">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'addAdmin',
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
                    ]
                },
                RegForm : {
                    adminName : "",
                    passWord : "",
                    passWord2 : ""
                },
                type : ""
            }
        },
        components : {},
        methods : {
            submitForm(regForm){
                this.isLoading = true;
                console.log(this.type)
                this.$refs[regForm].validate((valid)=>{
                    if(valid){
                        this.$store.dispatch('register',{
                            adminName : this.RegForm.adminName,
                            passWord : this.RegForm.passWord
                        });
                    }else{
                        console.log("submit error!");
                        return false;
                    }
                })
            }
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
        margin-top: 30px;
    }
    .demo-ruleForm{
        width: 350px;
        margin: 50px auto;
        padding: 35px 30px 15px 30px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 15px pink;
    }
    h3{
        text-align: center;
        line-height: 45px;
    }
</style>
