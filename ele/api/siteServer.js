const express= require("express");
const db = require("./modules/db");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const app = express();
app.use(bodyParser.json())
app.use(express.static("./upload"))

/* ======================================数据渲染============================ */
//获取所有店铺类型
app.get("/getShopType",function(req,res){
    db.count("shopTypeList",{},function(count){
        var sum = Math.ceil(count / 10);
        db.find("shopTypeList",{sortObj : {orderNum : -1}},function(err,shopTypeList){
            res.json({
                ok :1,
                shopTypeList,
                sum
            })
        })
    })
})

//获取所有店铺
app.get("/getShopList",function(req,res){
    var pageIndex = req.query.pageIndex;
    var keyWord = req.query.keyWord;
    var pageNum = 5;
    var pageSum = 1;
    db.count("shopList",{},function(count){
        pageSum = Math.ceil(count/pageNum);
        if(pageIndex < 1){
            pageIndex = 1;
        }
        if(pageSum < 1)
            pageSum = 1;
        if(pageIndex > pageSum)
            pageIndex = pageSum;
        db.getShop({isRecomment : 1,shopName : {$regex : keyWord}},(pageIndex - 1) *pageNum,pageNum ,"shopList",function(err,shopList){
            if(err)
                res.json({
                    ok :2,
                    msg : "网络连接错误"
                })
            else{
                db.find("activity",{},function(err,activityList){
                    res.json({
                        ok : 1,
                        shopList,
                        activityList,
                        pageNum
                    })
                })
            }
        })
    })
})

function _random(min,max){
    return Math.floor(Math.random()*(max-min+1) + min)
}
//获取商品信息
app.get("/getGoods",function(req,res){
    db.findOneById("goodsList",req.query.goodsId,function(err,goodsInfo){
        if(err)
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        else
            res.json({
                ok : 1,
                goodsInfo
            })
    })
})
//根据店铺类型选择店铺
app.get("/getShopInfo",function(req,res){
    // db.find("shopList",{
    //     whereObj : {
    //         shopTypeId : mongodb.ObjectId(req.query.id)
    //     },
    //     sortObj : {
    //         addTime : -1
    //     }
    // },function(err,shopList){
    //     var num = shopList.length;
    //     if(err){
    //         res.json({
    //             ok : 2,
    //             msg : "网络连接错误"
    //         })
    //     }else{
    //         res.json({
    //             ok : 1,
    //             shopList,
    //             num
    //         })
    //     }
    // })
    // var pageIndex = req.query.pageIndex;
    var pageNum = 5;
    // var pageSum = 1;
    db.count("shopList",{},function(count){
        // pageSum = Math.ceil(count/pageNum);
        // if(pageIndex < 1){
        //     pageIndex = 1;
        // }
        // if(pageSum < 1)
        //     pageSum = 1;
        // if(pageIndex > pageSum)
        //     pageIndex = pageSum;
        db.getShop({shopTypeId : mongodb.ObjectId(req.query.id)},0,pageNum ,"shopList",function(err,shopList){
            if(err)
                res.json({
                    ok :2,
                    msg : "网络连接错误"
                })
            else{
                db.find("activity",{},function(err,activityList){
                    res.json({
                        ok : 1,
                        shopList,
                        activityList,
                        pageNum
                    })
                })
            }
        })
    })
})

//获取店铺下的所有商品
app.get("/getShopDetail",function(req,res){
    db.getShopDetail(req.query.shopId,"shopList",function(err,shopDetail){
        if(err)
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        else
            res.json({
                ok : 1,
                shopDetail
            })
    })
})

