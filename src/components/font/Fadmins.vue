<template>
    <div>
        <el-container>
            <el-header>
                <el-dropdown style="float: right" @command="handlerCommand">
                    <span class="a">欢迎this.account</span>
                    <i class="el-icon-arrow-down"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="Personal">个人信息</el-dropdown-item>
                        <el-dropdown-item command="Logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside>
                    <!--
                        default-active=index：默认激活
                        router:当行菜单是否启用路由，启用之后，item作为route-link来使用
                    -->
                    <el-menu default-active="1" class="el-menu-vertical-demo" :router="true">
                        <el-menu-item index="1" :route="{name:'Fadmin'}">
                            <i class="el-icon-aim" ></i>
                            <span>个人信息</span>
                        </el-menu-item>

                        <el-menu-item index="1-1" :route="{name:'Fhouseshow'}">
                            <i class="el-icon-aim" ></i>
                            <span>房源显示</span>
                        </el-menu-item>

                        <el-menu-item index="2" :route="{name:'Fuppwd'}">
                            <i class="el-icon-camera"></i>
                            <span>密码修改</span>
                        </el-menu-item>
                        <el-menu-item index="3" :route="{name:'Fservice'}">
                            <i class="el-icon-dessert"></i>
                            <span>您的缴费账单</span>
                        </el-menu-item>
                        <!--</el-submenu>-->
                        <!--<el-menu-item index="1">-->
                            <!--<i class="el-icon-aim" :route="{name:'Fservice'}"></i>-->
                            <!--<span>房源显示</span>-->
                        <!--</el-menu-item>-->

                        <!--<el-menu-item index="1">-->
                            <!--<i class="el-icon-aim" :route="{name:'Fservice'}"></i>-->
                            <!--<span>密码修改</span>-->
                        <!--</el-menu-item>-->

                        <!--<el-menu-item index="1">-->
                            <!--<i class="el-icon-aim" :route="{name:'Fservice'}"></i>-->
                            <!--<span>您的缴费账单</span>-->
                        <!--</el-menu-item>-->

                    </el-menu>
                </el-aside>
                <el-main>
                    <!--二级路由-->
                    <router-view></router-view>
                </el-main>
            </el-container>
            <el-footer height="30px">

            </el-footer>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: 'Fadmins',
        data () {
            return {
                account:JSON.parse(sessionStorage.getItem('account')),
                personal_visible: false,
                addBtnLoading: false,
                passwordForm: {
                    oldPassword: '',
                    password: '',
                    rePassword: ''
                },
                activeName: 'config',
                // 全屏状态
                fullscreen: false
            }
        },
        created: function () {
        },
        methods: {
            'handlerCommand': function (command) {
                this.$router.push({name: command})
                // 路径写全
                // this.$router.push({path:'/home/personal'});
            }
        }
    }
</script>

<style scoped>
    .el-header, .el-footer {
        background-color: lavender;
        line-height: 60px;
    }

    .el-aside {
        height: 600px;
    }

    .el-main {
        background-color: lavenderblush;
    }

    .a{
        color: #409EFF;
        cursor: pointer;
    }
</style>
