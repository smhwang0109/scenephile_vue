<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <a class="navbar-brand ml-sm-2 mr-lg-2 mr-sm-auto"><router-link :to="{ name: 'ArticleList' }" style="color:white;">Scenephile</router-link></a>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
      </form>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <li class="nav-item" v-if="!isLoggedIn">
            <a class="nav-link"><router-link :to="{ name: 'Login' }" style="color:white;">Login</router-link></a>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <a class="nav-link"><router-link :to="{ name: 'Signup' }" style="color:white;">Signup</router-link></a>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link"><router-link :to="{ name: 'Logout' }" style="color:white;">Logout</router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link"><router-link :to="{ name: 'ArticleList' }" style="color:white; font-size:20px;"><i class="fas fa-home"></i></router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link"><router-link :to="{ name: 'ArticlePopular' }" style="color:white; font-size:20px;"><i class="fab fa-hotjar"></i></router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link"><router-link :to="{ name: 'MovieList' }" style="color:white; font-size:20px;"><i class="fas fa-film"></i></router-link></a>
          </li>
          <li class="nav-item">
            <a class="nav-link"><router-link :to="{ name: 'Profile' }" style="color:white; font-size:20px;"><i class="fas fa-user"></i></router-link></a>
          </li>
        </ul>        
      </div>
    </nav>
    <router-view class="container" />
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
</style>
