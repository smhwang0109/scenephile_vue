<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-color">
      <div class="container">
        <router-link v-if="isLoggedIn" class="navbar-brand col-2" :to="{ name: 'ArticleList' }" style="color:white;"><img class="img-fluid" src="./assets/logo.png" alt="logo"></router-link>
        <router-link v-else class="navbar-brand col-2" :to="{ name: 'Login' }" style="color:white;"><img class="img-fluid" src="./assets/logo.png" alt="logo"></router-link>
        <div v-if="isLoggedIn" class="d-none d-lg-inline form-inline offset-1 col-5 col-xl-4">
          <input v-model="keyword" @keyup.enter="getKeyword()" class="input-color form-control mr-sm-2" placeholder="좋아하는 배우 검색">
          <button @click="getKeyword()" class="btn btn-outline-primary my-2 my-sm-0">검색</button>
        </div>
        <ul class="navbar-nav mt-2 offset-xl-1 col-6 col-lg-3 d-flex felx-row justify-content-around">
          <li v-if="isLoggedIn">
            <router-link :to="{ name: 'Logout' }" class="nav-font">Logout</router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link :to="{ name: 'ArticleList'}" class="nav-font"><i class="fas fa-home"></i></router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link :to="{ name: 'ArticlePopular'}" class="nav-font"><i class="fab fa-hotjar"></i></router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link :to="{ name: 'ActorSelect' }" class="nav-font"><i class="fas fa-plus-circle"></i></router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link :to="{ name: 'MovieList' }" class="nav-font"><i class="fas fa-film"></i></router-link>
          </li>
          <li v-if="isLoggedIn">
            <router-link v-if="myAccount" :to="`/accounts/${myAccount.id}/`" class="nav-font"><i class="fas fa-user"></i></router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view class="container mt-3" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      keyword : null,
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    ...mapState(['myAccount']),
  },
  methods: {
    ...mapActions(['getMyAccount', 'searchArticles', 'searchActors']),
    ...mapMutations(['SET_KEYWORD']),
    setNull() {
      this.keyword = null
    },
    getKeyword() {
      if (this.keyword === '박') {
        this.keyword = 'park'
      }
      this.SET_KEYWORD(this.keyword)
      this.searchActors(this.keyword)
      this.searchArticles(this.keyword)
      this.keyword = null
      this.$router.push({ name: 'SearchResult', params: { keyword: this.keyword}})
    },
  },
  created() {
    this.getMyAccount()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Black+Han+Sans:400');
@import url('https://fonts.googleapis.com/css?family=Black+Han+Sans&display=swap&subset=korean');

@font-face { font-family: 'BMJUA'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff'); font-weight: normal; font-style: normal; }
#app {
  font-family: 'BMJUA';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}


.btn-outline-primary {
  color: #F6AF86;
  border-color: #F6AF86;
}

.btn-outline-primary:hover {
  background-color: #F6AF86;
  border-color: #F6AF86;
}

.bg-color {
  background-color: #ffffffcc!important;
}
.nav-font {
  color: #575858;
  font-size: 20px;
}
.nav-font:hover {
  color: #F6AF86;
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

.user-image {
  width: 2.5em;
}

a:hover {
  text-decoration: none;
}

.blank-movie-image {
  width: 300px;
  height: 450px;
}
</style>
