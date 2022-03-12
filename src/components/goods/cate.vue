<template>
  <div>
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="showDialogVisible">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 列表区域 -->
      <tree-table
        class="el-table"
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        :border="true"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color:lightgreen"
          ></i>
          <i class="el-icon-error" style="color:red" v-else></i>
        </template>
        <!-- 排序等级序列 -->
        <template slot="istag" slot-scope="scope">
          <el-tag type="success" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="danger" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagesize"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加分类的对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible">
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name " clearable></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <!-- 级联选择器区域 -->
          <!-- options用来指定数据对象 -->
          <!-- props用来指定配置对象 -->
          <el-cascader
            expand-trigger="hover"
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="handleChange"
            clearable
            change-on-select
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 查询条件
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      // 商品分类的数据列表，默认为空
      catelist: [],
      total: 0,
      // 为table指定列数据
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          prop: 'cat_deleted',
          // 当前列 定义为模板列
          type: 'template',
          // 当前列使用的模板名称
          template: 'isok'
        },
        {
          label: '排序',
          prop: 'cat_level',
          // 当前列 定义为模板列
          type: 'template',
          // 当前列使用的模板名称
          template: 'istag'
        },
        {
          label: '排序',
          // 当前列 定义为模板列
          type: 'template',
          // 当前列使用的模板名称
          template: 'opt'
        }
      ],
      // 添加分类对话框的隐藏
      addCateDialogVisible: false,
      // 添加分类的表单数据对象
      addCateForm: {
        // 将要添加的分类名称
        cat_name: '',
        // .......id
        cat_pid: 0,
        // .......等级
        cat_level: 0
      },
      // 添加分类表单的验证规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      // 用于存放获取过来的父级数据
      parentCateList: [],
      cascaderProps: {
        label: 'cat_name',
        children: 'children',
        value: 'cat_id'
      },
      // 存放级联选择器中已经选中的数据(数组)
      selectedKeys: []
    }
  },
  created() {
    // 加载成功后调用一次，渲染列表
    this.getCateList()
  },
  methods: {
    // 获取商品列表分类
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryInfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('请求商品列表失败')
      }
      // console.log(res.data)
      // 数据列表赋值给catelist
      this.catelist = res.data.result
      // 总数居条数赋值
      this.total = res.data.total
    },
    // 监听页码改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听当前页数
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    // 点击“添加分类”按钮，弹出对话框
    showDialogVisible() {
      // 先获取父级分类的数据列表，再刷新对话框
      this.getParentList()
      this.addCateDialogVisible = true
    },
    // 获取父级分类的数据列表
    async getParentList() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 }
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取分类数据列表失败')
      }
      console.log(res.data)
      this.parentCateList = res.data
    },
    handleChange() {
      // console.log(this.selectedKeys)
      if (this.selectedKeys.length > 0) {
        // 父级分类的Id
        this.addCateForm.cat_pid = this.selectedKeys[
          this.selectedKeys.length - 1
        ]
        // 为当前分类的等级赋值
        this.addCateForm.cat_level = this.selectedKeys.length
        return false
      } else {
        this.selectedKeys.cat_pid = 0
        this.selectedKeys.cat_level = 0
      }
    },
    addCate() {
      console.log(this.addCateForm)
    }
  }
}
</script>

<style lang='less' scoped>
.el-cascader {
  width: 100%;
}
</style>
