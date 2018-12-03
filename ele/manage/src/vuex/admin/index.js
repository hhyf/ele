import axios from 'axios'
import Vue from "vue"
var vue = new Vue()
export default {
  state : {
    isLoadingLogin : false,
    isLoadingReg : false,
    loginForm : {
      adminName : "",
      passWord : ""
    },
    RegForm : {
      adminName : "",
      passWord : "",
      passWord2 : ""
    }
  },
  mutations : {

  },
  getters : {},
  actions : {
      //登录
    login({state,commit},admin){
      state.isLoadingLogin = true;
      axios.post("/login",{
        adminName : admin.adminName,
        passWord : admin.passWord
      }).then(data=>{
        if(data.ok === 1){
          localStorage.adminName = data.adminName;
          localStorage.id = data.adminId;
          commit("CHANGE_COMPONENT",1);
          vue.$message({
              message : "登录成功",
              type : "success"
          })
          state.isLoadingLogin = false;
        }else{
          alert(data.msg)
          state.isLoadingLogin = false;
        }
      })
    },
      //新增管理员
    register({state,commit},admin){
      state.isLoadingReg = true;
      axios.post("/addAdmin",{
        adminName : admin.adminName,
        passWord : admin.passWord
      }).then(data=>{
        if(data.ok === 1){
          this.$router.push("/");
          state.isLoadingReg = false;
        }else{
          alert(data.msg)
          state.isLoadingReg = false;
        }
      })
    },
    //查找管理员日志
      getAdminLogList(state,admin){
        axios.get("/adminLogList?pageIndex="+admin.pageIndex).then(data=>{
            admin.cb(data);
        })
      },
      //删除日志
      deleteLog({state,dispatch},log){
          axios.post("/deleteLog",{
              id : log.logId
          }).then(data=>{
              if(data.ok === 1){
                  log.success();
              }else{
                  alert(data.msg);
              }
          })
      },

      //修改密码
      updatePwd({state},admin){
        axios.post("/updatePwd",{
            adminId : admin.adminId,
            oldPwd : admin.oldPwd,
            newPwd : admin.newPwd
        }).then(data=>{
          console.log(data);
            if(data.ok === 1){
                admin.success();
            }else{
                alert(data.msg);
            }
        })
      },

      //删除管理员信息
      deleteAdmin({state},admin){
        axios.post("/deleteAdmin",{
            adminId : admin.id
        }).then(data=>{
            if(data.ok === 1){
                localStorage.clear();
                admin.success();
            }else{
                alert(data.msg);
            }
        })
      }
  }
}
