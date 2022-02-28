<template>
  <div>
    <!-- 主体区域 -->
    <el-container class="home-container">
      <!-- 头部区域 -->
      <el-header>
        <div class="container1">
          <img src="../assets/logoo.png" alt />
          <span class="font-ys">电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <!-- 侧边栏菜单区域 -->

        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-btn" @click="toggleCollapse">|||</div>
          <el-menu
            background-color="#373d41"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
          >
            <!-- 一级菜单 -->
            <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
              <!-- 一级菜单模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconsObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item
                :index="subItem.id + ''"
                v-for="subItem in item.children"
                :key="subItem.id"
              >
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 显示区域 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        125: 'iconfont icon-user-group-fill',
        103: 'iconfont icon-key',
        101: 'iconfont icon-shopping-cart-fill',
        102: 'iconfont icon-file-fill',
        145: 'iconfont icon-monitoring'
      },
      // 是否折叠
      isCollapse: false
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      // 退出功能：清空token，跳转回 /login
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      // console.log(res)
      this.menulist = res.data
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang='less' scoped>
.home-container {
  height: 100vh;
}
.el-header {
  display: flex;
  background-color: #373d41;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.container1 {
  display: flex;
  align-items: center;
  .font-ys {
    color: white;
    font-weight: 700;
    font-size: 25px;
    margin-left: 15px;
    // padding-bottom: 5px;
  }
  img {
    height: 60px;
    width: 60px;
  }
}
.iconfont {
  margin-right: 10px;
}
.toggle-btn {
  display: block;
  cursor: pointer;
  background-color: #4a5064;
  color: white;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
}
</style>
