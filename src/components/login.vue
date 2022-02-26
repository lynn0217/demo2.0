<template>
  <div id="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/1.jpg" alt />
      </div>
      <div class="form_box">
        <el-form :model="loginForm" label-width="0" :rules="rules">
          <!-- 账户名 -->
          <label for>用户名</label>
          <el-form-item prop="username">
            <el-input prefix-icon="iconfont icon-bussiness-man" v-model="loginForm.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <label for>密码</label>
          <el-form-item>
            <el-input prefix-icon="iconfont icon-lock" type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary">登录</el-button>
            <el-button type="info">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  el: "login",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
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
