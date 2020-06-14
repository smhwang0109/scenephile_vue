<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand ml-sm-2 mr-lg-2 mr-sm-auto"><router-link :to="{ name: 'ArticleList' }" style="color:white;">Scenephile</router-link></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <form class="form-inline my-2 my-lg-0 offset-lg-3 col-lg-4">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div class="col-lg-5 d-flex justify-content-end">
          <ul class="navbar-nav mt-2 mt-lg-0 ">
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
