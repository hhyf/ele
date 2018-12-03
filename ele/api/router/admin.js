const db = require("../modules/db");
const common = require("../modules/common");
const Enum = require("../modules/Enum");
const mongodb = require("mongodb");
const md5 = require("md5");
function _random(min,max){
    return Math.floor(Math.random()*(max-min+1) + min)
}
//新增管理员
module.exports.addAdmin = function(req,res){
    db.findOne("adminList",{
        adminName :　req.body.adminName,
    },function(err,adminInfo){
        if(adminInfo){
            res.json({
                ok : 2,
                msg : "此用户已注册"
            })
        }else{
            db.insertOne("adminList",{
                adminName :　req.body.adminName,
                adminPassword :　md5(req.body.passWord+'?!@ele'),
                regTime :　common.getNowTime(),
                lastTime : common.getNowTime()
            },function(err,results){
                if(err){
                    res.json({
                        ok : 2,
                        msg : "网络连接失败"
                    })
                }else{
                    res.json({
                        ok : 1,
                        msg : "注册成功"
                    })
                }
            })
        }
    })
}
//登录
module.exports.login = function(req,res){
    db.findOne("adminList",{
        adminName :　req.body.adminName,
        adminPassword :　md5(req.body.passWord+'?!@ele'),
    },function(err,adminInfo){
        if(adminInfo){
            db.updateOneById("adminList",adminInfo._id,{
                $set : {lastTime : common.getNowTime()}
            },function(err){
                if(err){
                    res.json({
                        ok : 2,
                        msg : "网络连接错误"
                    })
                }else{
                    db.insertOne("adminLog",{
                        adminId : adminInfo._id,
                        logType : 1,
                        addTime : common.getNowTime(),
                        detail : adminInfo.adminName+"在"+common.getNowTime()+"登录了系统"
                    },function(err){
                        if(!err){
                            res.json({
                                ok : 1,
                                adminName : adminInfo.adminName,
                                adminId : adminInfo._id
                            })
                        }else{
                            res.json({
                                ok : 2,
                                msg : "网络连接错误"
                            })
                        }
                    })
                }
            })
        }else{
            res.json({
                ok : 2,
                msg : "用户名或密码错误"
            })
        }
    })
}
//发送验证码
module.exports.sendCode = function(req,res){
    db.findOne("codeList",{
        phoneId : req.body.phoneId
    },function(err,codeInfo){
        if(codeInfo){
            if(codeInfo.createTime + 5*60*1000 > Date.now()){
                res.json({
                    ok : 2,
                    msg : "您距离下次发送验证码还有" + Math.floor((Date.now() - codeInfo.createTime + 5*60*1000)/1000) + "秒"
                })
            }else{
                var code = _random(100000,999999);
                db.insertOne("codeList",{
                    phoneId : req.body.phoneId,
                    code,
                    createTime : Date.now()
                },function(err){
                    if(err){
                        res.json({
                            ok : 2,
                            msg : "请检查您的手机号是否存在"
                        })
                    }else{
                        res.json({
                            ok : 1,
                            code
                        })
                    }
                })
            }
        }else{
            var code = _random(100000,999999);
            db.insertOne("codeList",{
                phoneId : req.body.phoneId,
                code,
                createTime : Date.now()
            },function(err){
                if(err){
                    res.json({
                        ok : 2,
                        msg : "请检查您的手机号是否存在"
                    })
                }else{
                    res.json({
                        ok : 1,
                        code
                    })
                }
            })
        }
    })
}
//注册
module.exports.register = function(req,res){
    db.findOne("codeList",{
        phoneId : req.body.phoneId
    },function(err,codeInfo){
        if(codeInfo.code === req.body.code / 1){
            db.findOne("adminList",{
                adminName :　req.body.adminName,
            },function(err,adminInfo){
                if(adminInfo){
                    res.json({
                        ok : 2,
                        msg : "此用户已注册"
                    })
                }else{
                    db.insertOne("adminList",{
                        adminName :　req.body.adminName,
                        adminPassword :　md5(req.body.passWord+'?!@ele'),
                        phoneId : req.body.phone,
                        regTime :　common.getNowTime(),
                        lastTime : common.getNowTime()
                    },function(err,results){
                        if(err){
                            res.json({
                                ok : 2,
                                msg : "网络连接失败"
                            })
                        }else{
                            res.json({
                                ok : 1,
                                msg : "注册成功"
                            })
                        }
                    })
                }
            })
        }else{
            res.json({
                ok : 2,
                msg : "验证码不正确，请重新输入"
            })
        }
    })
}


