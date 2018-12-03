<template>
    <div>
        <el-form :inline="true" class="demo-form-inline" ref="myForm">
            <el-form-item label="搜索">
                <el-input placeholder="请输入搜索店铺类别名称" v-model="keyWord"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" circle @click="getShopTypeList(1)"></el-button>
                <el-button type="primary" @click="dialogFormVisible1 = true">添加店铺类别</el-button>
                <el-button type="primary" @click="" class="el-icon-arrow-down" @click="getShopTypeList(pageIndex,1)">店铺类别排序</el-button>
                <el-button type="primary" @click="" class="el-icon-arrow-down" @click="getShopTypeList(pageIndex,2)">提交时间排序</el-button>
                <el-dialog :visible.sync="dialogFormVisible1">
                    <el-form>
                        <el-form-item label="店铺类别名称" :label-width="formLabelWidth">
                            <el-input ref="shopTypeName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="店铺类别排序" :label-width="formLabelWidth">
                            <el-input ref="orderNum" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="店铺类别图片" :label-width="formLabelWidth">
                            <el-upload
                                class="upload-demo"
                                ref="upload"
                                action=""
                                :limit = "1"
                                :on-change = "upChange"
                                :auto-upload="false">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            </el-upload>
                        </el-form-item>
                        <img v-if="imgurl.length > 0" :src="imgurl" alt="">
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                        <el-button type="primary" @click="submitShopType">提交</el-button>
                    </div>
                </el-dialog>
            </el-form-item>
        </el-form>
        <el-table
            :data="shopTypeList"
            style="width: 100%"
            v-loading="loading">
            <el-table-column  label="提交日期">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.addTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="店铺类别图片">
                <template slot-scope="scope">
                    <img :src="scope.row.shopTypePic | imgUrl" width="40px" alt="">
                </template>
            </el-table-column>
            <el-table-column label="店铺类别">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.shopTypeName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="店铺类别排序">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.orderNum }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" style="width: 240px">
                <template slot-scope="scope">
                    <el-button type="info" icon="el-icon-edit" circle @click="openVisible(scope.row._id)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteShopType(scope.row._id)"></el-button>
                    <el-button type="primary" @click="addShopList(scope.row._id)">
                        添加店铺
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <addShop v-if="dialogFormVisible" :dialogFormVisible.sync="dialogFormVisible" :shopType="shopType"></addShop>
        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="pageIndex"
                :page-count="pageSum"
                @current-change="getShopTypeList(pageIndex)">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import axios from "axios"
    import addShop from "@/components/shop/addShop"
    export default {
        name: "shopType",
        components : {
            addShop
        },
        data(){
            return {
                dialogFormVisible1 : false,//添加店铺类别
                dialogFormVisible : false,//添加店铺
                formLabelWidth: '120px',
                shopTypeList : [],
                shopType : "",
                imgurl : "",
                shopTypeId : "",
                pageIndex : 1,
                pageSum : 1,
                keyWord : "",
                loading : false
            }
        },
        methods : {
            //添加店铺类型
            submitShopType(){
                var _this = this;
                var formData = new FormData();
                formData.set("adminId",localStorage.id);
                formData.set("adminName",localStorage.adminName);
                formData.set("shopTypeName",this.$refs.shopTypeName.$data.currentValue);
                formData.set("orderNum",this.$refs.orderNum.$data.currentValue);
                formData.set("shopTypePic",document.querySelector(".el-upload__input").files[0]);
                if(this.shopTypeId){
                    formData.set("shopTypeId",this.shopTypeId)
                    axios.put("/addshopType",formData).then(data=>{
                        if(data.ok === 1){
                            this.getShopTypeList(this.pageIndex);
                            this.dialogFormVisible1 = false;
                            this.shopTypeId = "";
                            this.imgurl = "";
                            this.$refs.upload.clearFiles();
                        }else{
                            this.$message.error(data.msg);
                        }
                    })
                }else{
                    axios.post("/addShopType?adminId="+localStorage.id,formData).then(data=>{
                        this.dialogFormVisible1 = false;
                        if(data.ok === 1){
                            this.getShopTypeList();
                            this.$message({
                                message : data.msg,
                                type : "success"
                            })
                        }else{
                            this.$message({
                                message : data.msg,
                                type : "success"
                            })
                        }
                    })
                }
                this.$refs.shopTypeName.clear();
                this.$refs.orderNum.clear();
                this.$refs.upload.clearFiles();
                this.imgurl = "";
            },
            getShopTypeList(pageIndex,sortType){
                this.loading = true
                axios.get("/getShopTypeList",{
                    params : {
                        pageIndex,
                        sortType,
                        keyWord : this.keyWord
                    }
                }).then(data=>{
                    this.loading = false
                    this.shopTypeList = data.shopTypeList;
                    this.pageSum = data.pageSum;
                })
            },
            deleteShopType(id){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete("/deleteShopType",{
                        params : {
                            shopTypeId : id,
                            adminId : localStorage.id,
                            adminName : localStorage.adminName
                        }
                    }).then(data=>{
                        console.log(data)
                        if(data.ok === 1){
                            this.getShopTypeList(this.pageIndex,0);
                            this.$message({
                                message : "删除成功",
                                type : "success"
                            })
                        }else{
                            this.$message.error(data.msg)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addShopList(id){
                this.shopType = id;
                this.dialogFormVisible = true
            },
            openVisible(id){
                this.dialogFormVisible1 = true;
                axios.get("/getShopTypeInfoById",{
                    params : {
                        shopTypeId : id
                    }
                }).then(data=>{
                    this.$refs.shopTypeName.$data.currentValue = data.shopTypeInfo.shopTypeName;
                    this.$refs.orderNum.$data.currentValue = data.shopTypeInfo.orderNum;
                    this.imgurl = "http://127.0.0.1:8081/"+data.shopTypeInfo.shopTypePic;
                    this.shopTypeId = data.shopTypeInfo._id;
                })
            },
            upChange(file){
                this.$refs.upload.clearFiles();
                var reader=new FileReader();
                reader.readAsDataURL(file.raw);
                // 转为base64
                var _this=this;
                reader.onload=function(){
                    _this.imgurl=this.result;
                }
            },
        },
        mounted(){
            this.getShopTypeList(1,0);
        }
    }
</script>

<style scoped>
    .toolbar{
        padding: 10px;
        display: flex;
        margin-top: 30px;
        justify-content: center;
    }
</style>
