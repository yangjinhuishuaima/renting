<template>
    <div>
        <el-button type="primary" @click="addShow()" round>添加信息</el-button>

        <el-table :data="list" width="100%" height="710px" :stripe="true" borde="3">
            <!-- prop显示绑定的数据的属性 -->
            <el-table-column prop="id" label="问题编号"></el-table-column>
            <el-table-column prop="trname" label="问题名称"></el-table-column>
            <el-table-column prop="trsolve" label="解决详情"></el-table-column>
            <el-table-column label="操作"  fixed="right" width="120px">
                <template slot-scope="page">
                    <el-button type="primary" @click="updateShow(page.row)" icon="el-icon-edit" circle></el-button>
                    <el-button type="danger" @click="deletebyId(page.row)" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog width="40%" title="添加信息" :visible.sync="addState">
            <el-form label-width="100px" label-suffix=":" :model="addhouse_trouble" class="form" :rules="rules" ref="fm">
                <el-form-item label="问题名称" prop="trname">
                    <el-input v-model="addhouse_trouble.trname"></el-input>
                </el-form-item>
                <el-form-item label="解决详情" prop="trsolve">
                    <el-input v-model="addhouse_trouble.trsolve"></el-input>
                </el-form-item>
                <div>
                    <el-button type="primary" @click="insert()">添 加</el-button>
                    <el-button type="success" @click="addState=false">取 消</el-button>
                </div>
            </el-form>
        </el-dialog>

        <el-dialog width="40%" title="修改信息" :visible.sync="updateState">
            <el-form label-width="100px" label-suffix=":" :model="house_trouble" class="form" :rules="rules" ref="fm">
                <el-form-item label="问题编号" prop="id">
                    <el-input v-model="house_trouble.id" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="问题名称" prop="trname">
                    <el-input v-model="house_trouble.trname"></el-input>
                </el-form-item>
                <el-form-item label="解决详情" prop="trsolve">
                    <el-input v-model="house_trouble.trsolve"></el-input>
                </el-form-item>
                <div>
                    <el-button type="primary" @click="updatebyId()">修 改</el-button>
                    <el-button type="success" @click="updateState=false">取 消</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
/* eslint-disable handle-callback-err */

export default {
  name: 'BHouse_trouble',
  data () {
    return {
      list: [],
      house_trouble: {},
      addhouse_trouble: {},
      addState: false,
      updateState: false,
      rules: {
        trname: [
          // require:进行校验,默认校验非空  message:提示信息  trigger:触发校验的事件
          {required: true, message: '问题名称不能为空', trigger: 'blur'}
        ],
        trsolve: [
          // require:进行校验,默认校验非空  message:提示信息  trigger:触发校验的事件
          {required: true, message: '解决详情不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  created: function () {
    this.querys()
  },
  methods: {
    deletebyId: function (row) {
      console.log(row)
      this.$axios.post('house_trouble/deleteByPrimaryKey', {
        id: row.id
      })
        .then(response => {
          if (response > 0) {
            this.$message.success('删除成功')
            this.querys()
          } else {
            this.$message.error('删除失败')
          }
        }).catch(err => {
          this.$message.error('失败')
        })
    },
    addShow: function () {
      this.addState = true
    },
    insert () {
      this.$refs['fm'].validate(valid => {
        if (valid) {
          this.$axios.post('house_trouble/insert', this.addhouse_trouble)
            .then(response => {
              if (response > 0) {
                this.$message.success('添加成功')
                this.addState = false
                this.querys()
              } else {
                this.$message.error('添加失败')
              }
            }).catch(err => {
              this.$message.error('失败')
            })
        }
      })
    },
    updateShow: function (row) {
      this.updateState = true
      this.house_trouble = row
    },
    updatebyId () {
      this.$refs['fm'].validate(valid => {
        if (valid) {
          this.$axios.post('house_trouble/updateByPrimaryKey', this.house_trouble)
            .then(response => {
              if (response > 0) {
                this.$message.success('修改成功')
                this.updateState = false
                this.querys()
              } else {
                this.$message.error('修改失败')
              }
            }).catch(err => {
              this.$message.error('失败')
            })
        }
      })
    },
    querys: function () {
      this.$axios.post('house_trouble/selectAll')
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
