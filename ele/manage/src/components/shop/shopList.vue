<template>
    <div>
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="搜索">
                <el-input placeholder="请输入搜索店铺名称" v-model="keyWord"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button icon="el-icon-search" circle @click="getShopList(1)"></el-button>
                <el-button type="primary" @click="dialogFormVisible = true">添加店铺</el-button>
            </el-form-item>
        </el-form>
        <addShop v-if="dialogFormVisible" :dialogFormVisible.sync="dialogFormVisible" :getShopList="getShopList" :shopId="shopId"></addShop>
        <el-table
            :data="shopList"
            style="width: 100%"
            v-loading="loading"
        border>
            <el-table-column  label="提交日期">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.addTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="店铺图片">
                <template slot-scope="scope">
                    <!--<img src="/static/img/1542707217920.6e59363.jpg" width="40px" alt="">-->
                    <img :src="scope.row.shopPic | imgUrl" width="40px" alt="">
                </template>
            </el-table-column>
            <el-table-column label="店铺名称">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.shopName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="店铺排序">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.orderNum }}</span>
                </template>
            </el-table-column>
            <el-table-column label="店铺类别">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.shopType[0].shopTypeName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="是否推荐">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.isRecomment/1 === 0  ? '不推荐':'推荐'}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作"  width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="getShopById(scope.row._id)">
                        编辑
                    </el-button>
                    <el-button size="mini" type="danger" @click="deleteShop(scope.row._id)">
                        删除
                    </el-button>
                     <el-button size="mini" type="primary" @click="openVisible(scope.row.shopType[0]._id,scope.row._id)">
                         添加商品类别
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
                @current-change="getShopList(pageIndex)">
            </el-pagination>
            <addGoodsType v-if="goodsTypeVisible" :goodsTypeVisible.sync="goodsTypeVisible" :shopGId="shopGId" :shopTGId="shopTGId"></addGoodsType>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import addShop from "@/components/shop/addShop"
    import addGoodsType from '@/components/goods/addGoodsType'
    export default {
        name: "shopList",
        components : {
            addShop,
            addGoodsType
        },
        data(){
            return {
                options : [],
                dialogFormVisible : false,
                goodsTypeVisible : false,
                value : '',
                formLabelWidth : '120px',
                radio : '1',
                dataId : null,
                shopList : [],
                pageSum : 1,
                pageIndex : 1,
                shopId : "",
                shopGId : "",
                shopTGId : "",
                keyWord : "",
                loading : false
            }
        },
        methods : {
            //获得店铺
            getShopList(pageIndex){
                this.loading = true;
                axios.get("/getShopList",{
                    params : {
                        pageIndex,
                        keyWord : this.keyWord
                    }
                }).then(data=>{
                    this.loading = false;
                    if(data.ok === 1){
                        this.dialogFormVisible = false;
                        this.shopList = data.shopList;
                        this.pageSum = data.pageSum;
                    }
                })
            },
            //删除店铺
            deleteShop(id){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.delete("/deleteShop",{
                        params : {
                            shopId : id,
                            adminId : localStorage.id,
                            adminName : localStorage.adminName
                        }
                    }).then(data=>{
                        if(data.ok === 1){
                            this.getShopList(this.pageIndex);
                            this.$message({
                                message : "删除成功",
                                type : "success"
                            })
                        }else{
                            this.$message({
                                message : data.msg,
                                type : "error"
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //给addShop传递数据
            getShopById(id){
                this.dialogFormVisible = true;
                this.shopId = id;
            },

            //给goodsType传递数据
            openVisible(shopTypeId,shopId){
                this.shopTGId = shopTypeId;
                this.shopGId = shopId;
                this.goodsTypeVisible = true
            }
        },
        mounted(){
            this.getShopList(1);
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
