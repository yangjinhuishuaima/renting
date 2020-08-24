<template>
    <div>
        <el-container style="height: 650px; border: 1px solid #eee">
            <el-header>
                <div class="header">
                        <i class="el-icon-menu"></i>
                <div class="header-right">
                    <div class="header-user-con">
                        <!-- 全屏显示 -->
                        <div class="btn-fullscreen" @click="handleFullScreen">
                            <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                                <i class="el-icon-rank"></i>
                            </el-tooltip>
                        </div>
                        <!-- 用户头像 -->
                        <div class="user-avator"><img src="../../../static/images/img.jpg"></div>
                        <!-- 用户名下拉菜单 -->
                        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link">
                            张三 <i class="el-icon-caret-bottom"></i>
                        </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="Personal">个人信息</el-dropdown-item>
                                <el-dropdown-item divided  command="changeZh">切换中文</el-dropdown-item>
                                <el-dropdown-item command="changeEn">切换英文</el-dropdown-item>
                                <el-dropdown-item divided  command="Logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
                </div>
            </el-header>
        <el-container>
            <el-aside>
                    <!--
                        default-active=index：默认激活
                        router:当行菜单是否启用路由，启用之后，item作为route-link来使用
                    -->
                    <el-menu default-active="1" class="el-menu-vertical-demo" :router="true">
                        <el-menu-item index="1">
                            <i class="el-icon-apple"></i>
                            <span>基础管理</span>
                        </el-menu-item>

                        <!-- 可展开的导航 -->
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-aim"></i>
                                <span>xx管理</span>
                            </template>
                            <!-- 启用之后，item作为router-link来使用 route:匹配要访问的路由路径-->
                            <el-menu-item index="2-1" :route="{name:'Emp'}">
                                <i class="el-icon-camera"></i>
                                <span>员工管理</span>
                            </el-menu-item>
                            <el-menu-item index="2-2" :route="{name:'Stus'}">
                                <i class="el-icon-dessert"></i>
                                <span>学生管理</span>
                            </el-menu-item>
                            <el-menu-item index="2-2" :route="{name:'Teacher'}">
                                <i class="el-icon-dessert"></i>
                                <span>教师管理</span>
                            </el-menu-item>
                            <el-menu-item index="2-2" :route="{name:'D04'}">
                                <i class="el-icon-dessert"></i>
                                <span>密码管理</span>
                            </el-menu-item>
                        </el-submenu>

                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-aim"></i>
                                <span>报表管理</span>
                            </template>
                            <el-menu-item index="3-1">
                                <i class="el-icon-camera"></i>
                                <span>日报表</span>
                            </el-menu-item>
                            <el-menu-item index="3-2">
                                <i class="el-icon-dessert"></i>
                                <span>月报表</span>
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
    </div>
</template>

<script>
/* eslint-disable handle-callback-err */

export default {
  name: 'Home',
  methods: {
    handlerCommand: function (command) {
      this.$router.push({name: command})
    },
      // 全屏事件
      handleFullScreen:function(){
          let element = document.documentElement;
          if (this.fullscreen) {
              if (document.exitFullscreen) {
                  document.exitFullscreen();
              } else if (document.webkitCancelFullScreen) {
                  document.webkitCancelFullScreen();
              } else if (document.mozCancelFullScreen) {
                  document.mozCancelFullScreen();
              } else if (document.msExitFullscreen) {
                  document.msExitFullscreen();
              }
          } else {
              if (element.requestFullscreen) {
                  element.requestFullscreen();
              } else if (element.webkitRequestFullScreen) {
                  element.webkitRequestFullScreen();
              } else if (element.mozRequestFullScreen) {
                  element.mozRequestFullScreen();
              } else if (element.msRequestFullscreen) {
                  // IE11
                  element.msRequestFullscreen();
              }
          }
          this.fullscreen = !this.fullscreen;
      }
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
</style>
