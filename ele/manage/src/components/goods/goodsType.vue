<template>
    <div>
        <el-form :inline="true" class="demo-form-inline" ref="myForm">
            <el-form-item label="搜索">
                <el-input placeholder="请输入搜索商品类别名称" v-model="keyWord"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" circle @click="getGoodsType(1)"></el-button>
                <el-button type="primary" @click="goodsTypeVisible = true">添加商品类别</el-button>
            </el-form-item>
        </el-form>
        <addGoodsType v-if="goodsTypeVisible" :goodsTypeVisible.sync="goodsTypeVisible" :getGoodsType = "getGoodsType" :goodsTypeId ="goodsTypeId"></addGoodsType>
        <el-table
            :data="goodsTypeList"
            style="width: 100%"
            v-loading = "loading"
            border>
            <el-table-column  label="提交日期">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.addTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品类别名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.goodsTypeName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="店铺类型名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.shopTypeList[0].shopTypeName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="店铺名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.shopList[0].shopName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作"  width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="openVisible(scope.row._id)">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="deleteGoodsType(scope.row._id)">
                        删除
                    </el-button>
                     <el-button size="mini" type="primary" @click="openGoods(scope.row._id,scope.row.shopTypeList[0]._id,scope.row.shopList[0]._id)">
                         添加商品
                     </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                :current-page.sync="pageIndex"
                :page-count="pageSum"
                @current-change="getGoodsType(pageIndex)">
            </el-pagination>
        </div>
        <addGoods v-if="goodsVisible" :goodsVisible.sync="goodsVisible" :GoodsId="GoodsId" :ShopTypeId="ShopTypeId" :ShopId="ShopId"></addGoods>
    </div>
</template>

<script>
    import addGoodsType from "@/components/goods/addGoodsType"
    import addGoods from "@/components/goods/addGoods"
    import axios from "axios"
    export default {
        name: "goodsType",
        data(){
            return {
                goodsTypeVisible : false,
                goodsVisible : false,
                pageIndex : 1,
                pageSum : 1,
                goodsTypeList : [],
                goodsTypeId : "",
                GoodsId : "",
                ShopTypeId : "",
                ShopId : "",
                keyWord : "",
                loading : false
            }
        },
        methods : {
            //获得商品类别
            getGoodsType(pageIndex){
                this.loading = true;
                axios.get("/getGoodsType",{
                    params : {
                        pageIndex,
                        keyWord : this.keyWord
                    }
                }).then(data=>{
                    this.loading = false;
                    if(data.ok === 1){
                        this.goodsTypeList = data.goodsTypeList;
                        this.pageSum = data.pageSum
                    }
                })
            },
            openVisible(id){
                this.goodsTypeId = id;
                this.goodsTypeVisible = true;
            },
            //删除商品类别
            deleteGoodsType(id){
                axios.delete("/deleteGoodsType",{
                    params : {
                        goodsTypeId : id,
                        adminId : localStorage.id,
                        adminName : localStorage.adminName
                    }
                }).then(data=>{
                    if(data.ok === 1){
                       this.getGoodsType(this.pageIndex);
                       this.$message.success(data.msg);
                    }else{
                        this.$message.error(data.msg);
                    }
                })
            },
            openGoods(goodsid,shopTypeId,shopId){
                // console.log(goodsid,shopTypeId,shopId)
                this.goodsVisible = true;
                 this.GoodsId = goodsid;
                 this.ShopTypeId = shopTypeId;
                 this.ShopId = shopId;
            }
        },
        components : {
            addGoodsType,
            addGoods
        },
        mounted(){
            this.getGoodsType(1)
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
