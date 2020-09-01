<template>
  <div>
    <!--<el-button @click="role={};addRolevisible=true" size="mini" icon="el-icon-plus" type="primary" style="float: left;background-color: cadetblue;border-color: cadetblue"-->
    <!--&gt;新增</el-button>-->
    <el-table  ref="multipleTable"  :data="this.role"  tooltip-effect="dark"  style="width: 100%"
      :header-cell-style="rowClass"   :cell-style="cellStyle">
      <!--<el-table-column  type="selection"  width="60"></el-table-column>-->
      <el-table-column prop="role_name"  label="角色名"  show-overflow-tooltip></el-table-column>
      <!--<el-table-column show-overflow-tooltip prop="rol_state" label="状态" align="center" show-overflow-tooltip>
        <template slot-scope="{row}">
          {{ row.status == 1 ? '正常' : '禁用' }}
          <el-switch v-model="row.status" size="small"
                     @change="setStatus(row)"/>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" fixed="right" width="300px">
        <template slot-scope="scope">
          <el-row>
            <el-button style="background-color:lightblue;border-color: black" type="primary" size="mini" icon="el-icon-edit" @click="updateRolevisible=true;showUpdateDialog(scope.row)"></el-button>
            <!--<el-button style="background-color: indianred;border-color: indianred" type="danger" size="mini" class="el-icon-delete" @click="deleteRole(scope.row)"></el-button>-->
            <el-button type="success" size="mini" icon="el-icon-share" @click="authorityVisible=true;setAuthority(scope.row)">权限</el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!--&lt;!&ndash;修改角色&ndash;&gt;-->
    <!--&lt;!&ndash; 编辑表单 &ndash;&gt;-->
    <!--<el-dialog :close-on-press-escape="false" :close-on-click-modal="false" ref="dialogForm" top="3vh" center class="home-dialog" :visible.sync="updateRolevisible"-->
               <!--title="编辑角色">-->
      <!--<el-form ref="configForm" :model="role" size="small" label-width="100px"-->
               <!--style="width: 50%" class="form">-->

        <!--<el-form-item label="角色名" prop="role_name">-->
          <!--<el-input clearable v-model="role.role_name" name="role_name" size="small" placeholder="请输入角色名"/>-->
        <!--</el-form-item>-->

        <!--<el-form-item>-->
          <!--<el-button :loading="addBtnLoading" type="primary" size="small"-->
                     <!--@click="updateRole()">立即提交-->
          <!--</el-button>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="" prop="role_id">-->
          <!--<el-input type="hidden" clearable v-model="role.role_id" name="role_id" size="small" placeholder=""/>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</el-dialog>-->

    <!--&lt;!&ndash;添加角色&ndash;&gt;-->
    <!--<el-dialog :close-on-press-escape="false" :close-on-click-modal="false" ref="dialogForm" top="3vh" center class="home-dialog" :visible.sync="addRolevisible"-->
               <!--title="添加角色">-->
      <!--<el-form ref="configForm" :model="role" size="small" label-width="100px"-->
               <!--style="width: 50%" class="form">-->

        <!--<el-form-item label="角色名" prop="role_name">-->
          <!--<el-input clearable v-model="role.role_name" name="role_name" size="small" placeholder="请输入角色名"/>-->
        <!--</el-form-item>-->

        <!--<el-form-item>-->
          <!--<el-button :loading="addBtnLoading" type="primary" size="small"-->
                     <!--@click="addRole()">立即提交-->
          <!--</el-button>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
    <!--</el-dialog>-->
    <!--权限分配-->
    <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" ref="dialogForm" top="3vh" center class="home-dialog" :visible.sync="authorityVisible"
               title="编辑角色">
      <el-form ref="configForm" :model="role" size="small" label-width="100px"
               style="width: 50%" class="form">
        <el-tree
          :data="authorityList"
          show-checkbox
          default-expand-all
          node-key="mid"
          ref="tree"
          highlight-current
          :props="defaultProps">
        </el-tree>
        <el-form-item>
          <el-button :loading="addBtnLoading" type="primary" size="small"
                     @click="getCheckedKeys()">立即提交
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Role',
  data () {
    return {
      // updateRolevisible: false,
      // addRolevisible: false,
      role: [],
      authorityVisible: false,
      authorityList: {},
      addBtnLoading: false,
      defaultProps: {
        children: 'listTwo',
        label: 'mname'
      },
      role_id: 0,
      menu_one: '',
      // admins: '',
      // role: ''
    }
  },
  created: function () {
      this.query()
    this.menu_one = JSON.parse(sessionStorage.getItem('menu_one'))
    this.admins = JSON.parse(sessionStorage.getItem('manager'))
  },
  methods: {
    // 设置表头的颜色
    rowClass () {
      return 'background:lightblue;color:papayawhip'
    },
    // 设置指定行、列、具体单元格颜色
    cellStyle () {
      return 'background:lightblue;color:papayawhip'
    },
      query:function(){
          this.$axios.post('RoleCon/roleall')
              .then(res => {
                  this.role = res
              })
     },
    // 获取选中的mid值
    getCheckedKeys () {
      let str = ''
      for (let p = 0; p < this.$refs.tree.getCheckedKeys().length; p++) {
        console.log(this.$refs.tree.getCheckedKeys()[p])
        if (p < this.$refs.tree.getCheckedKeys().length - 1) {
          str += this.$refs.tree.getCheckedKeys()[p] + ','
        } else {
          str += this.$refs.tree.getCheckedKeys()[p]
        }
      }
      this.$axios.get('RoleCon/setAuthority', {
        params: {role_id: this.role_id, mid: str}
      })
        .then(response => {
          if (response >= 1) {
            this.$message({
              showClose: true,
              message: '恭喜你，修改成功',
              type: 'success'
            })
            this.authorityVisible = false
            // this.$router.push({name: 'Home'})
          } else {
            this.$message({
              showClose: true,
              message: '修改失败！',
              type: 'error'
            })
          }
        })
    },
    // 设置状态
    /* setStatus(data) {
        console.log(data);
      } */
    showUpdateDialog: function (row) {
      console.log(row)
      this.role = row
    },
    setAuthority: function (row) {
      this.role_id = row.role_id
      this.$axios.post('menu/menu_query')
        .then(response => {
          if (response.length > 0) {
            this.authorityList = response
            for (let p = 0; p < response.length; p++) {
              console.log(response[p].mid)
              this.$refs.tree.setChecked(response[p].mid, true, false)
            }
            this.$axios.post('RoleCon/queryRole_id?role_id=' + this.role_id)
              .then(response2 => {
                for (let p = 0; p < response2.length; p++) {
                  console.log(response2[p].mid)
                  this.$refs.tree.setChecked(response2[p].mid, true, false)
                }
              })
          }
        })
    },
    // updateRole: function () {
    //   this.$axios.post('RoleCon/role_update', this.$qs.stringify(this.role))
    //     .then(response => {
    //       if (response >= 1) {
    //         this.$message({
    //           showClose: true,
    //           message: '恭喜你，修改成功',
    //           type: 'success'
    //         })
    //         this.updateRolevisible = false
    //       } else {
    //         this.$message({
    //           showClose: true,
    //           message: '修改失败！',
    //           type: 'error'
    //         })
    //       }
    //     })
    // },
    // deleteRole: function (row) {
    //   this.$axios.post('RoleCon/role_delete?role_id=' + row.role_id)
    //     .then(response => {
    //       if (response >= 1) {
    //         this.$message({
    //           showClose: true,
    //           message: '恭喜你，删除成功',
    //           type: 'success'
    //         })
    //         this.updateRolevisible = false
    //       } else {
    //         this.$message({
    //           showClose: true,
    //           message: '删除失败！',
    //           type: 'error'
    //         })
    //       }
    //     })
    // },
    // addRole: function () {
    //   this.$axios.post('RoleCon/role_insert', this.$qs.stringify(this.role))
    //     .then(response => {
    //       if (response >= 1) {
    //         this.$message({
    //           showClose: true,
    //           message: '恭喜你，添加成功',
    //           type: 'success'
    //         })
    //         this.addRolevisible = false
    //       } else {
    //         this.$message({
    //           showClose: true,
    //           message: '添加失败！',
    //           type: 'error'
    //         })
    //       }
    //     })
    // }
  }
}
</script>

<style scoped>
</style>
