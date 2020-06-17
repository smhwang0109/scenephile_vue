<template>
  <div class="container">
    <h1>회원가입</h1>
    <div class="form-group">
      <label for="username">닉네임</label>
      <input class="form-control" v-model="signupData.username" id="username" type="text">
    </div>
    <div class="form-group">
      <label for="password1">비밀번호</label>
      <input class="form-control" v-model="signupData.password1" id="password1" type="password">
    </div>
    <div class="form-group">
      <label for="password2">비밀번호 확인</label>
      <input class="form-control" v-model="signupData.password2" id="password2" type="password">
    </div>
    <div @click="signup(signupData)" class="btn btn-primary">회원가입</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SignupView',
  data() {
    return {
      signupData: {
        username: null,
        password1: null,
        password2: null
      }
    }
  },
  methods: {
    ...mapActions(['signup'])
  }
}
</script>

<style>
</style>