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
        <el-button type="primary" @click="zc()">注册</el-button>
      </el-form>
      <el-dialog width="100%" title="注册账号" :visible.sync="this.zcState">
        <el-form label-width="100px" label-suffix=":" :model="u" class="form" :rules="rules2" ref="fm2">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="u.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input v-model="u.pwd"></el-input>
          </el-form-item>
          <div>
            <el-button type="primary" @click="add()">提 交</el-button>
            <el-button type="success" @click="zcState=false">取 消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </center>
  </div>
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
      },
      rules2: {
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
    },
    add: function () {
      this.$refs['fm2'].validate(valid => {
        if (valid) {
          this.$axios.post('http://localhost:8088/springboot/users/add', this.u)
            .then(response => {
              if (response.data > 0) {
                this.zcState = false
                this.$message('注册成功')
              } else {
                this.$message('注册失败')
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
