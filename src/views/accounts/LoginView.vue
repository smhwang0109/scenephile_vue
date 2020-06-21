<template>
  <div class="container">
    <h1>로그인</h1>
    <div class="form-group">
      <label for="username">닉네임</label>
      <input class="form-control" v-model="loginData.username" id="username" type="text">
    </div>
    <div class="form-group">
      <label for="password">비밀번호</label>
      <input @keyup.enter="login(loginData)" class="form-control" v-model="loginData.password" id="password" type="password">
    </div>
    <button @click="login(loginData)" class="btn btn-primary mr-3">로그인</button>
    <button @click="toSignup" class="btn btn-primary">회원가입</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'LoginView',
  data() {
    return {
      loginData: {
        username: null,
        password: null
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    toSignup() {
      this.$router.push('signup')
    }
  }
}
</script>

<style>
</style>