<template>
  <div>
    <!-- model:form表单绑定的数据对象 -->
    <!-- rules:form表单校验规则 -->
    <!-- ref:定义表单的名字 -->
    <el-form label-width="100px" label-suffix="：" :model="user" class="form" :rules="rules" ref="fm">
      <h3>登录</h3>
      <el-form-item label="用户名" prop="uname">
        <!-- 必须去声明绑定的数据模型 -->
        <el-input v-model="user.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="upwd">
        <el-input show-password v-model="user.upwd"></el-input>
      </el-form-item>
      <el-button type="success" @click="login()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {},
      rules: {
        uname: [
          // require:进行校验,默认校验非空  message:提示信息  trigger:触发校验的事件
          {required: true, message: '用户名不能为空', trigger: 'blur'},
          {min: 2, max: 10, message: '用户名是3-10位', trigger: ['change', 'blur']},
          // 自定义校验规则
          {trigger: ['change', 'blur'],
            validator: function (rule, value, callback) {
              if (value.indexOf('_') === -1) {
                callback()
              } else {
                callback(new Error('用户名不能包含_特殊字符'))
              }
            }
          }
        ],
        upwd: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    'login': function () {
      this.$refs['fm'].validate(valid => {
        // 判断表单校验是否通过  valid：true / false
        if (valid) {
          // this.$axios.post('http://localhost:8090/demo1/login', this.user)
          this.$axios.post('http://localhost:8085/test/login', this.user)
            .then(response => {
              if (response.data !== '') {
                // 登录成功
                // 携带参数信息时，只能使用name
                this.$router.push({name: 'Home', params: {loginUser: response.data}})
              } else {
                // 登录失败

              }
            })
        }
      })
    }
  }
}
</script>

<style scoped>
  .form {
    border: 1px solid gray;
    margin: 100px auto;
    width: 30%;
    border-radius: 25px;
    box-shadow: 0 0 25px lightskyblue;
    padding: 30px 50px;
    text-align: center;
  }
</style>
