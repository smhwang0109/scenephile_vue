<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand col-2" :to="{ name: 'ArticleList' }" style="color:white;">Scenephile</router-link>
        <form class="d-none d-lg-inline form-inline offset-1 col-5 col-xl-4">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form>
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
            <router-link :to="{ name: 'MovieList' }" style="color:white; font-size:20px;"><i class="fas fa-film"></i></router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Profile' }" style="color:white; font-size:20px;"><i class="fas fa-user"></i></router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view class="container mt-3" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoggedIn'])
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
</style>
