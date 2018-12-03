<template>
    <el-form :model="UpForm" status-icon :rules="rules" ref="UpForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="passWord">
            <el-input type="password" v-model="UpForm.passWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="passWord2">
            <el-input type="password" v-model="UpForm.passWord2" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" :loading="$store.state.admin.isLoadingReg" @click="updatePwd">确认</el-button>
            <el-button type="info" >重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "updatepwd",
        data(){
            var validatePass = (rule,value,callback)=>{
                if(! /^\w{6,16}$/.test(value)){
                    callback(new Error("请输入6-16位的密码，由数字字母下划线组成"))
                }else{
                    callback()
                }
            };
            var validatePass2 = (rule,value,callback)=>{
                if(! /^\w{6,16}$/.test(value)){
                    callback(new Error("请输入6-16位的密码，由数字字母下划线组成"))
                }else{
                    callback()
                }
            };
            return {
                rules : {
                    passWord : [{required:true,message:"请输入旧密码",trigger:'blur'},
                        { validator: validatePass, trigger: 'blur' }],
                    passWord2 : [{required:true,message:"请输入新密码",trigger:'blur'},
                        { validator: validatePass2, trigger: 'blur' }]
                },
                UpForm : {
                    passWord : "",
                    passWord2 : ""
                }
            }
        },
        methods : {
            updatePwd(){
                var _this = this;
                this.$store.dispatch('updatePwd',{
                    adminId:localStorage.id,
                    oldPwd : this.UpForm.passWord,
                    newPwd : this.UpForm.passWord2,
                    success(){
                        setTimeout(() => {
                            _this.$store.commit("OUT_LOGIN");
                        }, 1000);
                    }
                })
            }
        }
    }
</script>

<style scoped>
.demo-ruleForm{
    width: 350px;
    margin: 50px auto;
    border: 1px solid #000;
    padding: 30px 35px 15px 30px;
}

</style>