//获取商品类型下的所有商品
app.get("/getGoodsTypeGoods",function(req,res){
    db.find("goodsList",{whereObj : {
        goodsTypeId : mongodb.ObjectId(req.query.goodsTypeId)
    }},function(err,goodsList){
        if(err)
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        else
            res.json({
                ok : 1,
                goodsList
            })
    })
})
/*===================================登录注册================================== */
//获取验证码
app.post("/sendCode",function(req,res){
    db.findOne("userCodeList",{
        phoneId : req.body.phoneId
    },function(err,codeInfo){
        if(codeInfo){
            if(codeInfo.createTime + 0.5*60*1000 > Date.now()){
                res.json({
                    ok : 2,
                    msg : "您距离下次发送验证码还有" + Math.floor((Date.now() - codeInfo.createTime + 0.5*60*1000)/1000) + "秒"
                })
            }else{
                var code = _random(100000,999999);
                db.insertOne("userCodeList",{
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
            db.insertOne("userCodeList",{
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
})

//登录注册
app.post("/login",function(req,res){
    db.findOne("userCodeList",{
        phoneId : req.body.phoneId
    },function(err,codeInfo){
        if(codeInfo){
            if(codeInfo.code === req.body.code){
                db.findOne("userList",{phoneId : req.body.phoneId},function(err,userInfo){
                    if(userInfo){
                        res.json({
                            ok : 1,
                            msg : "登录成功",
                            userName : userInfo.userName,
                            userId : userInfo._id,
                            wallet : 0,
                            money : 0,
                            gold : 10000,
                            phoneId :　req.body.phoneId
                        })
                    }else{
                        db.insertOne("userList",{
                            phoneId : req.body.phoneId,
                            userName : _random(10000000,99999999),
                            wallet : 0,
                            money : 0,
                            gold : 10000,
                            addTime : Date.now()
                        },function(err){
                            if(err){
                                res.json({
                                    ok : 2,
                                    msg : "网络连接错误"
                                })
                            }else{
                                db.findOne("userList",{phoneId : req.body.phoneId},function(err,userInfo){
                                    res.json({
                                        ok : 1,
                                        msg : "登录成功",
                                        userName : userInfo.userName,
                                        userId : userInfo._id,
                                        wallet : 0,
                                        money : 0,
                                        gold : 10000,
                                        phoneId :　req.body.phoneId
                                    })
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
        }else{
            res.json({
                ok : 2,
                msg : "请输入正确的手机号"
            })
        }
    })
})

/* ===============================购物车======================================== */
//加入购物车
app.post("/addCar",function(req,res){
    db.findOneById("goodsList",req.body.goodsId,function(err,goodsInfo){
        if(goodsInfo){
            db.findOne("carList",{
                    userId : mongodb.ObjectId(req.body.userId),
                    goodsId : mongodb.ObjectId(req.body.goodsId),
                    isPay : 0
            },function(err,carList){
                if(carList){
                    if(carList.count <= 1 && req.body.addNum / 1 === -1){
                        db.deleteOne("carList",{
                            _id : carList._id
                        },function(err){
                            if(err){
                                res.json({
                                    ok : 2,
                                    msg : "网络连接错误4"
                                })
                            }else{
                                res.json({
                                    ok : 1,
                                    msg : "删除成功"
                                })
                            }
                        })
                    }else{
                        db.updateOne("carList",{_id : carList._id},{$inc : {
                            count : req.body.addNum / 1
                        }},function(err){
                            if(err){
                                res.json({
                                    ok : 2,
                                    msg : "网络连接超时3"
                                })
                            }else{
                                res.json({
                                    ok : 1,
                                    msg : "添加成功2"
                                })
                            }
                        })
                    }
                }else{
                    db.insertOne("carList",{
                        userId : mongodb.ObjectId(req.body.userId),
                        goodsId : mongodb.ObjectId(req.body.goodsId),
                        count : 1,
                        isPay : 0,
                        addTime : Date.now()
                    },function(err){
                        if(err)
                            res.json({
                                ok : 2,
                                msg : "网络连接超时2"
                            })
                        else
                            res.json({
                                ok : 1,
                                msg : "添加成功1"
                            })
                    })
                }
            })
        }else{
            res.json({
                ok : 2,
                msg : "网络连接超时1"
            })
        }
    })
})
//清空购物车
app.delete("/clearCar",function(req,res){
    db.deleteMany("carList",{userId : mongodb.ObjectId(req.query.userId),},function(err){
        if(err)
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        else
            res.json({
                ok : 1,
                msg : "删除成功"
            })
    })
})
//获得购物车
app.get("/getCarList",function(req,res){
    db.getCarList({
        userId : mongodb.ObjectId(req.query.userId),
        isPay : 0
    },"carList", function(err,carList){
        if(err)
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        else
            res.json({
                ok : 1,
                carList
            })
    })
})

//获得某个商品的数量
app.get("/getCarCount",function(req,res){
    db.findOne("carList",{
        userId : mongodb.ObjectId(req.body.userId),
        goodsId : mongodb.ObjectId(req.query.goodsId)
    },function(err,carInfo){
        res.json({
            ok : 1,
            count : carInfo.count
        })
    })
})

//结算
app.post("/balance",function(req,res){
    db.getCarList({
        userId : mongodb.ObjectId(req.body.userId),
        isPay : 0
    },"carList",function(err,carList){
        var sum = 0;
        carList.forEach(v=>{
            sum += v.count * v.goodsInfo[0].goodsPrice;
        })
        if(sum === req.body.money / 1){
            db.insertOne("orderList",{
                userId : mongodb.ObjectId(req.body.userId),
                carList,
                isBuy : 0,
                sum
            },function(err){
                if(err)
                    res.json({
                        ok : 2,
                        msg : "网络连接错误"
                    })
                else{
                    db.findOne("orderList",{
                        userId : mongodb.ObjectId(req.body.userId),
                    },function(err,orderInfo){
                        res.json({
                            ok : 1,
                            msg : "验证正确",
                            orderId : orderInfo._id
                        })
                    })
                }
            })
        }else{
            res.json({
                ok : 2,
                msg : "请检查您的商品信息"
            })
        }
    })
})
//确认购买
app.post("/confirmBuy",function(req,res){
    db.updateOneById("orderList",req.body.orderId,{
        $set : { isBuy : 1 }
    },function(err){
        if(err)
            res.json({
                ok : 2,
                msg : "网络连接错误1"
            })
        else{
            db.updateMany("carList",{
                userId : mongodb.ObjectId(req.body.userId),
            },{
                $set : {
                    isPay : 1
                }
            },function(err){
                if(err)
                    res.json({
                        ok : 2,
                        msg : "网络连接失败"
                    })
                else{
                    db.findOneById("orderList",req.body.orderId,function(err,orderInfo){
                        if(orderInfo){
                            db.findOne("userList",{
                                _id : mongodb.ObjectId(req.body.userId),
                            },function(err,userInfo){
                                if(userInfo){
                                    db.updateOne("userList",{
                                        _id : userInfo._id
                                    },{
                                        $set : {
                                            gold : userInfo.gold - orderInfo.sum
                                        }
                                    })
                                    res.json({
                                        ok : 1,
                                        msg : "购买成功",
                                        gold : userInfo.gold - orderInfo.sum
                                    })
                                }
                                else{
                                    res.json({
                                        ok : 2,
                                        msg : "网络连接错误3"
                                    })
                                }
                            })
                        }else{
                            res.json({
                                ok : 2,
                                msg : "网络连接错误2"
                            })
                        }
                    })
                }
            })
        }
    })
})
/*=========================我的====================== */
//修改用户名
app.put("/updateName",function(req,res){
    db.updateOneById("userList",req.body.userId,{
        $set : {
            userName : req.body.userName
        }
    },function(err){
        if(err)
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        else
            res.json({
                ok : 1,
                msg : "修改成功"
            })
    })
})
//修改手机绑定
app.put("/updatePhone",function(req,res){
    db.updateOneById("userList",req.body.userId,{
        $set : {
            phoneId : req.body.phoneId
        }
    },function(err){
        if(err)
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        else
            res.json({
                ok : 1,
                msg : "修改成功"
            })
    })
})
//验证验证码
app.post("/submitCode",function(req,res){
    db.findOne("codeList",{
        phoneId : req.body.phoneId,
        code : req.body.code
    },function(err,codeInfo){
        if(codeInfo)
            res.json({
                ok : 2,
                msg : "验证码错误"
            })
        else
            res.json({
                ok : 1,
                msg : "验证成功"
            })
    })
})

//修改密码

/*================================订单管理==================== */
//获取用户的所有订单
app.get("/getOrderList",function(req,res){
    db.find("orderList",{
        whereObj : {
            userId : mongodb.ObjectId(req.query.userId)
        }
    },function(err,orderList){
        if(err)
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        else
            res.json({
                ok : 1,
                orderList
            })
    })
})
//删除用户订单信息
app.delete("/deleteOrder",function(req,res){
    db.deleteOneById("orderList",req.query.orderId,function(err){
        if(err)
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        else
            res.json({
                ok : 1,
                msg : "删除成功"
            })
    })
})










app.listen(80,function(){
    console.log("success22222222222");
})