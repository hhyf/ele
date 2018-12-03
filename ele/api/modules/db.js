// 对数据库操作的方法
const mongodb=require("mongodb");
const mongoClient=mongodb.MongoClient;
function _connect(cb){
    mongoClient.connect("mongodb://127.0.0.1:27017",{ useNewUrlParser: true },function(err,client) {
        cb(client.db("ele")) ;
    });
}
/*增加一条记录
* coll:指定集合
* obj:添加的内容
* cb：回调函数*/
module.exports.insertOne=function(coll,obj,cb){
    _connect(function(db){
        db.collection(coll).insertOne(obj,cb)
    })
}
/*获取文档信息*/
module.exports.find=function(coll,obj,cb){
    obj.whereObj=obj.whereObj || {};
    obj.sortObj=obj.sortObj || {};
    obj.limitNum=obj.limitNum || 0;
    obj.skipNum=obj.skipNum || 0;

    _connect(function(db){
        db.collection(coll).find(obj.whereObj).sort(obj.sortObj).limit(obj.limitNum).skip(obj.skipNum).toArray(cb);
    })
}
/* 根据条件获得一条记录 */
module.exports.findOne=function(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).findOne(whereObj,cb);
    })
}
/* 根据ID获得一条记录 */
module.exports.findOneById=function(coll,id,cb){
    _connect(function(db){
        db.collection(coll).findOne({
            _id:mongodb.ObjectId(id)
        },cb);
    })
}

/*根据条件求总文档数*/
module.exports.count=function(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).countDocuments(whereObj).then(cb)
    })
}

/*根据ID删除文档*/
module.exports.deleteOneById=function(coll,id,cb){
    _connect(function(db){
        db.collection(coll).deleteOne({
            _id:mongodb.ObjectId(id)
        },cb);
    })
}
/*删除一条记录*/
module.exports.deleteOne=function(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).deleteOne(whereObj,cb);
    })
}
/*删除多条记录*/
module.exports.deleteMany=function(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).deleteMany(whereObj,cb);
    })
}
/*根据ID进行更新*/
module.exports.updateOneById=function(coll,id,upObj,cb){
    _connect(function(db){
        db.collection(coll).updateOne({
            _id:mongodb.ObjectId(id)
        },upObj,cb);
    })
}
//修改一条记录
module.exports.updateOne=function(coll,whereObj,upObj,cb){
    _connect(function(db){
        db.collection(coll).updateOne(whereObj,upObj,cb);
    })
}
//修改多条记录
module.exports.updateMany=function(coll,whereObj,upObj,cb){
    _connect(function(db){
        db.collection(coll).updateMany(whereObj,upObj,cb);
    })
}

//联表查询
module.exports.shopAggregate = function(skip,limit,keyWord,coll,from,localField,foreignField,as,cb){
    _connect(function(db){
        console.log(keyWord)
        db.collection(coll).aggregate([
            {$match : {shopName : {$regex : keyWord}}},
            {$sort : {
                addTime : -1,
                orderNum : -1
            }},
            {$skip : skip},
            {$limit : limit},
            {
            $lookup : {
                from,
                localField,
                foreignField,
                as
            }
        }]).toArray(cb);
    })
}


//联表查询店铺
module.exports.aggregate = function(skip,limit,coll,from,localField,foreignField,as,cb){
    _connect(function(db){
        db.collection(coll).aggregate([
            {$sort : {
                    addTime : -1,
                    orderNum : -1
                }},
            {$skip : skip},
            {$limit : limit},
            {
                $lookup : {
                    from,
                    localField,
                    foreignField,
                    as
                }
            }]).toArray(cb);
    })
}

//联表查询商品类型和店铺及店铺类型
module.exports.getGoodsTypeList = function(skip,limit,keyWord,coll,cb){
    _connect(function(db){
        db.collection(coll).aggregate([
            {$match : {goodsTypeName : {$regex : keyWord}}},
            {$sort : {
                    addTime : -1,
                    orderNum : -1
                }},
            {$skip : skip},
            {$limit : limit},
            {
                $lookup : {
                    from : "shopTypeList",
                    localField : "shopTypeId",
                    foreignField : "_id",
                    as : "shopTypeList"
                }
            },
            {
                $lookup : {
                    from : "shopList",
                    localField : "shopId",
                    foreignField : "_id",
                    as : "shopList"
                }
            }]).toArray(cb);
    })
}

//联表查询商品和商品类型、店铺及店铺类型
module.exports.getGoodsList = function(skip,limit,keyWord,coll,cb){
    _connect(function(db){
        db.collection(coll).aggregate([
            {$match : {goodsName : {$regex : keyWord}}},
            {$sort : {
                    addTime : -1,
                    orderNum : -1
                }},
            {$skip : skip},
            {$limit : limit},
            {
                $lookup : {
                    from : "shopTypeList",
                    localField : "shopTypeId",
                    foreignField : "_id",
                    as : "shopTypeList"
                }
            },
            {
                $lookup : {
                    from : "shopList",
                    localField : "shopId",
                    foreignField : "_id",
                    as : "shopList"
                }
            },
            {
                $lookup : {
                    from : "goodsTypeList",
                    localField : "goodsTypeId",
                    foreignField : "_id",
                    as : "goodsTypeList"
                }
            }
        ]).toArray(cb);
    })
}



//渲染数据查询店铺类型
module.exports.getShop = function(whereObj,skip,limit,coll,cb){
    _connect(function(db){
        db.collection(coll).aggregate([
            {$match : whereObj},
            {$sort : {
                    orderNum : -1
                }},
            {$skip : skip},
            {$limit : limit},
            {
                $lookup : {
                    from : "shopTypeList",
                    localField : "shopTypeId",
                    foreignField : "_id",
                    as : "shopTypeInfo"
                }
            }]).toArray(cb);
    })
}

//渲染数据查询店铺id下的所有商品
module.exports.getShopDetail = function(id,coll,cb){
    _connect(function(db){
        db.collection(coll).aggregate([
            {$match : {_id : mongodb.ObjectId(id)}},
            {$sort : {
                    addTime : -1,
                    orderNum : -1
                }},
            {
                $lookup : {
                    from : "goodsList",
                    localField : "_id",
                    foreignField : "shopId",
                    as : "goodsList"
                }
            },
            {
                $lookup : {
                    from : "goodsTypeList",
                    localField : "_id",
                    foreignField : "shopId",
                    as : "goodsTypeList"
                }
            }
        ]).toArray(cb);
    })
}

//获取渲染数据购物车及商品
module.exports.getCarList = function(whereobj,coll,cb){
    _connect(function(db){
        db.collection(coll).aggregate([
            {$match : whereobj},
            {$sort : {
                    addTime : -1,
                }
            },
            {
                $lookup : {
                    from : "goodsList",
                    localField : "goodsId",
                    foreignField : "_id",
                    as : "goodsInfo"
                }
            }]).toArray(cb);
    })
}