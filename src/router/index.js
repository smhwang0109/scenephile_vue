import Vue from 'vue'
import VueRouter from 'vue-router'

// rest-auth
import LoginView from '@/views/accounts/LoginView'
import LogoutView from '@/views/accounts/LogoutView'
import SignupView from '@/views/accounts/SignupView'

// accounts
import Profile from '@/views/accounts/Profile'

// actors
import ActorSelect from '@/views/actors/ActorSelect'
import ActorProfile from '@/views/actors/ActorProfile'
import ActorMovies from '@/views/actors/ActorMovies'
import ActorArticles from '@/views/actors/ActorArticles'

// articles
import ArticleList from '@/views/articles/ArticleList'
import ArticlePopular from '@/views/articles/ArticlePopular'
import ArticleCreate from '@/views/articles/ArticleCreate'

// movies
import MovieList from '@/views/movies/MovieList'
import MovieDetail from '@/views/movies/MovieDetail'

Vue.use(VueRouter)

  const routes = [
    // rest-auth
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

    // accounts
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },

    // actors
    {
      path: '/actors/select',
      name: 'ActorSelect',
      component: ActorSelect
    },
    {
      path: '/actors/:actor_id',
      name: 'ActorProfile',
      component: ActorProfile,
      children: [
        {
          path: 'movies',
          name: 'ActorMovies',
          component: ActorMovies
        },
        {
          path: 'articles',
          name: 'ActorArticles',
          component: ActorArticles
        }
      ]
    },

    // articles
    {
      path: '/',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/articles/popular',
      name: 'ArticlePopular',
      component: ArticlePopular
    },
    {
      path: '/articles/create/:actor_id',
      name: 'ArticleCreate',
      component: ArticleCreate
    },

    // movies
    {
      path: '/movies',
      name: 'MovieList',
      component: MovieList
    },
    {
      path: '/movies/:movie_id',
      name: 'MovieDetail',
      component: MovieDetail
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
