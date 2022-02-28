<template>
  <div id="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/1.jpg" alt />
      </div>
      <div class="form_box">
        <el-form :model="loginForm" label-width="0" :rules="loginFormRules" ref="loginFormRef">
          <!-- 账户名 -->
          <label for>用户名</label>
          <el-form-item prop="username">
            <el-input prefix-icon="iconfont icon-bussiness-man" v-model="loginForm.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <label for>密码</label>
          <el-form-item prop="password">
            <el-input prefix-icon="iconfont icon-lock" type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="loginResetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data() {
    return {
      //  登录表单数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //  表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    loginResetForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        if (res.meta.status !== 200) {
          this.$message({
            message: '登录失败',
            type: 'error'
          })
        } else {
          // console.log(res);
          this.$message.success('登录成功')
        }
        // console.log(res)
        // 将token令牌保存进sessionStroage
        window.sessionStorage.setItem('token', res.data.token)
        // 通过编程式导航将页面跳转到 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>
<style lang='less' scoped>
#login_container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #1e1e1e;
}
.login_box {
  position: absolute;
  width: 500px;
  height: 300px;
  left: 50%;
  margin-left: -250px;
  top: 25%;
  background-color: white;
  padding: 10px;
  border-radius: 2%;
  .avatar_box {
    position: absolute;
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50% 50%;
    padding: 10px;
    background-color: #eee;
    left: 50%;
    transform: translate(-50%);
    top: -25%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50% 50%;
    }
  }
}
label {
  font-size: 16px;
  font-weight: 700;
}
.form_box {
  margin-top: 80px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
