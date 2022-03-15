<template>
  <div>
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <!-- 警告提示区域 -->
      <el-alert title="注意！只允许为第三级分类设置相关参数！" type="warning" :closable="false" show-icon></el-alert>
      <!-- 下拉菜单，选择商品分类区域 -->
      <el-row class="opt-style">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 选择商品分类，级联选择框 -->
          <el-cascader
            expand-trigger="hover"
            :options="catelist"
            :props="cateProps"
            v-model="selectedKeys"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">动态参数</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">静态属性</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 商品分类列表
      catelist: [],
      // 级联选择框数据
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 级联选择框双向绑定
      selectedKeys: [],
      // 被激活的页签名称
      activeName: 'first'
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    // 获取所有商品分类
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品数据失败')
      }
      this.catelist = res.data
      console.log(this.catelist)
    },
    handleChange() {
      // 证明选中的不是三级分类
      if (this.selectedKeys.length !== 3) {
        this.selectedKeys = []
        return false
      }
      // 证明选中的是三级分类
    },
    // tab页签点击事件处理的函数
    handleClick() {}
  }
}
</script>

<style lang='less' scoped>
.opt-style {
  margin: 15px 0;
}
</style>
