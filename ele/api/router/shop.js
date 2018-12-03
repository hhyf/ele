const db = require("../modules/db");
const {upPic} = require("../modules/upPic")
const common = require("../modules/common");
const Enum = require("../modules/Enum");
const mongodb = require("mongodb");
//添加店铺类型
module.exports.addShopType = function(req,res){
    upPic(req,"shopTypePic",function(obj){
       if(obj.ok === 1){
           db.insertOne("shopTypeList",{
               shopTypeName : obj.params.shopTypeName,
               shopTypePic : obj.newPicName,
               orderNum : obj.params.orderNum / 1,
               addTime : common.getNowTime()
           },function(err){
               db.insertOne("adminLog",{
                adminId : mongodb.ObjectId(obj.params.adminId),
                logType : 2,
                addTime : common.getNowTime(),
                detail : obj.params.adminName+"在"+common.getNowTime()+"添加了店铺类型"+obj.params.shopTypeName
               })
               if(err){
                   res.json({
                       ok : 2,
                       msg : obj.msg
                   })
               }else{
                   res.json({
                       ok : 1,
                       msg : "提交成功"
                   })
               }
           })
       }else{
           res.json({
               ok : 2,
               msg : obj.msg
           })
       }
    })
}

//获得店铺类型
module.exports.getShopTypeList = function(req,res){
    var pageIndex = req.query.pageIndex / 1;
    var pageSum = 1;
    var pageNum = 3;
    var sortType = req.query.sortType / 1;
    db.count("shopTypeList",{shopTypeName : {$regex:req.query.keyWord}},function(count){
        pageSum = Math.ceil(count/pageNum);
        if(pageSum < 1){
            pageSum = 1;
        }
        if(pageIndex < 1){
            pageIndex = 1;
        }
        if(pageIndex > pageSum){
            pageIndex = pageSum
        }
        var sortObj = {};
        if(sortType === 0){
            sortObj = {
                addTime : 1
            }
        }else if(sortType === 1){
            sortObj = {
                orderNum : -1
            }
        }else if(sortType === 2){
            sortObj = {
                addTime : -1
            }
        }
        db.find("shopTypeList",{
            whereObj : {shopTypeName : {$regex:req.query.keyWord}},
            sortObj,
            skipNum : (pageIndex - 1)*pageNum,
            limitNum : pageNum
        },function (err,shopTypeList) {
            if(err){
                res.json({
                    ok : 2,
                    msg : "网络连接错误"
                })
            }else{
                res.json({
                    ok : 1,
                    shopTypeList,
                    pageSum
                })
            }
        })
    })
}

//获得所有店铺类别
module.exports.getAllShopType = function(req,res){
    db.find("shopTypeList",{},function(err,shopTypeList){
        if(err){
            res.json({
                ok : 2,
                msg : "网络连接错误！"
            })
        }else{
            res.json({
                ok : 1,
                shopTypeList
            })
        }
    })
}

