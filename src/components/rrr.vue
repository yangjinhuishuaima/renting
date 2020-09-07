<template>
    <div>
        <el-button @click="login()">后台</el-button>
        <a href="../../static/font/index.htm">前台</a>
        <el-button @click="home()">房源添加页面</el-button>
        <el-button @click="fam()">个人信息</el-button>
        <a href="../../static/font/HouseInfo.html">3333</a>
    </div>
</template>

<script>
export default {
  name: 'rrr',
  methods: {
    'home': function () {
      this.$router.push({name: 'FHouseadd'})
    },
    'login': function () {
      this.$router.push({name: 'back'})
    },
      'fam': function () {
          this.$router.push({name: 'Fadmin'})
      }
  }
}
</script>

<style scoped>

</style>
