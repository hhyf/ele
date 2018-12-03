const db = require("../modules/db");
const {upPic} = require("../modules/upPic")
const common = require("../modules/common");
const Enum = require("../modules/Enum");
const mongodb = require("mongodb");
module.exports.addGoodsType = function(req,res){
    db.insertOne("goodsTypeList",{
        shopTypeId : mongodb.ObjectId(req.body.shopTypeId),
        shopId : mongodb.ObjectId(req.body.shopId),
        goodsTypeName : req.body.goodsTypeName,
        addTime : common.getNowTime()
    },function(err){
        if(err){
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        }else{
            db.insertOne("adminLog",{
                adminId : mongodb.ObjectId(req.body.admind),
                logType : 2,
                addTime : common.getNowTime(),
                detail : req.body.adminName+"在"+common.getNowTime()+"添加了商品类型"+req.body.goodsTypeName
            })
            res.json({
                ok : 1,
                msg : "添加成功"
            })
        }
    })
}

//按条件获得商品类别列表
module.exports.getGoodsType = function(req,res){
    var pageIndex = req.query.pageIndex / 1;
    var keyWord = req.query.keyWord;
    var pageSum = 1;
    var pageNum = 3;
    db.count("goodsTypeList",{goodsTypeName : {$regex : keyWord}},function(count){
        pageSum = Math.ceil(count/pageNum);
        if(pageIndex < 1)
            pageIndex = 1;
        if(pageSum < 1)
            pageSum = 1;
        if(pageIndex > pageSum)
            pageIndex = pageSum;
        db.getGoodsTypeList((pageIndex - 1)*pageNum,pageNum,keyWord,"goodsTypeList",function(err,goodsTypeList){
            if(err){
                res.json({
                    ok : 2,
                    msg : "网络连接错误"
                })
            }else{
                res.json({
                    ok : 1,
                    goodsTypeList,
                    pageSum
                })
            }
        })
    })
}

//获取指定id的商品类型
module.exports.getGoodsTypeById = function(req,res){
    db.findOneById("goodsTypeList",req.query.goodsTypeId,function(err,goodsTypeInfo){
        if(err){
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        }else{
            res.json({
                ok : 1,
                goodsTypeInfo
            })
        }
    })
}

