<template>
    <div>
        <el-container style="height: 650px; border: 1px solid #eee">
            <el-header>
                <div class="header">
                    <div id="left">
                        <span>豫天下租房网</span>
                    </div>
                    <div class="header-right">
                        <div class="header-user-con">
                            <!-- 全屏显示 -->
                            <div class="btn-fullscreen" @click="handleFullScreen()">
                                <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                                    <i class="el-icon-rank"></i>
                                </el-tooltip>
                            </div>
                            <!--&lt;!&ndash; 用户名下拉菜单 &ndash;&gt;-->
                            <el-dropdown class="user-name" @command="handlerCommand">
                                <span class="el-dropdown-link">
                                    欢迎{{this.admins[0].mgname}} <i class="el-icon-caret-bottom"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </div>
                </div>
            </el-header>
            <el-container style="background-color: #ffee">
                <el-aside>
                    <el-menu
                        default-active="2"
                        background-color="#ffee"
                        text-color="#545c64"
                        active-text-color="#red">
                        <el-submenu :index="value.mid.toString()" v-for="(value,key,index) in menu_one">
                            <template slot="title">
                                <span>{{value.mname}}</span>
                            </template>
                            <el-menu-item v-if="value.listTwo" v-for="(child,index) in value.listTwo" :index="value.mid+'-'+child.mid.toString()">
                                <template slot="title">
                                    <span style="font-size: small" @click="Mg(child.url)">{{child.mname}}</span>
                                </template>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <!-- 二级路由 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
            <el-footer height="30px">

            </el-footer>
        </el-container>
        <!--&lt;!&ndash;个人中心&ndash;&gt;-->
        <el-dialog :close-on-press-escape="false" :close-on-click-modal="false" ref="dialogForm" top="3vh" center class="home-dialog" :visible.sync="personal_visible">
            <!--title="个人中心">-->
            <el-tabs type="border-card" v-model="activeName">
                <el-tab-pane label="个人配置" name="config">
                    <el-form ref="configForm" :model="admins" size="small" label-width="100px"
                             style="width: 50%" class="form">

                        <el-form-item label="用户名">
                            <el-input :disabled="true" clearable v-model="admins[0].mgname" size="small" placeholder="请输入用户名"/>
                        </el-form-item>
                        <el-form-item label="权限">
                            <el-input :disabled="true" clearable v-model="admins[0].role_name" size="small" placeholder=""/>
                        </el-form-item>

                        <el-form-item>
                            <el-button :loading="addBtnLoading" type="primary" size="small"
                                       @click="updateAdminsPhone()">立即提交
                            </el-button>
                        </el-form-item>
                        <el-form-item label="" prop="mgid">
                            <el-input type="hidden" clearable v-model="admins[0].mgid" size="small" placeholder=""/>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="修改密码" name="password">
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
                            <el-button :loading="addBtnLoading" type="primary" size="small"
                                       @click="updateAdminsPwd">立即提交
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    /* eslint-disable handle-callback-err,no-undef,eqeqeq */
    // import vue from vue
    export default {
        name: 'BHome',
        data () {
            return {
                menu_one:{},
                // admins: this.$route.query.manager[0],
                personal_visible: false,
                addBtnLoading: false,
                passwordForm: {
                    oldPassword: '',
                    password: '',
                    rePassword: ''
                },
                activeName: 'config',
                // 全屏状态
                fullscreen: false,
                admins: {}
            }
        },
        created: function () {
            this.menu_one=JSON.parse(sessionStorage.getItem('menu_one'))
            this.admins=JSON.parse(sessionStorage.getItem('manager'))
        },
        methods: {
            'handlerCommand': function (command) {
                if (command === 'personal') {
                    this.personal_visible = true
                }else if(command === 'logout') {
                    sessionStorage.removeItem("manager");
                    this.$router.replace({name: "back"});
                }
            },
            Mg: function (clickname) {
                console.log(clickname)
                this.$router.push({name: clickname})
                // if (clickname === 'managermg') {
                //     this.$router.push({name: 'Mana'})
                // } else if (clickname === 'rolemg') {
                //     this.$router.push({name: 'Role'})
                // } else if (clickname === 'advertsmg') {
                //     this.$router.push({name: 'BAdphoto'})
                // //     this.$axios.post('menu/menu_query')
                // //         .then(response => {
                // //             console.log(response)
                // //             this.$router.push({name: 'permission', query: {menu_one: response}})
                // //         })
                // } else if (clickname === 'servicemg') {
                //     this.$router.push({name: 'Bservice'})
                //     // this.$axios.post('server/findsah')
                //     //     .then(response => {
                //     //         console.log(response)
                //     //         this.$router.push({name: 'customer', query: {customer: response}})
                //     //     })
                // }
            },
            showPersonaldialog: function () {
                this.personal_visible = true
            },
            updateAdminsPwd: function () {
                this.addBtnLoading = true
                if (this.passwordForm.password !== this.passwordForm.rePassword) {
                    this.$message({
                        showClose: true,
                        message: '两次密码不一致哦！',
                        type: 'error'
                    })
                    this.addBtnLoading = false
                } else if (this.passwordForm.oldPassword !== this.admins[0].mgpwd) {
                    this.$message({
                        showClose: true,
                        message: '原密码不正确哦！',
                        type: 'error'
                    })
                    this.addBtnLoading = false
                } else {
                    this.adminsupdatestate = true
                    this.admins.mgpwd = this.passwordForm.password
                    this.admins.mgid=this.admins[0].mgid;
                    this.$axios.post('manager/mupdate', this.$qs.stringify(this.admins))
                        .then(response => {
                            if (response >= 1) {
                                this.$message({
                                    showClose: true,
                                    message: '恭喜你，修改成功,请重新登录',
                                    type: 'success'
                                })
                                this.$router.push({name: 'back'})
                            }
                        })
                }
            }
        },
        // 全屏事件
        handleFullScreen: function () {
            let element = document.documentElement
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen()
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen()
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen()
                }
            }
            this.fullscreen = !this.fullscreen
        }
    }
</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }
    .el-aside {
        color: #333;
    }
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
    }
    .collapse-btn{
        float: left;
        padding: 0 21px;
        cursor: pointer;
        line-height: 70px;
    }
    .header .logo{
        float: left;
        width:250px;
        line-height: 70px;
    }
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
    .btn-fullscreen{
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 24px;
    }
    .btn-bell .el-icon-bell{
        color: #fff;
    }
    .user-name{
        margin-left: 10px;
    }
    .user-avator{
        margin-left: 20px;
    }
    .user-avator img{
        display: block;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-link{
        color: #fff;
        cursor: pointer;
    }
    #left{
        width:15%;
        height:80px;
        float:left;
        color:lightblue;
        font-weight: bold;
    }
    #main{
        padding-left: -10px;
        width:1000px;
        height:750px;
        background-color: papayawhip;
        margin:10px 30px;
    }
</style>
