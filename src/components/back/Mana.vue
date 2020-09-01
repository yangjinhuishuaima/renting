<template>
    <div>
        <el-button style="float: left" type="success" @click="show()">添加</el-button>
        <el-table border :data="list.slice((currentPage-1)*PageSize,currentPage*PageSize)" stripe height="550px">
            <!--<el-table-column label="编号" prop="mgid"></el-table-column>-->
            <el-table-column label="姓名" prop="mgname"></el-table-column>
            <el-table-column label="密码" prop="mgpwd"></el-table-column>
            <el-table-column label="角色" prop="role_name"></el-table-column>
            <!--<el-table-column label="状态" prop="mgstate"></el-table-column>-->
            <el-table-column prop="mgstate" label="启用/禁用">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mgstate" active-color="#13ce66" inactive-color="#ff4949" active-text="启用" :active-value="0" inactive-text="禁用" :inactive-value="1"
                               @change="changePro($event,scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <!-- scope：返回当前单元格 -->
                <template slot-scope="scope">
                    <el-button type="warning" round size="mini" icon="el-icon-edit" @click="show(scope.row)"></el-button>
                    <el-button type="danger" round size="mini" icon="el-icon-delete" @click="deletes(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="PageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount">
        </el-pagination>
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="manager" label-suffix=": "  label-width="100px" :rules="rules" ref="fm">
                <!--<el-form-item label="编号" prop="mgid">-->
                    <!--<el-input v-model="manager.mgid"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="姓名" prop="mgname">-->
                    <!--<el-input v-model="manager.mgname"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="密码" prop="mgpwd">-->
                    <!--<el-input v-model="manager.mgpwd"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="角色" prop="role_id">
                    <el-input :disabled="true" value="普通管理员"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-switch  :disabled="true" v-model="manager.mgstate"
                                active-color="#13ce66" inactive-color="#ff4949" active-text="启用" :active-value="0"
                                inactive-text="禁用" :inactive-value="1">
                    </el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="showdiv" round>生成账号</el-button>
                </el-form-item>
                <div v-if="shows">
                    <el-form-item label="账号" prop="mgname">
                        <el-input :disabled="true" v-model="manager.mgname"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="mgpwd">
                        <el-input :disabled="true" clearable show-password v-model="manager.mgpwd"></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false,shows=false">取 消</el-button>
                <el-button type="primary" @click="saves()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'Mana',
  data () {
    return {
      dialogFormVisible: false,
      title: '',
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
      rules: {
        mgid: {required: true, message: '不可为空', trigger: ['blur', 'change']},
        mgname: {required: true, message: '不可为空', trigger: ['blur', 'change']},
        mgpwd: {required: true, message: '不可为空', trigger: ['blur', 'change']}
      }
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
    showdiv: function () { // 显示隐藏账号密码
      if (this.shows !== true) {
        this.shows = !this.shows
        let datetime = new Date().getTime()
        let timestamp = Math.round((datetime / 1000).toString())
        this.manager.mgname = timestamp
        this.manager.mgpwd = timestamp
      }
    },
    select: function () {
      this.$axios.post('manager/query')
        .then(res => {
          this.list = res
          this.totalCount = res.length
          this.handleCurrentChange(1)
        })
    },
    show: function (row) {
      if (row == null) {
        // 添加
        this.title = '添加账号'
        this.dialogFormVisible = true
        this.manager = {'mgstate': 0,'role_id':1}
      } else {
        // 修改
        this.title = '修改账号'
        this.dialogFormVisible = true
        // 复制
        this.manager = Object.assign({}, row)
        // this.manager.mgstate = this.manager.mgstate === 0
        // this.manager.posts = this.teacher.posts === 1 ? '班主任' : '教员'
      }
    },
    saves: function () {
      this.$refs['fm'].validate(valid => {
        if (valid) {
          // this.manager.role_id = 0
          // this.manager.posts = this.manager.posts === '班主任' ? 1 : 2
          this.$axios.post('manager/login', {'mgid': this.manager.mgid})
            .then(res => {
                console.log("21"+res[0])
              if (res[0] === '' || res[0] === null || res[0]===undefined) {
                this.$axios.post('manager/minsert', this.manager)
                  .then(response => {
                      console.log("ss"+response)
                    if (response >=1) {
                        this.select()
                      this.$message.success({
                        message: '添加成功',
                        showClose: true
                      })

                    } else {
                      this.$message.error({
                        message: '添加失败',
                        showClose: true
                      })
                    }
                  })
              } else {
                  this.$message.error({
                              message: '改用户已存在',
                              showClose: true
                            })
                // this.$axios.post('manager/mupdate', this.manager)
                //   .then(response => {
                //     if (response >= 1) {
                //       this.$message.success({
                //         message: '修改成功',
                //         showClose: true
                //       })
                //       this.select()
                //     } else {
                //       this.$message.error({
                //         message: '修改失败',
                //         showClose: true
                //       })
                //     }
                //   })
              }
            })
        }
      })
    },
    deletes: function (row) {
      this.$axios.get('manager/mdelete?mgid=' + row.mgid)
        .then(response => {
          if (response >= 1) {
            this.$message.success({
              message: '删除成功',
              showClose: true
            })
            this.select()
          } else {
            this.$message.error({
              message: '删除失败',
              showClose: true
            })
          }
        })
    },
    changePro: function (val, row) {
        this.manager.mgstate=val
        this.manager.mgid=row.mgid
      this.$axios.post('manager/updateFlag', this.manager).then(response => {
          // alert(val)
          // alert(row.mgid)
        if (val === 0) {
          this.$message({
            type: 'success',
            message: '启用成功!'
          })
          this.select()
        } else {
          this.$message({
            type: 'info',
            message: '已禁用!'
          })
          this.select()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
