<template>
  <div>
    <el-container>
      <el-header>
        <el-dropdown style="float: right" @command="handlerCommand">
          <span class="a">欢迎</span>
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
              <el-menu-item index="2-2" :route="{name:'Teacher'}">
                <i class="el-icon-dessert"></i>
                <span>教师管理</span>
              </el-menu-item>
            </el-submenu>

            <!--<el-submenu index="3">-->
              <!--<template slot="title">-->
                <!--<i class="el-icon-aim"></i>-->
                <!--<span>报表管理</span>-->
              <!--</template>-->
              <!--<el-menu-item index="3-1">-->
                <!--<i class="el-icon-camera"></i>-->
                <!--<span>日报表</span>-->
              <!--</el-menu-item>-->
              <!--<el-menu-item index="3-2">-->
                <!--<i class="el-icon-dessert"></i>-->
                <!--<span>月报表</span>-->
              <!--</el-menu-item>-->
            <!--</el-submenu>-->
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
  name: 'Home',
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
