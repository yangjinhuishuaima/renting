<template>
    <div id="app">
        <!--<el-button @click="home()">前台</el-button>-->
        <!--<el-button type="success" @click="login()">后台</el-button>-->
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    'home': function () {
      this.$router.push({name: 'Home'})
    },
    'login': function () {
      this.$router.push({name: 'back'})
    }
  }
}
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