//获得管理员日志
module.exports.adminLogList = function(req,res){
    var pageIndex = req.query.pageIndex / 1;
    var pageNum = 2;
    var pageSum = 1;
    db.count("adminLog",{},function(count){
        pageSum = Math.ceil(count/pageNum);
        if(pageIndex < 1)
            pageIndex = 1;
        if(pageSum < 1)
            pageSum = 1;
        if(pageIndex > pageSum)
            pageIndex = pageSum;
        db.aggregate((pageIndex - 1)*pageNum,pageNum,"adminLog","adminList","adminId","_id","adminLogList",function(err,adminLogList){
            console.log(adminLogList)
            /*console.log(JSON.stringify(results));
            var adminLogList = [];
            var flag = true;
            for(var i in results){
                if(results[i].adminId.toString()==adminId){
                    console.log(results[i]);
                    res.json({
                        adminLogList : results[i],
                        LogTypeEnum : Enum.LogTypeEnum,
                        pageSum
                    })
                    flag = false;
                }
            }
            if(flag){
                res.json({
                    ok : 2,
                    msg : "查找不到用户的日志信息"
                })
            }*/
            if(err){
                res.json({
                    ok : 2,
                    msg : "网络连接错误"
                })
            }else{
                res.json({
                    ok : 1,
                    LogTypeEnum : Enum.LogTypeEnum,
                    pageSum,
                    adminLogList,
                    pageIndex
                })
            }
        })
    })
}
//删除管理员日志
module.exports.deleteLog = function (req,res){
    console.log(req.body.id)
    db.deleteOneById("adminLog",req.body.id,function(err){
        if(err){
            res.json({
                ok : 2,
                msg : "删除失败"
            })
        }else{
            res.json({
                ok : 1,
                msg : "删除成功"
            })
        }
    })
}
//修改管理员密码
module.exports.updatePwd = function(req,res){
    db.findOneById("adminList",req.body.adminId,function(err,adminInfo){
        if(err){
            res.json({
                ok : 2,
                msg :　"用户不存在！"
            })
        }else{
            // console.log(adminInfo.adminPassword===md5(req.body.oldPwd + "?!@ele"))
            if(adminInfo.adminPassword !== md5(req.body.oldPwd + "?!@ele")){
                res.json({
                    ok : 2,
                    msg : "旧密码不正确，请重新输入"
                })
            }else{
                db.updateOneById("adminList",req.body.adminId,{
                    $set : {
                        adminPassword : md5(req.body.newPwd + '?!@ele')
                    }
                },function(err){
                    if(err){
                        res.json({
                            ok : 2,
                            msg : "网络连接错误"
                        })
                    }else{
                        res.json({
                            ok : 1,
                            msg : "修改成功"
                        })
                    }
                })
            }
        }
    })
}
//删除管理员
module.exports.deleteAdmin = function(req,res){
    db.deleteOneById("adminList",req.body.adminId,function(err){
        if(err){
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        }else{
            db.deleteMany("adminLog",{
                adminId : mongodb.ObjectId(req.body.adminId)
            },function(err){
                if(err){
                    res.json({
                        ok : 2,
                        msg : "网络连接错误"
                    })
                }else{
                    res.json({
                        ok : 1,
                        msg : "删除成功"
                    })
                }
            })
        }
    })
}