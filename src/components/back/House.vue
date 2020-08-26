<template>
    <div>
        <el-table :data="list" width="100%" height="710px" :stripe="true" borde="3">
            <!-- prop显示绑定的数据的属性 -->
            <el-table-column prop="harea" label="区域"></el-table-column>
            <el-table-column prop="hcommunity" label="所属小区"></el-table-column>
            <el-table-column prop="htshi" label="房屋几室"></el-table-column>
            <el-table-column prop="hting" label="房屋几厅"></el-table-column>
            <el-table-column prop="htwei" label="房屋几卫"></el-table-column>
            <el-table-column prop="hmode" label="租赁方式"></el-table-column>
            <el-table-column prop="hprice" label="租金"></el-table-column>
            <el-table-column prop="hspace" label="房屋面积"></el-table-column>
            <el-table-column prop="hpaymethod" label="付款方式"></el-table-column>
            <el-table-column prop="hlabel" label="房屋标签"></el-table-column>
            <el-table-column prop="htime" label="发布时长"></el-table-column>
            <el-table-column prop="hpid" label="房屋图片"></el-table-column>
            <el-table-column prop="hadress" label="地址"></el-table-column>
            <el-table-column prop="udescribe" label="用户描述"></el-table-column>
            <el-table-column prop="htid" label="房屋配套"></el-table-column>
            <el-table-column prop="hstate" label="房间状态"></el-table-column>
            <el-table-column prop="aid" label="房主信息"></el-table-column>
            <el-table-column label="操作" fixed="right" width="100px">
                <template slot-scope="page">
                    <el-button type="text" @click="updateShow(page.row)">修改</el-button>
                    <el-button type="text" @click="deletebyId(page.row)">删除</el-button>
                </template>
            </el-table-column>
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
    </div>
</template>

<script>
/* eslint-disable handle-callback-err */

export default {
  name: 'House',
  data () {
    return {
      list: [],
      House: {},
      addState: false,
      updateState: false,
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
      this.$axios.post('http://localhost:8090/renting/house/selectAll', {
        pageNum: this.currentPage.page,
        pageSize: this.currentPage.pageSize
      })
        .then(response => {
          if (response.data === '') {
            this.$message('查询错误')
          } else {
            this.list = response.data.list
            this.currentPage.pageTotal = response.data.total
          }
        })
        .catch(err => {
          this.$message('失败')
        })
    }
  }
}
</script>

<style scoped>

</style>
