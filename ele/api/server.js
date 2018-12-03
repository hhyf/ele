const express= require("express");
const app = express();
const bodyParser = require("body-parser");
const admin = require("./router/admin")
const shop = require("./router/shop")
const goods = require("./router/goods")
app.use(express.static("./upload"))
app.use(bodyParser.json())
// app.all("*",function(req,res,next){
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","content-type");
//     res.header("Access-Control-Allow-Methods","*");
//     next();
// })
/*--------------------------管理员模块-----------------------*/
//新增管理员账号
app.post("/addAdmin",admin.addAdmin)
//发送验证码
app.post("/sendCode",admin.sendCode)
//注册
app.post("/register",admin.register)

//管理员登录
app.post("/login",admin.login)
//获取管理员日志
app.get("/adminLogList",admin.adminLogList)
//删除日志信息
app.post("/deleteLog",admin.deleteLog)
//修改密码
app.post("/updatePwd",admin.updatePwd)
//删除管理员信息
app.post("/deleteAdmin",admin.deleteLog)


/*-------------------------店铺模块-----------------------------*/
//添加店铺类别
app.post("/addShopType",shop.addShopType)
//按条件获取店铺类别
app.get("/getShopTypeList",shop.getShopTypeList)
//获取所有店铺类别
app.get("/getAllShopType",shop.getAllShopType)
//删除店铺类别
app.delete("/deleteShopType",shop.deleteShopType)
//通过id获得店铺类别信息
app.get("/getShopTypeInfoById",shop.getShopTypeInfoById)
//修改店铺信息
app.put("/addshopType",shop.upShopType)

//添加店铺
app.post("/addShopList",shop.addShopList)
//获得店铺
app.get("/getShopList",shop.getShopList)
//删除店铺
app.delete("/deleteShop",shop.deleteShop)
//根据id获得店铺信息
app.get("/getShopById",shop.getShopById)
//修改店铺信息
app.put("/addShopList",shop.upShopList)
//根据店铺类别获得所有店铺列表
app.get("/getAllShop",shop.getAllShop)

/*---------------------------商品模块管理---------------------------------*/
//添加商品类型
app.post("/addGoodsType",goods.addGoodsType)
//按条件获得商品类型
app.get("/getGoodsType",goods.getGoodsType)
//获得id的商品类型
app.get("/getGoodsTypeById",goods.getGoodsTypeById)
//删除商品类型
app.delete("/deleteGoodsType",goods.deleteGoodsType)
//提交修改的商品类型
app.put("/addGoodsType",goods.upGoodsType)

//获取指定店铺的商品类别
app.get("/getAllGoodsType",goods.getAllGoodsType)
//添加商品
app.post("/addGoods",goods.addGoods)
//获得所有商品列表
app.get("/getGoodsList",goods.getGoodsList)
//删除商品
app.delete("/deleteGoods",goods.deleteGoods)
//根据id获得商品信息
app.get("/getGoodsById",goods.getGoodsById)
//修改商品信息
app.put("/addGoods",goods.upGoods)


app.listen(8081,function(){
    console.log("success");
})