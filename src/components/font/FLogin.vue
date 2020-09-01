<template>
    <div>
        <el-form label-width="100px" label-suffix=":" :model="user" class="form" ref="fm" :rules="rules">
            <h3>登录</h3>
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="user.userName" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userPassword">
                <el-input show-password v-model="user.userPassword" clearable></el-input>
            </el-form-item>
            <el-button type="primary" plain round @click="Login">Login</el-button>
        </el-form>

        <el-form label-width="100px" label-suffix=":" class="form" ref="rfm">
            <h3>注册</h3>
            <el-form-item label="手机号" prop="registerPhone">
                <el-input v-model="registerPhone"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="valiCode">
                <el-input v-model="valiCode"></el-input>
            </el-form-item>
            <el-button type="primary" plain round @click="register">获取验证码</el-button>
            <el-button type="primary" plain round @click="enterRegister">注册</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'FLogin',
  data () {
    let valiUserName = (rule, value, callbacks) => {
      if (value.indexOf('_') === -1) {
        callbacks()
      } else {
        callbacks(new Error('用户名不能包含下划线'))
      }
    }
    return {
      registerPhone: '',
      user: {},
      valiCode: '',
      resultDate: {},
      rules: {
        userName: [
          {required: true, message: '用户名不能为空！', trigger: ['blur', 'onblur']},
          {min: 3, message: '用户名长度不符合规定！', trigger: ['blur', 'onblur']},
          {validator: valiUserName, trigger: ['blur', 'onblur']}
        ],
        userPassword: [
          {required: true, message: '密码不能为空', trigger: ['blur', 'onblur']}
        ]
      }
    }
  },
  methods: {
    'Login': function () {
      this.$refs.fm.validate(valid => {
        if (valid) {
          this.$axios.post('users/UserLogin', this.user)
            .then(response => {
              sessionStorage.setItem('LoginUser', JSON.stringify(response.data))
              this.$router.push({name: 'Main'})
            }).catch(err => this.$message(err))
        }
      })
    },
    'register': function () {
      this.$axios.post('users/register', this.registerPhone)
        .then(response => {
          console.log('123' + response)
          if (response !== '') {
            // console.log('1234' + response.data)
            this.resultDate = response
            if (this.resultDate.data.code === 'OK') {
              this.$message('验证码发送成功！请进行验证！')
            } else this.$message(this.resultDate.message)
          }
        }).catch(err => this.$message(err))
    },
    'enterRegister': function () {
      if (this.valiCode === this.resultDate.data.codeResult) {
        this.$message('验证成功')
      } else this.$message('验证码错误')
    }
  }
}
</script>

<style scoped>
    .form {
        border: 3px solid gray;
        margin: 100px auto;
        width: 30%;
        border-radius: 25px;
        box-shadow: 0 0 25px lightskyblue;
        padding: 30px 50px;
        text-align: center;
    }
</style>
