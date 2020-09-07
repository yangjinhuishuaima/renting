<template>
    <div id="bj">
        <el-tabs :tab-position="tabPosition" style="margin: 100px auto;;text-align: center; width:100%;height: 500px;margin-right: -400px;">
            <el-tab-pane label="登录" class="form" style="margin-left: 100px;">
                <el-form label-width="100px" label-suffix=":" :model="account" ref="fm" :rules="rules">
                    <h1>登录</h1>
                    <el-form-item label="用户名" prop="aphone">
                        <el-input v-model="account.aphone" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="apwd">
                        <el-input show-password v-model="account.apwd" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox style="float: left;color: limegreen" v-model="checked" :checked="checked">记住密码</el-checkbox>
                    </el-form-item>
                    <el-button type="primary" plain round @click="Login">Login</el-button>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册" class="form" style="margin-left: 100px;">
                <el-form label-width="100px" :model="zc" label-suffix=":" ref="rfm" :rules="rules2">
                    <h1>注册</h1>
                    <el-form-item label="手机号" prop="registerPhone">
                        <el-input v-model="zc.registerPhone" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="验证码" prop="valiCode">
                        <el-input v-model="zc.valiCode" clearable></el-input>
                    </el-form-item>
                    <span v-show="show" @click="getCode">获取验证码</span>
                    <span v-show="!show" class="count">{{count}} s</span>
                    <!--<el-button type="primary" plain round @click="register">获取验证码</el-button>-->
                    <el-button type="primary" plain round @click="enterRegister">注册</el-button>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
/* eslint-disable no-undef,handle-callback-err */

export default {
  name: 'Login',
  data () {
    let valiUserName = (rule, value, callbacks) => {
      if (value.indexOf('_') === -1) {
        callbacks()
      } else {
        callbacks(new Error('用户名不能包含下划线'))
      }
    }
    return {
      tabPosition: 'left',
      show: true,
      count: '',
      timer: null,
      checked: false,
      registerPhone: '',
      account: {
        aphone: '',
        apwd: ''
      },
      zc: {
        registerPhone: '',
        valiCode: ''
      },
      resultDate: {},
      rules: {
        aphone: [
          {required: true, message: '用户名不能为空！', trigger: ['blur', 'onblur']},
          {min: 3, message: '用户名长度不符合规定！', trigger: ['blur', 'onblur']},
          {validator: valiUserName, trigger: ['blur', 'onblur']}
        ],
        apwd: [
          {required: true, message: '密码不能为空', trigger: ['blur', 'onblur']}
        ]
      },
      rules2: {
        registerPhone: [
          {required: true, message: '手机号不能为空！', trigger: 'blur'},
          // 方法一：
          {
            validator: (rule, value, cb) => {
              if (/^1[3-9]\d{9}$/.test(value)) {
                cb()
              } else {
                cb(new Error('手机号格式错误'))
              }
            }
          }
        ],
        valiCode: [
          {required: true, message: '验证码不能为空', trigger: ['blur', 'onblur']}
        ]
      }
    }
  },
  mounted () {
    if (localStorage.getItem('account')) {
      let str = JSON.parse(localStorage.getItem('account'))
      this.account.aphone = str.aphone
      this.account.apwd = str.apwd
      if (localStorage.getItem('checked')) {
        this.checked = true
      }
    }
  },
  methods: {
    getCode: function () {
      this.register()
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    'Login': function () {
      this.$refs['fm'].validate(valid => {
      // 判断表单校验是否通过  valid：true / false
        if (valid) {
          this.$axios.post('account/queryNamePwd', this.account)
            .then(response => {
              this.list = response[0]
              if (this.list == null) {
                // 登录失败
                this.$message.error({
                  message: '登录失败,账户已禁用',
                  showClose: true
                })
              } else {
                if (this.list.astate === 0) {
                  if (this.checked) {
                      this.$message.success('登录成功')
                    // 保存cookie
                    localStorage.setItem('account', JSON.stringify({
                      aphone: response[0].aphone,
                      apwd: response[0].apwd
                    }))
                    localStorage.setItem('checked', 'true')
                  } else {
                    // 删除cookie
                    localStorage.removeItem('account')
                    localStorage.removeItem('checked')
                  }
                  // 保存session的登录信息
                  sessionStorage.setItem('account', JSON.stringify(response))
                  sessionStorage.setItem('aid',JSON.stringify(response.aid))
                  // this.$router.push({name: 'Home'})
                  window.location.href = '../../static/font/index.htm'
                }
              }
            })
        }
      })
    },
    'register': function () {
      this.$axios.post('account/phone', {aphone: this.zc.registerPhone})
        .then(response => {
          console.log('123' + response)
          if (response !== '') {
            // console.log('1234' + response.data)
            this.resultDate = response
            if (this.resultDate.code === 'OK') {
              this.$message('验证码发送成功！请进行验证！')
            } else this.$message(this.resultDate.message)
          }
        }).catch(err => this.$message(err))
    },
    'enterRegister': function () {
      this.$refs['rfm'].validate(valid => {
        // 判断表单校验是否通过  valid：true / false
        if (valid) {
          // this.zc.valiCode = '1234'
          // this.resultDate.codeResult = 1234
          console.log(this.zc.valiCode)
          console.log(this.resultDate.codeResult)
          if (parseInt(this.zc.valiCode) === this.resultDate.codeResult) {
            this.$message('验证通过')
            this.$axios.post('account/insert', {aphone: this.zc.registerPhone})
              .then(response => {
                if (response > 0) {
                  this.$message.success('注册成功，请去登录吧')
                  this.list = response
                } else {
                  this.$message.error('注册失败')
                }
              })
              .catch(err => {
                this.$message.error('失败')
              })
          } else this.$message('验证码错误')
        }
      })
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
    #bj{
        width: 99vw;
        padding-top: 10px;
        height: 120vh;
        background-repeat: no-repeat;
        background-position: left top;
        background-color: #242645;
        color: #fff;
        font-family: "Source Sans Pro";
        background-size: 100%;
        background-image: url("../../../static/images/s.jpg");
        position: relative;
        text-align: center;
    }
</style>
