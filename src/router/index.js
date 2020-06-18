import Vue from 'vue'
import VueRouter from 'vue-router'

// rest-auth
import LoginView from '@/views/accounts/LoginView'
import LogoutView from '@/views/accounts/LogoutView'
import SignupView from '@/views/accounts/SignupView'

// accounts
import Profile from '@/views/accounts/Profile'
import SignupActorSelect from '@/views/accounts/SignupActorSelect'

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

// search
import SearchResult from '@/views/searchbars/SearchResult'

Vue.use(VueRouter)

  const routes = [
    // rest-auth
    {
      path: '/',
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
      path: '/accounts/:user_id',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signupactorselect',
      name: 'SignupActorSelect',
      component: SignupActorSelect
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
          path: '',
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
      path: '/articles/',
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
    },

    // searchbar
    {
      path: '/search/:keyword',
      name: 'SearchResult',
      component: SearchResult,
      props: true
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
