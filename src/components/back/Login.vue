<template>
    <div class="bj">
        <center>
            <el-form label-width="100px" label-suffix="：" :model="user" class="form" :rules="rules" ref="fm">
                <h3>登录</h3>
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="user.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                    <el-input show-password v-model="user.pwd"></el-input>
                </el-form-item>
                <el-button type="success" @click="login()">登录</el-button>
            </el-form>
        </center>
    </div>
</template>

<script>
/* eslint-disable eqeqeq,handle-callback-err,no-undef,standard/object-curly-even-spacing */

export default {
  name: 'Login',
  data: function () {
    return {
      zcState: false,
      u: {},
      pwds: '',
      user: {name: '张三', pwd: '123'},
      rules: {
        name: [
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 2, max: 10, message: '用户名是3-10位', trigger: ['change', 'blur']},
          // 自定义校验规则
          {trigger: ['change', 'blur'],
            validator: function (rule, value, callback) {
              if (value.indexOf('_') == -1) {
                callback()
              } else {
                callback(new Error('用户名不能包含_特殊字符'))
              }
            }
          }
        ],
        pwd: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    zc: function () {
      this.zcState = true
    },
    login: function () {
      this.$refs['fm'].validate(valid => {
        if (valid) {
          this.$axios.post('http://localhost:8088/springboot/users/querypwd', this.user)
            .then(response => {
              if (response.data === '') {
                this.$message('账号密码错误')
              } else {
                this.$router.push({name: 'Home', params: {loginUser: response.data}})
              }
            })
            .catch(err => {
              this.$message('失败')
            })
        }
      })
    }
  }
}
</script>
<style scoped>
    .form {
        margin-top: 150px;
        border: 1px solid gray;
        border: 1px solid gray;
        margin: 100px auto;
        width: 30%;
        border-radius: 25px;
        box-shadow: 0 0 25px lightskyblue;
        padding: 30px 50px;
    }
    .bj{
        width: 99vw;
        padding-top: 10px;
        height: 98vh;
        background-repeat: no-repeat;
        background-position: left top;
        background-color: #242645;
        color: #fff;
        font-family: "Source Sans Pro";
        background-size: 100%;
        background-image: url("../../../static/images/Starry.jpg");
        position: relative;
        text-align: center;
    }
</style>
