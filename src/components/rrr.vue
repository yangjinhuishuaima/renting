<template>
    <div>
        <el-button @click="login()">后台</el-button>
        <el-button @click="home()">前台</el-button>
        <a href="../../static/font/index.htm">前台</a>
        <a href="../../static/font/test.html">TEst</a>
    </div>
</template>

<script>
export default {
  name: 'rrr',
  methods: {
    'home': function () {
      /*this.$router.push({name: 'Home'})*/
        /*window.location.href="https://www.baidu.com/"*/
        /*window.location.href="../font"*/


    },
    'login': function () {
      this.$router.push({name: '/back/Login'})
    }
  }
}
</script>

<style scoped>

</style>
