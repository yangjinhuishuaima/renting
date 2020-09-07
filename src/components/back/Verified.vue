<template>
    <div>
        <el-table :data="list" width="100%" height="710px" :stripe="true" borde="3">
            <!-- prop显示绑定的数据的属性 -->
            <el-table-column prop="id" label="用户账号编号"></el-table-column>
            <el-table-column prop="aphone" label="用户手机号"></el-table-column>
            <el-table-column prop="apwd" label="用户密码"></el-table-column>
            <el-table-column prop="apost" label="用户账号类型">
                <template slot-scope="scope">
                    <p v-if="scope.row.apost=='0'">租客</p>
                    <p v-else-if="scope.row.apost=='1'">房东</p>
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户账号状态">

                <template slot-scope="scope">
                    <!--这里是方法引用和参数传递（参数包括：当前的状态 $event、当前数据的值对象scope.row、当前的序号scope.$index)-->
                    <el-switch
                        v-model="scope.row.state"
                        off-color="#F04134"
                        off-value=1
                        on-color="#00A854"
                        on-value=0
                        @change="changeSwitch(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column prop="usex" label="用户性别">
                <template slot-scope="scope">
                    <p v-if="scope.row.usex=='0'">男</p>
                    <p v-else-if="scope.row.usex=='1'">女</p>
                </template>
            </el-table-column>
            <el-table-column prop="aname" label="身份证姓名"></el-table-column>
            <el-table-column prop="anumber" label="身份证号"></el-table-column>
            <el-table-column prop="aborth" label="注册时间"></el-table-column>
            <el-table-column prop="adress" label="地址"></el-table-column>
            <el-table-column prop="adescribe" label="用户描述"></el-table-column>
        </el-table>
    </div>
</template>

<script>
/* eslint-disable handle-callback-err,eqeqeq,no-template-curly-in-string */

export default {
  name: 'Verified',
  data () {
    return {
      list: [],
      Account: {},
      addState: false,
      updateState: false,
      assState: 1,
      id: 0
    }
  },
  created: function () {
    this.querys()
  },
  methods: {
    changeSwitch (row) {
      if (row.astate == true) {
        this.assState = 0
      } else {
        this.assState = 1
      }
      this.$axios.post('account/updateState', {
        id: row.id,
        astate: 1
      })
        .then(response => {
          if (response > 0) {
            this.$message.success('修改成功')
          } else {
            this.$message.error('修改失败')
          }
        }).catch(err => {
          this.$message.error('失败')
        })
    },
    querys: function () {
      this.$axios.post('account/selectState', {
        astate: 0
      })
        .then(response => {
          if (response === '') {
            this.$message.error('刷新失败')
          } else {
            this.$message.success('刷新成功')
            this.list = response
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
