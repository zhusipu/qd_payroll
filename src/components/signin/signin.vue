<template>
    <div ref="content">
      <canvas ref="background" class="background"></canvas>
      <div class="login">
        <el-form ref="loginForm" autoComplete="on" :model="loginData" :rules="loginRules">
          <div class="logo"></div>
          <div style="margin-top: 15px;">
            <el-form-item prop="username">
              <el-input :autofocus="true" placeholder="请输入用户名" v-model="loginData.username"></el-input>
            </el-form-item>
          </div>
          <div style="margin-top: 15px;">
            <el-form-item prop="password">
              <el-input placeholder="请输入密码" prop="password" type="password" v-model="loginData.password"></el-input>
            </el-form-item>
          </div>
          <div style="margin-top: 15px;">
            <el-checkbox prop="remember" v-model="loginData.remember">记住我</el-checkbox>
          </div>
          <div style="margin-top: 15px;">
            <el-button type="primary" class="login-btn" :loading="loging"  @click.native.prevent="_login">登陆</el-button>
          </div>
        </el-form>
      </div>
      <div class="car"></div>
    </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data () {
    return {
      loginData: {
        username: '',
        password: '',
        remember: false
      },
      loging: false,
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户姓名' },
          { min: 6, max: 32, message: '用户名长度在 6 到 32 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { min: 6, max: 32, message: '密码长度在 6 到 32 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    document.onkeyup = (e) => {
      var code = e.charCode || e.keyCode
      if (code === 13) {
        this._login()
      }
    }
  },
  methods: {
    _login () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loging = true
          this.$store.dispatch('LoginByUsername', this.loginData).then((res) => {
            Message.success(res.data.msg)
            this.loging = false
            this.$router.push({path: '/'})
          }).catch(error => {
            this.loging = false
            Message.error(error.message)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.login{
    position: absolute;
    background: #ffffff;
    width:300px;
    left:50%;
    margin-left:-132px;
    top: 50%;
    margin-top:-137px;
    border:1px solid #ccc;
    padding:30px 30px 30px 30px;
    border-radius: 4px;
    z-index:2;
}
.car{
    position: absolute;
    background: #ffffff;
    width:500px;
    height:421px;
    background: url("../../assets/images/car.png");
    left:50%;
    margin-left:-532px;
    top: 50%;
    margin-top:-187px;
    z-index:1;
}
.login-btn{
  width:100%;
}
.background {
  position: absolute;
  display: block;
  background: url('../../assets/images/login-bg.jpg') bottom no-repeat transparent;
  background-size: cover;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
}
.logo{
    background: url("../../assets/images/logo.png");
    height: 37px;
    width: 271px;
    margin-left:35px;
}
</style>
