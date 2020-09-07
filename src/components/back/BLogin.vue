<template>
  <div>
      <!--houseLogo-->
      <div class="houseLogo">
          <h1>欢迎来到豫天下租房网后台！</h1>
      </div>
    <!-- model:form表单绑定的数据对象 -->
    <!-- rules:form表单校验规则 -->
    <!-- ref:定义表单的名字 -->
    <el-form label-width="100px" label-suffix="：" :model="manager" class="form" :rules="rules" ref="fm">
      <h3>登录</h3>
      <el-form-item label="用户名" prop="mgname">
        <!-- 必须去声明绑定的数据模型 -->
        <el-input clearable v-model="manager.mgname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="mgpwd">
        <el-input show-password v-model="manager.mgpwd"></el-input>
      </el-form-item>
        <el-checkbox v-model="checked" :checked="checked">记住密码</el-checkbox>
      <el-button type="success" @click="login()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BLogin',
  data () {
    return {
      checked: false,
        list:[],
      manager: {
        mgname: '',
        mgpwd: ''
      },
      rules: {
        mgname: [
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
        mgpwd: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    if (localStorage.getItem('manager')) {
      let str = JSON.parse(localStorage.getItem('manager'))
      this.manager.mgname = str.mgname
      this.manager.mgpwd = str.mgpwd
      if (localStorage.getItem('checked')) {
        this.checked = true
      }
    }
  },
  methods: {
    'login': function () {
      this.$refs['fm'].validate(valid => {
        // 判断表单校验是否通过  valid：true / false
        if (valid) {
          this.$axios.post('manager/login', this.manager)
            .then(response => {
                this.list=response[0]
              // 登录成功
              // 携带参数信息时，只能使用name
              if (this.list!=null) {
                  if(this.list.mgstate===0){
                this.$axios.post('menu/menuone?role_id=' + response[0].role_id)
                  .then(response2 => {
                    // console.log('123' + response2[0].mname)

                    this.$message.success({
                      message: '登录成功',
                      showClose: true
                    })
                    if (this.checked) {
                      // 保存cookie
                      localStorage.setItem('manager', JSON.stringify({mgname: response[0].mgname, mgpwd: response[0].mgpwd}))
                      localStorage.setItem('checked', 'true')
                    } else {
                      // 删除cookie
                      localStorage.removeItem('manager')
                      localStorage.removeItem('checked')
                    }
                    //保存session的登录信息
                    sessionStorage.setItem('manager', JSON.stringify(response))
                    sessionStorage.setItem('menu_one', JSON.stringify(response2))
                    // localStorage.setItem('menu_one', JSON.stringify(response2))
                    // localStorage.setItem('manager', JSON.stringify(response))
                    this.$router.push({name: 'BHome'})
                  })
                  }else{
                      // 登录失败
                      this.$message.error({
                          message: '登录失败,账户已禁用',
                          showClose: true
                      })
                  }
              } else {
                // 登录失败
                this.$message.error({
                  message: '登录失败,账户密码错误',
                  showClose: true
                })
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
  .houseLogo{
      width:100%;
      margin-left: -3%;
      height:1px;
  }
  .houseLogo h1{
      line-height: 100px;
      margin-left: 38%;
  }
</style>
