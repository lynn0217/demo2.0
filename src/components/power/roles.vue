<template>
  <div>
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 添加角色按钮 -->
      <el-button type="primary" @click="addRolesDialog = true">添加角色</el-button>
      <!-- 表格区域 -->
      <el-table :data="rolesList" stripe style="width: 100%" border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editRoles(scope.row.id)"
              size="mini"
            >编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addRolesDialog" width="30%">
      <el-form :model="addRolesForm" ref="addFormRef" label-width="70px">
        <el-form-item label="角色名称">
          <el-input v-model="addRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRolesDialog = false">取 消</el-button>
        <el-button type="primary" @click="addRolesUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="editRolesDialog" width="30%">
      <el-form :model="editRolesForm" ref="addFormRef" label-width="70px">
        <el-form-item label="角色名称">
          <el-input v-model="editRolesForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editRolesForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editRolesDialog = false">取 消</el-button>
        <el-button type="primary" @click="editRolesInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addRolesForm: {
        roleName: '',
        roleDesc: ''
      },
      editRolesForm: {},
      rolesList: [],
      addRolesDialog: false,
      editRolesDialog: false
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 获取角色列表
    async getRolesList() {
      const { data: res } = await this.$http.get('roles')
      // console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.rolesList = res.data
    },
    // 添加用户
    async addRolesUser() {
      const { data: res } = await this.$http.post('roles', this.addRolesForm)
      if (res.meta.status !== 201) {
        return this.$message.error('添加角色失败')
      }
      this.$message.success('添加用户成功')
      // 添加成功后隐藏对话框
      this.addRolesDialog = false
      // 添加成功后，重新获取列表
      this.getRolesList()
      // console.log(res)
    },
    // 编辑用户数据
    async editRoles(id) {
      const { data: res } = await this.$http.get('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询角色数据列表失败')
      }
      this.editRolesForm = res.data
      this.editRolesDialog = true
    },
    // 修改用角色信息
    async editRolesInfo() {
      const { data: res } = await this.$http.put(
        'roles/' + this.editRolesForm.roleId,
        {
          roleName: this.editRolesForm.roleName,
          roleDesc: this.editRolesForm.roleDesc
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('提交失败,请重试')
      }
      // 关闭对话框
      this.editRolesDialog = false
      // 刷新数据列表
      this.getRolesList()
    }
  }
}
</script>

<style lang='less' scoped>
</style>
