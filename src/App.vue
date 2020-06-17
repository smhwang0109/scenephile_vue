<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand col-2" :to="{ name: 'ArticleList' }" style="color:white;"><img :src="`./assets/fanplace_logo2.png`" alt="logo"></router-link>
        <div class="d-none d-lg-inline form-inline offset-1 col-5 col-xl-4">
          <input v-model="keyword" @keyup.enter="getKeyword()" class="form-control mr-sm-2" placeholder="Search">
          <button @click="getKeyword()" class="btn btn-outline-primary my-2 my-sm-0">Search</button>
        </div>
        <ul class="navbar-nav mt-2 offset-xl-1 col-6 col-lg-3 d-flex felx-row justify-content-around">
          <li v-if="!isLoggedIn">
            <router-link :to="{ name: 'Login' }" style="color:white;">Login</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link :to="{ name: 'Signup' }" style="color:white;">Signup</router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link :to="{ name: 'Logout' }" style="color:white;">Logout</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'ArticleList' }" style="color:white; font-size:20px;"><i class="fas fa-home"></i></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'ArticlePopular' }" style="color:white; font-size:20px;"><i class="fab fa-hotjar"></i></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'ActorSelect' }" style="color:white; font-size:20px;"><i class="fas fa-plus-circle"></i></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'MovieList' }" style="color:white; font-size:20px;"><i class="fas fa-film"></i></router-link>
          </li>
          <li v-if="myAccount">
            <router-link :to="`/accounts/${myAccount.id}/`" style="color:white; font-size:20px;"><i class="fas fa-user"></i></router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view class="container mt-3" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      keyword : null,
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    ...mapState(['myAccount'])
  },
  methods: {
    ...mapActions(['getMyAccount']),
    setNull() {
      this.keyword = null
    },
    getKeyword() {
      this.$router.push({ name: 'SearchResult', params: { keyword: this.keyword }})
        .then(this.setNull())
    },
  },
  created() {
    this.getMyAccount()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}

.navbar-nav{
  display: flex;
  flex-direction: row;
  list-style: none;
}

.customcard {
  position: relative;
  display: flex;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  border-radius: .25rem;
  padding: 0.5rem;
}
</style>
