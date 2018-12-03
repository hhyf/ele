<template>
    <el-container class="ele_wrap">
        <el-header>
            <el-row>
                <el-col class="logo" :span="8" :style="{width : isCollapse ? '64px' : '240px'}">
                    <span>{{isCollapse ? '饿' : '饿了么管理系统'}}</span>
                </el-col>
                <el-col :span="8">
                    <i class="el-icon-d-arrow-right iconfont" @click="isCollapse = !isCollapse"></i>
                </el-col>
                <el-col class="admin" :span="8">
                    <el-dropdown style="float: right;">
                        <dl class="adminInfo">
                            <dt><img src="./assets/img/7fda1d17df3c4e9ba4f469682f3e6427.jpg" alt=""></dt>
                            <dd>{{adminName}}</dd>
                        </dl>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><span @click="$store.commit('OUT_LOGIN')">退出登陆</span></el-dropdown-item>
                            <el-dropdown-item><span @click="deleteAdmin">注销管理员</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="240px">
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse"
                         :collapse-transition="false">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">管理员</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1" @click="$router.push('/addAdmin')">新增管理员</el-menu-item>
                            <el-menu-item index="1-2" @click="$router.push('/adminLog')">查看管理员日志</el-menu-item>
                            <el-menu-item index="1-3" @click="$router.push('/updatePwd')">修改密码</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                        <el-menu-item index = '2' @click="$router.push('/shoptype')">
                            <i class="el-icon-menu"></i>
                            <span slot="title" >店铺类别</span>
                        </el-menu-item>
                    <el-menu-item index = '3' @click="$router.push('/shopList')">
                        <i class="el-icon-setting"></i>
                        <span slot="title">店铺</span>
                    </el-menu-item>
                    <el-menu-item index = '4' @click="$router.push('/goodsType')">
                        <i class="el-icon-menu"></i>
                        <span slot="title" >商品类别</span>
                    </el-menu-item>
                    <el-menu-item index = '5' @click="$router.push('/goodsList')">
                        <i class="el-icon-setting"></i>
                        <span slot="title" >商品</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main :style="{left:isCollapse ? '64px' : '240px'}">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
  export default {
    name: 'App',
      data(){
        return {
            isCollapse : false,
            adminName :localStorage.adminName
        }
      },
    components: {},
    methods: {
        deleteAdmin(){
            var _this = this;
            if(confirm("您确定注销账号？")){
                this.$store.dispatch("deleteAdmin",{
                    id : localStorage.id,
                    success(){
                        _this.$store.commit("CHANGE_COMPONENT",0)
                    }
                })
            }else{
                this.$router.push("/adminLog")
            }
        }
    },
      mounted(){

      }
  }
</script>

<style>
    *{
        margin: 0;
        padding: 0;
    }
    .ele_wrap{
        height: 100%;
    }
 .el-header{
    height: 80px;
     background-color: #B3C0D1;
 }
 .logo{
     color: #fff;
     font-size: 28px;
     line-height: 60px;
     width: 240px;
     font-family: '华文楷体';
 }
 .el-aside{
     position: relative;
     height: 100%;
     top: 0;
     left: 0;
     bottom: 0;
     border-right: 1px solid #eaeaea;
 }
 .admin{
     float: right;
 }
    .adminInfo{
        height: 80px;
        width: 200px;
        float: right;
        text-align: center;
    }
    .adminInfo dt,.adminInfo dd{
        height: 40px;
    }
 .adminInfo img{
     width: 40px;
     height: 40px;
     border-radius: 50%;
 }
 .iconfont{
     font-size: 30px;
     line-height: 60px;
     color: #fff;
 }
    el-container,.el-aside{
        background-color: #D3DCE6;
        color: #333;
    }
    .el-main{
        background-color: #E9EEF3;
        color: #333;
        position: absolute;
        top: 60px;
        right: 0;
        bottom: 0;
        left: 240px;
    }
    .el-table td, .el-table th.is-leaf{
        text-align: center;
    }
    .el-menu{
        border: 0;
    }
</style>
