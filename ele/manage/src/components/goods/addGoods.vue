<template>
    <el-dialog :visible.sync="goodsVisible">
        <el-form>
            <el-form-item label="店铺类别名称" :label-width="formLabelWidth">
                <el-select v-model="shopTypeId" placeholder="请选择" @change="getShop(shopTypeId)">
                    <el-option
                        v-for="item in shopTypeList"
                        :key = "item._id"
                        :label = "item.shopTypeName"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺名称" :label-width="formLabelWidth">
                <el-select v-model="shopId" placeholder="请选择" @change="getGoodsType(shopId)">
                    <el-option
                        v-for="item in shopList"
                        :key = "item._id"
                        :label = "item.shopName"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品类别名称" :label-width="formLabelWidth">
                <el-select v-model="goodsTypeId" placeholder="请选择" >
                    <el-option
                        v-for="item in goodsTypeList"
                        :key = "item._id"
                        :label = "item.goodsTypeName"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input ref="goodsName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品单价" :label-width="formLabelWidth">
                <el-input ref="goodsPrice" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否热销" :label-width="formLabelWidth">
                <el-radio v-model="radio" label="1">热销</el-radio>
                <el-radio v-model="radio" label="0">不热销</el-radio>
            </el-form-item>
            <el-form-item label="商品图片" :label-width="formLabelWidth">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    action=""
                    :on-change="upChange"
                    :limit = "1"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <img v-if="imgUrl.length > 0" :src="imgUrl" alt="">
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:goodsVisible',false)">取 消</el-button>
            <el-button type="primary" @click="addShop">提交</el-button>
        </div>
    </el-dialog>
</template>
    
<script>
    import axios from "axios"
    export default {
        name: "addGoods",
        props : ["goodsVisible","getGoodsList","goodsId","GoodsId","ShopTypeId","ShopId"],
        data(){
            return {
                formLabelWidth : "120px",
                shopTypeId : "",
                shopTypeList : [],
                shopId : "",
                shopList : [],
                goodsTypeId : "",
                goodsTypeList : [],
                radio : "1",
                imgUrl : ""
            }
        },
        methods : {
            //获取所有店铺类型
            getShopType(){
                axios.get("/getAllShopType").then(data=>{
                    if(data.ok === 1){
                        this.shopTypeList = data.shopTypeList
                    }
                })
            },
            //获取指定店铺类型的店铺
            getShop(id){
                axios.get("/getAllShop",{
                    params : {
                        shopTypeId : id
                    }
                }).then(data=>{
                    if(data.ok === 1){
                        this.shopList = data.shopList;
                    }
                })
            },
            //获得指定店铺的商品类别
            getGoodsType(id){
                axios.get("/getAllGoodsType",{
                    params : {
                        shopId : id
                    }
                }).then(data=>{
                    if(data.ok === 1){
                        this.goodsTypeList = data.goodsTypeList;
                    }
                })
            },
            //添加商品
            addShop(){
                var formdata = new FormData();
                formdata.set("adminId",localStorage.id);
                formdata.set("adminName",localStorage.adminName);
                formdata.set("goodsName",this.$refs.goodsName.$data.currentValue);
                formdata.set("goodsPrice",this.$refs.goodsPrice.$data.currentValue);
                formdata.set("isHot",this.radio);
                formdata.set("goodsPic",document.querySelector(".el-upload__input").files[0]);
                formdata.set("shopTypeId",this.shopTypeId);
                formdata.set("shopId",this.shopId);
                formdata.set("goodsTypeId",this.goodsTypeId);
                if(this.goodsId){
                    formdata.set("goodsId",this.goodsId);
                    axios.put("/addGoods",formdata).then(data=>{
                        if(data.ok === 1){
                            this.getGoodsList(1);
                            this.$message.success(data.msg)
                            this.$emit("update:goodsVisible",false);
                        }else{
                            this.$message.error(data.msg);
                        }
                    })
                }else{
                    axios.post("/addGoods",formdata).then(data=>{
                        if(data.ok === 1){
                            if(this.GoodsId){
                                this.$router.push("/goodsList");
                                this.$message.success(data.msg)
                            }else{
                                this.getGoodsList(1);
                                this.$message.success(data.msg)
                            }
                            this.$emit("update:goodsVisible",false);
                        }else{
                            this.$message.error(data.msg);
                        }
                    })
                }
                this.$refs.goodsName.clear();
                this.$refs.goodsPrice.clear();
                this.radio = "";
                this.shopTypeId = ""
                this.shopId = "";
                this.goodsTypeId = ""
            },
            //根据id获得商品的信息
            getGoodsById(){
                axios.get("/getGoodsById",{
                    params : {
                        goodsId : this.goodsId
                    }
                }).then(data=>{
                    if(data.ok === 1){
                        this.shopTypeId = data.goodsInfo.shopTypeId;
                        this.getShop(this.shopTypeId);
                        this.shopId = data.goodsInfo.shopId;
                        this.getGoodsType(this.shopId);
                        this.goodsTypeId = data.goodsInfo.goodsTypeId;
                        this.$refs.goodsName.$data.currentValue = data.goodsInfo.goodsName;
                        this.$refs.goodsPrice.$data.currentValue = data.goodsInfo.goodsPrice;
                        this.radio = data.goodsInfo.isHot;
                        this.imgUrl = "http://127.0.0.1:8081/"+data.goodsInfo.goodsPic;
                    }else{
                        this.$message.error(data.msg)
                    }
                })
            },
            //上传图片时显示图片
            upChange(file){
                this.$refs.upload.clearFiles();
                var reader=new FileReader();
                reader.readAsDataURL(file.raw);
                // 转为base64
                var _this=this;
                reader.onload=function(){
                    _this.imgUrl=this.result;
                }
            }
        },
        mounted(){
            this.getShopType();
            this.shopTypeId = this.ShopTypeId;
            this.shopId = this.ShopId;
            this.goodsTypeId = this.GoodsId;
            if(this.goodsId){
                this.getGoodsById();
            }
            if(this.ShopTypeId){
                this.getShop(this.ShopTypeId);
            }
            if(this.ShopId){
                this.getGoodsType(this.ShopId)
            }
        }
    }
</script>

<style scoped>

</style>
