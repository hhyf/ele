<template>
    <el-dialog :visible.sync="goodsTypeVisible">
        <el-form>
            <el-form-item label="店铺类别名称" :label-width="formLabelWidth">
                <el-select v-model="shopTypeId" placeholder="请选择" @change="getShop(shopTypeId)">
                    <el-option
                        v-for="item in shopType"
                        :key = "item._id"
                        :label = "item.shopTypeName"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺名称" :label-width="formLabelWidth">
                <el-select v-model="shopId" placeholder="请选择" >
                    <el-option
                        v-for="item in shop"
                        :key = "item._id"
                        :label = "item.shopName"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品类型名称" :label-width="formLabelWidth">
                <el-input ref="goodsTypeName" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:goodsTypeVisible',false)">取 消</el-button>
            <el-button type="primary" @click="addGoodsType">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import axios from "axios"
    export default {
        name: "addGoodsType",
        props : ["goodsTypeVisible","getGoodsType","goodsTypeId","shopGId","shopTGId"],
        data(){
            return {
                formLabelWidth : "120px",
                shopType : [],
                shop : [],
                shopTypeId : "",
                shopId : "",
                nowGoodsTypeId : ""
            }
        },
        methods : {
            //获得店铺类型
            getShopType(){
                axios.get("/getAllShopType").then(data=>{
                    if(data.ok === 1){
                        this.shopType = data.shopTypeList
                    }
                })
            },
            getShop(id){
                axios.get("/getAllShop",{
                    params : {
                        shopTypeId : id
                    }
                }).then(data=>{
                    if(data.ok === 1){
                        this.shop = data.shopList;
                    }
                })
            },
            addGoodsType(){
                var obj = {
                    shopTypeId : this.shopTypeId,
                    shopId : this.shopId,
                    adminId : localStorage.id,
                    adminName : localStorage.adminName,
                    goodsTypeName : this.$refs.goodsTypeName.$data.currentValue
                }
                if(this.goodsTypeId){
                    obj.goodsTypeId = this.goodsTypeId
                    axios.put("/addGoodsType",obj).then(data=>{
                        if(data.ok === 1){
                            this.getGoodsType(1);
                            this.$message.success(data.msg)
                        }else{
                            this.$message.error(data.msg)
                        }
                        this.$emit("update:goodsTypeVisible",false);
                    })
                }else{
                    axios.post("/addGoodsType",obj).then(data=>{
                        if(data.ok === 1){
                            if(this.shopGId){
                                this.$router.push("/goodsType");
                                this.$message.success(data.msg)
                            }else{
                                this.getGoodsType(1);
                                this.$message.success(data.msg)
                            }
                        }else{
                            this.$message.error(data.msg)
                        }
                        this.$emit("update:goodsTypeVisible",false);
                    })
                }
                this.shopId = "";
            },
            //根据id获得商品类别
            getGoodsTypeById(){
                axios.get("/getGoodsTypeById",{
                    params : {
                        goodsTypeId : this.goodsTypeId
                    }
                }).then(data=>{
                    if(data.ok === 1){
                        this.shopTypeId = data.goodsTypeInfo.shopTypeId;
                        this.getShop(this.shopTypeId);
                        this.shopId = data.goodsTypeInfo.shopId;
                        this.$refs.goodsTypeName.$data.currentValue = data.goodsTypeInfo.goodsTypeName;
                    }else{
                        this.$message.error(data.msg);
                    }
                })
            },

        },
        mounted(){
            this.getShopType();
            this.shopTypeId = this.shopTGId;
            this.shopId = this.shopGId;
            if(this.goodsTypeId){
                this.getGoodsTypeById();
            }
            if(this.shopTGId){
                this.getShop(this.shopTGId)
            }
        }
    }
</script>

<style scoped>

</style>
