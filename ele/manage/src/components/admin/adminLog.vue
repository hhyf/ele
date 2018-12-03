<template>
    <div>
        <div class="toolbarTop">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="搜索">
                    <el-input placeholder="请输入搜索的日志类别"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
            :data="adminLogList"
            border
            style="width: 100%;text-align: center">
            <el-button>点我</el-button>
            <el-table-column
                prop="addTime"
                label="添加日期">
            </el-table-column>
            <el-table-column
                prop="adminId"
                label="管理员Id">
            </el-table-column>
            <el-table-column
                label="类型">
                <template slot-scope="scope">
                    {{logTypeEnum[scope.row.logType]}}
                </template>
            </el-table-column>
            <el-table-column
                prop="detail"
                label="详情">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="deleteAdminLog(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                :page-count="pageSum"
                @current-change="getAdminLog">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "adminLog",
        data(){
            return {
                adminLogList : [],
                logTypeEnum : {},
                pageSum : 1,
                pageIndex : 1
            }
        },
        methods : {
            getAdminLog(pageIndex){
                var _this = this;
                this.$store.dispatch('getAdminLogList',{
                    pageIndex,
                    cb(data){
                        console.log(data)
                        _this.adminLogList = data.adminLogList;
                        _this.logTypeEnum = data.LogTypeEnum;
                        _this.pageSum = data.pageSum;
                        _this.pageIndex = data.pageIndex / 1;
                    }
                });
            },
            deleteAdminLog(id){
                var _this = this;
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('deleteLog',{
                        logId : id,
                        success(data){
                            _this.getAdminLog(_this.pageIndex);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        mounted(){
            this.getAdminLog(1);
        }
    }
</script>

<style scoped>
    .el-table td, .el-table th.is-leaf{
        text-align: center;
    }
    .toolbar{
        padding: 10px;
        margin: 10px 0;
        display: flex;
        justify-content: center;
    }
</style>
