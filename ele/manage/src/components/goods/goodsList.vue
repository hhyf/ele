<template>
    <div>
        <el-form :inline="true" class="demo-form-inline" ref="">
            <el-form-item label="搜索">
                <el-input placeholder="请输入搜索商品名称" v-model="keyWord"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" circle @click="getGoodsList(1)"></el-button>
                <el-button type="primary" @click="goodsVisible = true">添加商品</el-button>
            </el-form-item>
        </el-form>
        <el-table
            :data="goodsList"
            style="width: 100%"
            v-loading = "loading"
            border>
            <el-table-column  label="提交日期">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.addTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品图片">
                <template slot-scope="scope">
                    <img :src="scope.row.goodsPic | imgUrl" width="40px" alt="">
                </template>
            </el-table-column>
            <el-table-column label="商品名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.goodsName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品价格">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.goodsPrice | currency({num : 2,type : "￥"})}}</span>
                </template>
            </el-table-column>
            <el-table-column label="店铺类别">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.shopTypeList[0].shopTypeName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="店铺">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.shopList[0].shopName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品类别">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.goodsTypeList[0].goodsTypeName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否热销">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.isHot/1 === 0  ? '不推荐':'推荐'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作"  width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="openVisibleGoods(scope.row._id)">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="deleteGoods(scope.row._id)">
                        删除
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
                @current-change="getGoodsList(pageIndex)">
            </el-pagination>
        </div>
        <addGoods v-if="goodsVisible" :goodsVisible.sync="goodsVisible" :getGoodsList="getGoodsList" :goodsId="goodsId"></addGoods>
    </div>
</template>

<script>
    import axios from "axios"
    import addGoods from "@/components/goods/addGoods"
    export default {
        name: "goodsList",
        components : {
            addGoods
        },
        data(){
            return {
                goodsVisible : false,
                pageIndex : 1,
                pageSum : 1,
                goodsList : [],
                goodsId : "",
                keyWord :"",
                loading : false
            }
        },
        methods : {
            //获得所有商品列表
            getGoodsList(pageIndex){
                this.loading = true;
                axios.get("/getGoodsList",{
                    params : {
                        pageIndex,
                        keyWord : this.keyWord
                    }
                }).then(data=>{
                    this.loading = false;
                    this.pageSum = data.pageSum;
                    this.goodsList = data.goodsList
                })
            },
            deleteGoods(id){
                axios.delete("/deleteGoods",{
                    params : {
                        goodsId : id,
                        adminId : localStorage.id,
                        adminName : localStorage.adminName
                    }
                }).then(data=>{
                    if(data.ok === 1){
                        this.getGoodsList(this.pageIndex);
                    }else{
                        this.$message.error(data.msg);
                    }
                })
            },
            openVisibleGoods(id){
                this.goodsId = id;
                this.goodsVisible = true
            }
        },
        mounted(){
            this.getGoodsList(1)
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