//删除商品类别
module.exports.deleteGoodsType = function(req,res){
    db.findOne("goodsList",{
        goodsTypeId : mongodb.ObjectId(req.query.goodsTypeId)
    },function(err,goodsInfo){
        if(goodsInfo){
            res.json({
                ok : 2,
                msg : "不能删除商品类别，请先删除该类别下的商品"
            })
        }else{
            db.findOneById("goodsTypeList",req.query.goodsTypeId,function(err,goodsTypeInfo){
                db.insertOne("adminLog",{
                    adminId : mongodb.ObjectId(req.query.adminId),
                    logType : 3,
                    addTime : common.getNowTime(),
                    detail : req.query.adminName+"在"+common.getNowTime()+"删除了商品类型"+goodsTypeInfo.goodsTypeName
                })
            })
            db.deleteOneById("goodsTypeList",req.query.goodsTypeId,function(err){
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

//修改商品类型
module.exports.upGoodsType = function(req,res){
    db.updateOneById("goodsTypeList",req.body.goodsTypeId,{
        $set : {
            shopTypeId : mongodb.ObjectId(req.body.shopTypeId),
            shopId : mongodb.ObjectId(req.body.shopId),
            goodsTypeName : req.body.goodsTypeName,
            addTime : common.getNowTime()
        }
    },function(err){
        if(err){
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        }else{
            db.insertOne("adminLog",{
                adminId : mongodb.ObjectId(req.body.adminId),
                logType : 4,
                addTime : common.getNowTime(),
                detail : req.body.adminName+"在"+common.getNowTime()+"修改了商品类型"+req.body.goodsTypeName
               })
            res.json({
                ok : 1,
                msg : "修改成功"
            })
        }
    })
}

//获取指定店铺的商品类别
module.exports.getAllGoodsType = function(req,res){
    db.find("goodsTypeList",{
        whereObj : {
             shopId : mongodb.ObjectId(req.query.shopId)
        }
    },function(err,goodsTypeList){
        if(err){
            res.json({
                ok : 2,
                msg : "网络连接错误"
            })
        }else{
            res.json({
                ok : 1,
                goodsTypeList
            })
        }
    })
}

//添加商品
module.exports.addGoods = function(req,res){
    upPic(req,"goodsPic",function(obj){
        if(obj.ok === 1){
            db.insertOne("goodsList",{
                goodsName : obj.params.goodsName,
                goodsPic : obj.newPicName,
                goodsPrice : obj.params.goodsPrice / 1,
                goodsTypeId : mongodb.ObjectId(obj.params.goodsTypeId),
                shopId : mongodb.ObjectId(obj.params.shopId),
                shopTypeId : mongodb.ObjectId(obj.params.shopTypeId),
                isHot :obj.params.isHot /1,
                addTime : common.getNowTime()
            },function(err){
                if(err)
                    res.json({
                        ok : 2,
                        msg : "网络连接失败"
                    })
                else{
                    db.insertOne("adminLog",{
                        adminId : mongodb.ObjectId(obj.params._id),
                        logType : 2,
                        addTime : common.getNowTime(),
                        detail : obj.params.adminName+"在"+common.getNowTime()+"添加了商品"+obj.params.goodsName
                    })
                    res.json({
                        ok : 1,
                        msg : "添加成功"
                    })
                }
            })
        }else{
            res.json({
                ok : 2,
                msg : "网络连接失败"
            })
        }
    })
}

//获取商品列表
module.exports.getGoodsList = function(req,res){
    var pageIndex = req.query.pageIndex / 1;
    var keyWord = req.query.keyWord;
    var pageSum = 1;
    var pageNum = 3;
    db.count("goodsList",{goodsName : {$regex : keyWord}},function(count){
        pageSum = Math.ceil(count/pageNum);
        if(pageIndex < 1)
            pageIndex = 1;
        if(pageSum < 1)
            pageSum = 1;
        if(pageIndex > pageSum)
            pageIndex = pageSum;
        db.getGoodsList((pageIndex - 1)*pageNum,pageNum,keyWord,"goodsList",function(err,goodsList){
            if(err)
                res.json({
                    ok : 2,
                    msg :"网络连接错误"
                })
            else
                res.json({
                    ok : 1,
                    goodsList,
                    pageSum
                })
        })
    })
}

//删除指定的商品
module.exports.deleteGoods = function(req,res){
    db.findOneById("goodsList",req.query.goodsId,function(err,goodsInfo){
        db.insertOne("adminLog",{
            adminId : mongodb.ObjectId(req.query.adminId),
            logType : 3,
            addTime : common.getNowTime(),
            detail : req.query.adminName+"在"+common.getNowTime()+"删除了商品"+goodsInfo.goodsName
        })
    })
    db.deleteOneById("goodsList",req.query.goodsId,function(err){
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

//根据id获得商品
module.exports.getGoodsById = function(req,res){
    db.findOneById("goodsList",req.query.goodsId,function(err,goodsInfo){
        if(err)
            res.json({
                ok :2,
                msg : "网络连接错误"
            })
        else
            res.json({
                ok :1,
                goodsInfo
            })

    })
}

//修改商品信息
module.exports.upGoods = function (req,res) {
    upPic(req,"goodsPic",function(obj){
        if(obj === 2){
            res.json({
                ok : 2,
                msg : obj.msg
            })
        }else{
            var upObj = {
                $set : {
                    goodsName : obj.params.goodsName,
                    goodsPrice : obj.params.goodsPrice,
                    goodsTypeId : mongodb.ObjectId(obj.params.goodsTypeId),
                    shopId : mongodb.ObjectId(obj.params.shopId),
                    shopTypeId : mongodb.ObjectId(obj.params.shopTypeId),
                    isHot :obj.params.isHot,
                    addTime : common.getNowTime()
                }
            }
            if(obj.newPicName){
                upObj.$set.goodsPic = obj.newPicName;
            }
            db.updateOneById("goodsList",obj.params.goodsId,upObj,function(err){
                if(err)
                    res.json({
                        ok : 2,
                        msg : "网络连接错误"
                    })
                else{
                    db.insertOne("adminLog",{
                        adminId : mongodb.ObjectId(obj.params.adminId),
                        logType : 4,
                        addTime : common.getNowTime(),
                        detail : obj.params.adminName+"在"+common.getNowTime()+"修改了商品"+obj.params.goodsName
                       })
                    res.json({
                        ok : 1,
                        msg : "修改成功"
                    })
                }
            })
        }
    })
}