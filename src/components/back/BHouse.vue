<template>
    <div>
        <el-table :data="list" width="100%" height="560px" :stripe="true" borde="3">
            <!-- prop显示绑定的数据的属性 -->
            <el-table-column prop="harea" label="区域"></el-table-column>
            <el-table-column prop="hcommunity" label="所属小区"></el-table-column>
            <el-table-column prop="htshi" label="房屋几室"></el-table-column>
            <el-table-column prop="hting" label="房屋几厅"></el-table-column>
            <el-table-column prop="htwei" label="房屋几卫"></el-table-column>
            <el-table-column prop="hmode" label="租赁方式">
                <template slot-scope="scope">
                    <p v-if="scope.row.hmode==='0'">整租</p>
                    <p v-else-if="scope.row.hmode==='1'">合租</p>
                </template>
            </el-table-column>
            <el-table-column prop="hprice" label="租金"></el-table-column>
            <el-table-column prop="hspace" label="房屋面积"></el-table-column>
            <el-table-column prop="hpaymethod" label="付款方式"></el-table-column>
            <el-table-column prop="hlabel" label="房屋标签"></el-table-column>
            <el-table-column prop="htime" label="发布时长"></el-table-column>
            <el-table-column prop="hpid" label="房屋图片">

            </el-table-column>
            <el-table-column prop="hadress" label="地址"></el-table-column>
            <el-table-column prop="udescribe" label="用户描述"></el-table-column>
            <el-table-column prop="htid" label="房屋配套">
                <template slot-scope="page">
                    <el-button type="text" @click="htidshow(page.row);htidState=true" circle>{{page.row.htid}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="hstate" label="房间状态">
                <template slot-scope="scope">
                    <p v-if="scope.row.hstate=='0'">在用</p>
                    <p v-else-if="scope.row.hstate=='1'">过期</p>
                </template>
            </el-table-column>
            <el-table-column prop="aid" label="房主信息">
                <template slot-scope="page">
                    <el-button type="text" @click="aidshow(page.row);aidState=true" circle>{{page.row.aid}}</el-button>
                </template>
            </el-table-column>
            <!--<el-table-column label="操作" fixed="right" width="100px">-->
            <!--<template slot-scope="page">-->
            <!--&lt;!&ndash;<el-button type="primary" @click="updateShow(page.row)" icon="el-icon-edit" circle></el-button>&ndash;&gt;-->
            <!--<el-button type="success" @click="deletebyId(page.row)" icon="el-icon-delete" circle></el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->
        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="this.currentPage.page"
                :page-sizes="[4, 8, 12, 16]"
                :page-size="this.currentPage.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="currentPage.pageTotal">
            </el-pagination>
        </div>

        <el-dialog width="40%" title="对应房源信息" :visible.sync="htidState">
            <el-form label-width="100px" label-suffix=":" :model="House_mating" class="form">
                <table>
                    <tr>
                        <td>
                            <el-form-item label="房源配套编号">
                                <span>{{ House_mating.id }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="装修类型">
                                <span>{{ House_mating.htype }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="朝向">
                                <span>{{ House_mating.htdirect }}</span>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>

                        <td>
                            <el-form-item label="床">
                                <span>{{ House_mating.htbed }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="车位">
                                <span>{{ House_mating.htcar }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="宽带">
                                <span>{{ House_mating.htweb }}</span>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="电视">
                                <span>{{ House_mating.htv }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="洗衣机">
                                <span>{{ House_mating.htwashing }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="宽带">
                                <span>{{ House_mating.htweb }}</span>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="暖气">
                                <span>{{ House_mating.htheating }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="空调">
                                <span>{{ House_mating.htait }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="冰箱">
                                <span>{{ House_mating.htrfrt }}</span>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="热水器">
                                <span>{{ House_mating.htheater }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="所在楼层">
                                <span>{{ House_mating.hfloor }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="总共楼层">
                                <span>{{ House_mating.hfloors }}</span>
                            </el-form-item>
                        </td>
                    </tr>
                </table>
            </el-form>
        </el-dialog>

        <el-dialog width="50%" title="对应用户信息" :visible.sync="aidState">
            <el-form label-width="100px" label-suffix=":" :model="Account" class="form">
                <table>
                    <tr>
                        <td>
                            <el-form-item label="用户账号编号">
                                <span>{{ Account.id }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="用户手机号">
                                <span>{{ Account.aphone }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="用户密码">
                                <span>{{ Account.apwd }}</span>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>

                        <td>
                            <el-form-item label="用户账号类型">
                                <span>
                                    <p v-if="Account.apost=='0'">租客</p>
                                    <p v-else-if="Account.apost=='1'">房东</p>
                                </span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="用户账号状态">
                                <span>
                                    <p v-if="Account.astate=='0'">在用</p>
                                    <p v-else-if="Account.astate=='1'">禁用</p>
                                </span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="用户性别">
                                <span>
                                    <p v-if="Account.usex=='0'">男</p>
                                    <p v-else-if="Account.usex=='1'">女</p>
                                </span>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="身份证姓名">
                                <span>{{ Account.aname }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="身份证号">
                                <span>{{ Account.anumber }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="注册时间">
                                <span>{{ Account.aborth }}</span>
                            </el-form-item>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-form-item label="地址">
                                <span>{{ Account.adress }}</span>
                            </el-form-item>
                        </td>
                        <td>
                            <el-form-item label="用户描述">
                                <span>{{ Account.adescribe }}</span>
                            </el-form-item>
                        </td>
                        <td></td>
                    </tr>
                </table>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    /* eslint-disable handle-callback-err,eqeqeq */

    export default {
        name: 'BHouse',
        data () {
            return {
                list: [],
                House: {},
                htidState: false,
                House_mating: {},
                aidState: false,
                Account: {},
                currentPage: {
                    pageTotal: 0,
                    pageSize: 4,
                    page: 1
                }
            }
        },
        created: function () {
            this.querys()
        },
        methods: {
            htidshow (row) {
                this.$axios.post('house_mating/selectId', {
                    htid: row.htid
                })
                    .then(response => {
                        if (response === '') {
                            // this.$message.error('刷新失败')
                        } else {
                            this.House_mating = response[0]
                            // this.$   message.success('刷新成功')
                        }
                    })
                    .catch(err => {
                        this.$message.error('失败')
                    })
            },
            aidshow (row) {
                this.$axios.post('account/selectId', {
                    id: row.aid
                })
                    .then(response => {
                        if (response === '') {
                            // this.$message.error('刷新失败')
                        } else {
                            this.Account = response[0]
                            // this.$   message.success('刷新成功')
                        }
                    })
                    .catch(err => {
                        this.$message.error('失败')
                    })
            },
            handleSizeChange (val) {
                console.log('每页', this.currentPage.pageSize, '条')
                this.currentPage.pageSize = val
                this.querys()
            },
            handleCurrentChange (val) {
                console.log('当前页:', this.currentPage.page)
                this.currentPage.page = val
                this.querys()
            },
            querys: function () {
                this.$axios.post('house/selectAll', {
                    pageNum: this.currentPage.page,
                    pageSize: this.currentPage.pageSize
                })
                    .then(response => {
                        if (response === '') {
                            this.$message.error('刷新失败')
                        } else {
                            this.list = response.list
                            this.currentPage.pageTotal = response.total
                            this.$message.success('刷新成功')
                        }
                    })
                    .catch(err => {
                        this.$message.error('失败')
                    })
            }
        }
    }
</script>

<style scoped>

</style>
