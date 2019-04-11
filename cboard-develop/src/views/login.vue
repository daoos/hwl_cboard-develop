<template>
  <div id="login">
    <div class="login_wapper">
      <div class="img_wapper">
        <img src="http://dp.xesv5.com/css/img1.jpg" alt="">
        <img src="http://dp.xesv5.com/css/img2.jpg" alt="">
        <img src="http://dp.xesv5.com/css/img3.jpg" alt="">
        <img src="http://dp.xesv5.com/css/img4.jpg" alt="">
      </div>
      <div class="login_form">
        <p class="login_title">系统登录</p>
        <el-input v-model="name" placeholder="请输入用户名"
          prefix-icon="el-icon-view"></el-input>
        <el-input v-model="password" placeholder="请输入密码"
          type="password" prefix-icon="el-icon-view"></el-input>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
      <p class="login_note">
        请使用Chrome、IE11（非兼容模式）或Firefox浏览器浏览本网站
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$router.push({path: '/dashboard'})
    }
  }
}
</script>

<style scoped>
#login{
  background-color: #0c79b1;
  height: 100vh;
}
.login_wapper{
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform:translate(-50%,-50%);
}
.img_wapper{
  width: 20rem;
  clear: both;
}
.img_wapper img{
  float: left;
}
.login_form{
  width: 20rem;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  justify-content: center;
  align-items: center;
}
.login_title{
  color: #0c79b1;
  font-size: 26px;
  text-align: center;
  font-weight: bold;
}
.el-input, .el-button{
  width: 80%;
  margin-top: 1rem;
}
.login_note{
  position: absolute;
  bottom: -1rem;
  color: #fff;
}
</style>