//删除店铺类型
module.exports.deleteShopType = function(req,res){
    db.findOne("shopList",{
        shopTypeId :mongodb.ObjectId(req.query.shopTypeId)
    },function(err,shopTypeInfo){
        if(shopTypeInfo){
            res.json({
                ok : 2,
                msg : "请删除该店铺类型下的所有店铺再删除店铺类型！！"
            })
        }else{
            db.findOneById("shopTypeList",req.query.shopTypeId,function(err,shopTypeInfo){
                db.insertOne("adminLog",{
                    adminId : mongodb.ObjectId(req.query.adminId),
                    logType : 3,
                    addTime : common.getNowTime(),
                    detail : req.query.adminName+"在"+common.getNowTime()+"删除了店铺类型"+shopTypeInfo.shopTypeName
                })
            })
            db.deleteOneById("shopTypeList",req.query.shopTypeId,function(err){
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

//通过id获得店铺类型
module.exports.getShopTypeInfoById = function(req,res){
    db.findOneById("shopTypeList",req.query.shopTypeId,function(err,shopTypeInfo){
        if(err){
            res.json({
                ok : 2,
                msg :"网络连接失败"
            })
        }else{
            res.json({
                ok : 1,
                shopTypeInfo
            })
        }
    })
}

//修改店铺
module.exports.upShopType = function(req,res){
    upPic(req,"shopTypePic",function(obj){
        if(obj.ok === 2){
            res.json({
                ok : 2,
                msg : obj.msg
            })
        }else{
            var upObj = {
                $set : {
                    shopTypeName : obj.params.shopTypeName,
                    orderNum : obj.params.orderNum / 1,
                    addTime : common.getNowTime()
                }
            }
            if(obj.newPicName){
                upObj.$set.shopTypePic = obj.newPicName
            }
            db.updateOneById("shopTypeList",obj.params.shopTypeId,upObj,function(err){
                if(err){
                    rse.json({
                        ok :2,
                        msg : "网络连接错误"
                    })
                }else{
                    db.insertOne("adminLog",{
                        adminId : mongodb.ObjectId(obj.params.adminId),
                        logType : 4,
                        addTime : common.getNowTime(),
                        detail : obj.params.adminName+"在"+common.getNowTime()+"修改了店铺类型"+obj.params.shopTypeName
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

//添加店铺
module.exports.addShopList = function(req,res){
    upPic(req,"shopPic",function(obj){
        if(obj.ok === 1){
            db.insertOne("shopList",{
                shopName : obj.params.shopName,
                shopPic : obj.newPicName,
                orderNum : obj.params.orderNum / 1,
                isRecomment : obj.params.isRecomment / 1,
                shopTypeId : mongodb.ObjectId(obj.params.shopTypeId),
                addTime : common.getNowTime()
            },function(err){
                if(err){
                    res.json({
                        ok : 2,
                        msg : obj.msg
                    })
                }else{
                    db.insertOne("adminLog",{
                        adminId : mongodb.ObjectId(obj.params._id),
                        logType : 2,
                        addTime : common.getNowTime(),
                        detail : obj.params.adminName+"在"+common.getNowTime()+"添加了店铺"+obj.params.shopName
                       })
                    res.json({
                        ok : 1,
                        msg : "提交成功"
                    })
                }
            })
        }
    })
}

//获得店铺
module.exports.getShopList = function(req,res){
    var pageIndex = req.query.pageIndex;
    var keyWord = req.query.keyWord;
    var pageNum = 5;
    var pageSum = 1;
    db.count("shopList",{shopName : {$regex : keyWord}},function(count) {
        pageSum = Math.ceil(count / pageNum);
        if (pageIndex < 1)
            pageIndex = 1;
        if (pageSum < 1)
            pageSum = 1;
        if (pageIndex > pageSum)
            pageIndex = pageSum;
        db.shopAggregate((pageIndex - 1) * pageNum, pageNum,keyWord, "shopList", "shopTypeList", "shopTypeId", "_id", "shopType", function (err, shopList) {
            if (err) {
                res.json({
                    ok: 2,
                    msg: "网络连接错误"
                })
            } else {
                res.json({
                    ok: 1,
                    shopList,
                    pageSum
                })
            }
        })
    })
}

//删除店铺
module.exports.deleteShop = function(req,res){
    db.findOne("goodsTypeList",{
        shopId : mongodb.ObjectId(req.query.shopId)
    },function(err,shopInfo){
        if(shopInfo){
            res.json({
                ok : 2,
                msg : "请删除请店铺下的所有商品，再删除店铺！！"
            })
        }else{
            db.findOneById("shopList",req.query.shopId,function(err,shopInfo){
                db.insertOne("adminLog",{
                    adminId : mongodb.ObjectId(req.query.adminId),
                    logType : 3,
                    addTime : common.getNowTime(),
                    detail : req.query.adminName+"在"+common.getNowTime()+"删除了店铺"+shopInfo.shopName
                })
            })
            db.deleteOneById("shopList",req.query.shopId,function(err){
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

//根据id获得店铺信息
module.exports.getShopById = function(req,res){
    db.findOneById("shopList",req.query.shopId,function(err,shopInfo){
        if(err){
            res.json({
                ok :2,
                msg : "网络连接错误"
            })
        }else{
            res.json({
                ok : 1,
                shopInfo
            })
        }
    })
}

//获得所有店铺信息
module.exports.getAllShop = function(req,res){
    db.find("shopList",{
       whereObj : { shopTypeId : mongodb.ObjectId(req.query.shopTypeId) }
    },function(err,shopList){
        if(err){
            res.json({
                ok :2,
                msg : "网络连接错误"
            })
        }else{
            res.json({
                ok : 1,
                shopList
            })
        }
    })
}
//修改店铺信息
module.exports.upShopList = function(req,res){
    upPic(req,"shopPic",function(obj){
        if(obj.ok === 2){
            res.json({
                ok : 2,
                msg : obj.msg
            })
        }else{
            var upObj = {
                $set : {
                    shopName : obj.params.shopName,
                    orderNum : obj.params.orderNum / 1,
                    isRecomment : obj.params.isRecomment / 1,
                    shopTypeId : mongodb.ObjectId(obj.params.shopTypeId),
                    addTime : common.getNowTime()
                }
            }
            if(obj.newPicName){
                upObj.$set.shopPic = obj.newPicName
            }
            db.updateOneById("shopList",obj.params.shopId,upObj,function(err){
                if(err){
                    rse.json({
                        ok :2,
                        msg : "网络连接错误"
                    })
                }else{
                    db.insertOne("adminLog",{
                        adminId : mongodb.ObjectId(obj.params.adminId),
                        logType : 4,
                        addTime : common.getNowTime(),
                        detail : obj.params.adminName+"在"+common.getNowTime()+"修改了店铺"+obj.params.shopName
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