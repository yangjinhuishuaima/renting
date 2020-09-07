<template>
    <div>
        <el-button @click="login()">后台</el-button>
        <a href="../../static/font/index.htm">前台</a>
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
    }
  }
}
</script>

<style scoped>

</style>
