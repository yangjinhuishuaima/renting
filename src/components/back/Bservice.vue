<template>
    <div>
        <el-table border :data="list.slice((currentPage-1)*PageSize,currentPage*PageSize)" stripe height="550px">
            <!--<el-table-column label="编号" prop="sid"></el-table-column>-->
            <el-table-column label="房东电话" prop="aphone"></el-table-column>
            <el-table-column label="所属小区" prop="hcommunity"></el-table-column>
            <el-table-column label="服务费用" prop="sprice"></el-table-column>
            <el-table-column label="交易时间" prop="srtime"></el-table-column>
            <!--<el-table-column label="操作">-->
                <!--&lt;!&ndash; scope：返回当前单元格 &ndash;&gt;-->
                <!--<template slot-scope="scope">-->
                    <!--<el-button type="warning" round size="mini" icon="el-icon-search" @click="show(scope.row)"></el-button>-->
                    <!--<el-button type="danger" round size="mini" icon="el-icon-search" @click="show2(scope.row)"></el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        </el-table>
        <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="PageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Bservice",
        data () {
            return {
                manager: {},
                list: [],
                shows: false, // 是否隐藏div
                // diyMethods:'',
                // 默认显示第几页
                currentPage: 1,
                // 总条数，根据接口获取数据长度(注意：这里不能为空)
                totalCount: 1,
                // 个数选择器（可修改）
                pageSizes: [3, 6, 9, 12],
                // 默认每页显示的条数（可修改）
                PageSize: 3,
            }
        },
        created: function () {
            this.select()
        },
        methods: {
            // 每页显示的条数
            handleSizeChange (val) {
                // 改变每页显示的条数
                this.PageSize = val
                // 注意：在改变每页显示的条数时，要将页码显示到第一页
                this.currentPage = 1
            },
            // 显示第几页
            handleCurrentChange (val) {
                // 改变默认的页数
                this.currentPage = val
            },
            select: function () {
                this.$axios.post('server/findsah')
                    .then(res => {
                        this.list = res
                        this.totalCount = res.length
                        this.handleCurrentChange(1)
                    })
            },
        }
    }
</script>

<style scoped>

</style>
