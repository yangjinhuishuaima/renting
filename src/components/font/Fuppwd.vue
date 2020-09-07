<template>
    <el-form ref="passwordForm" :model="passwordForm" size="small" label-width="100px"
             style="width: 50%" class="form">
        <el-form-item label="原密码" prop="oldPassword" :rules="[
          {required: true, message: '原密码不能为空', trigger: 'blur'},
          {min: 3, max: 20, message: '长度6-20位', trigger: 'blur'}
          ]">
            <el-input show-password type="password" clearable v-model="passwordForm.oldPassword" size="small"
                      placeholder="请输入原密码"/>
        </el-form-item>
        <el-form-item label="新密码" prop="password" :rules="[
          {required: true, message: '新密码不能为空', trigger: 'blur'},
          {min: 3, max: 20, message: '长度6-20位', trigger: 'blur'}
          ]">
            <el-input show-password type="password" clearable v-model="passwordForm.password" size="small"
                      placeholder="请输入新密码"/>
        </el-form-item>
        <el-form-item label="确认新密码" prop="rePassword" :rules="[
          {required: true, message: '确认新密码不能为空', trigger: 'blur'},
          {min: 3, max: 20, message: '长度6-20位', trigger: 'blur'}
          ]">
            <el-input show-password type="password" clearable v-model="passwordForm.rePassword" size="small"
                      placeholder="请输入确认新密码"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small"
                       @click="updateAdminsPwd()">立即提交
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "Fuppwd",
        data () {
            return {
                passwordForm: {
                    oldPassword: '',
                    password: '',
                    rePassword: ''
                },
                admins: {}
            }
        },
    created: function () {
        this.admins=JSON.parse(sessionStorage.getItem('account'))
    },
        method:{
            updateAdminsPwd: function () {
                if (this.passwordForm.password !== this.passwordForm.rePassword) {
                    this.$message({
                        showClose: true,
                        message: '两次密码不一致哦！',
                        type: 'error'
                    })
                } else if (this.passwordForm.oldPassword !== this.admins[0].apwd) {
                    this.$message({
                        showClose: true,
                        message: '原密码不正确哦！',
                        type: 'error'
                    })
                } else {
                    // this.adminsupdatestate = true
                    this.admins.apwd = this.passwordForm.password
                    this.admins.aid=this.admins[0].aid;
                    this.$axios.post('manager/mupdate', this.$qs.stringify(this.admins))
                        .then(response => {
                            if (response >= 1) {
                                this.$message({
                                    showClose: true,
                                    message: '恭喜你，修改成功,请重新登录',
                                    type: 'success'
                                })
                                this.$router.push({name: 'Login'})
                            }
                        })
                }
            }
        }
    }
</script>

<style scoped>

</style>
