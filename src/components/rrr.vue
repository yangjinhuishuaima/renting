<template>
    <div>
        <el-button @click="login()">后台</el-button>
        <el-button @click="home()">前台</el-button>
    </div>
</template>

<script>
export default {
  name: 'rrr',
  methods: {
    'home': function () {
      this.$router.push({name: 'FLogin'})
    },
    'login': function () {
      this.$router.push({name: 'back'})
    }
  }
}
</script>

<style scoped>

</style>
