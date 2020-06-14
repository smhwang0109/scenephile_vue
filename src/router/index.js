import Vue from 'vue'
import VueRouter from 'vue-router'
// import Test from '@/views/Test.vue'
import LoginView from '@/views/accounts/LoginView'
import LogoutView from '@/views/accounts/LogoutView'
import SignupView from '@/views/accounts/SignupView'
import Profile from '@/views/accounts/Profile.vue'
import ArticleList from '@/views/articles/ArticleList.vue'
import ArticlePopular from '@/views/articles/ArticlePopular.vue'
import MovieList from '@/views/movies/MovieList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/',
    name: 'ArticleList',
    component: ArticleList
  },
  {
    path: '/popular',
    name: 'ArticlePopular',
    component: ArticlePopular
  },
  {
    path: '/movies',
    name: 'MovieList',
    component: MovieList
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
