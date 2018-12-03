<template>
    <el-dialog :visible.sync="dialogFormVisible">
        <el-form>
            <el-form-item label="店铺类别名称" :label-width="formLabelWidth">
                <el-select v-model="shopTypeId" placeholder="请选择" >
                    <el-option
                        v-for="item in options"
                        :key = "item._id"
                        :label = "item.shopTypeName"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺名称" :label-width="formLabelWidth">
                <el-input ref="shopName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺排序" :label-width="formLabelWidth">
                <el-input ref="orderNum" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="是否推荐" :label-width="formLabelWidth" :ref="radio">
                <el-radio v-model="radio" label="1">推荐</el-radio>
                <el-radio v-model="radio" label="0">不推荐</el-radio>
            </el-form-item>
            <el-form-item label="店铺图片" :label-width="formLabelWidth">
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
            <img v-if="imgUrl.length > 0" :src="imgUrl" alt="" width="200">
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:dialogFormVisible',false)">取 消</el-button>
            <el-button type="primary" @click="addShopList">提交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import axios from "axios"
    export default {
        name: "addShop",
        props :["dialogFormVisible","getShopType","getShop","getShopList","shopType","shopId"],
        data(){
            return {
                formLabelWidth : '120px',
                radio : '1',
                dataId : null,
                value : '',
                options : [],
                shopTypeId : "",
                imgUrl : ""
            }
        },
        methods : {
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
            },
            //添加店铺
            addShopList(){
                var formData = new FormData();
                formData.set("adminId",localStorage.id);
                formData.set("adminName",localStorage.adminName);
                formData.set("shopName",this.$refs.shopName.$data.currentValue);
                formData.set("isRecomment",this.radio);
                formData.set("shopTypeId",this.shopTypeId);
                formData.set("orderNum",this.$refs.orderNum.$data.currentValue);
                formData.set("shopPic",document.querySelector(".el-upload__input").files[0]);
                if(this.shopId){
                    formData.set("shopId",this.shopId);
                    axios.put("/addShopList",formData).then(data=>{
                        if(data.ok === 1){
                            this.getShopList(1);
                            this.$message({
                                message : "修改成功",
                                type : "success"
                            })
                        }else{
                            this.$message.error(data.msg);
                        }
                    })
                }else{
                    axios.post("/addShopList",formData).then(data=>{
                        if(data.ok === 1){
                            if(this.shopType){
                                this.$router.push("/shopList");
                            }else{
                                this.getShopList(1);
                                this.$message({
                                    message : "添加成功",
                                    type : "success"
                                })
                            }
                            this.$emit("update:dialogFormVisible",false);
                        }else{
                            this.getShopList(1)
                            this.$message({
                                message : data.msg,
                                type : "info"
                            })
                            this.$emit("update:dialogFormVisible",false);
                        }
                    })
                }
                this.$refs.shopName.clear();
                this.$refs.orderNum.clear();
                this.radio = "1";
                this.shopTypeId = "";
                this.$refs.upload.clearFiles();
            },
            //获得店铺类型
            getShopTypeList(){
                axios.get("/getAllShopType").then(data=>{
                    this.options = data.shopTypeList;
                })
            },
            //根据id获得店铺信息
            getShopById(){
                axios.get("/getShopById",{
                    params : {
                        shopId : this.shopId
                    }
                }).then(data=>{
                    if(data.ok === 1){
                        this.$refs.shopName.$data.currentValue = data.shopInfo.shopName;
                        this.$refs.orderNum.$data.currentValue = data.shopInfo.orderNum;
                        this.shopTypeId = data.shopInfo.shopTypeId;
                        this.radio = data.shopInfo.isRecomment.toString();
                        this.imgUrl = "http://127.0.0.1:8081/"+data.shopInfo.shopPic
                    }else{
                        this.$message.error(data.msg)
                    }
                })
            }
        },
        mounted(){
            this.getShopTypeList();
            this.shopTypeId = this.shopType;
            if(this.shopId){
                this.getShopById();
            }
        }
    }
</script>

<style scoped>

</style>
