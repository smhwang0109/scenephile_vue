import Vue from 'vue'
import Vuex from 'vuex'

import cookies from 'vue-cookies'
import axios from 'axios'

import router from '@/router'
import SERVER from '@/api/drf'
import TMDB from '@/api/tmdb'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // rest-auth
    authToken: cookies.get('auth-token'),

    // actors
    likeActors: null,

    // articles
    articles: null,

    // movies
    movies: null,
    selectedMovie: null,
    
    // search
    keyword: null,
    searchedUsers: null,
    searchedMovies: null,
  },
  getters: {
    isLoggedIn: state => !!state.authToken,
    config: state => ({ headers: { Authorization: `Token ${state.authToken}`}}),
  },
  mutations: {
    // rest-auth
    SET_TOKEN(state, token) {
      state.authToken = token
      cookies.set('auth-token', token)
    },
    
    // actors
    SET_LIKE_ACTORS(state, actors) {
      state.likeActors = actors
    },
    
    // articles
    SET_ARTICLES(state, articles) {
      state.articles = articles
    },

    // movies
    SET_MOVIES(state, movies) {
      state.movies = movies
    },
    SET_SELECTED_MOVIE(state, movie) {
      state.selectedMovie = movie
    },

    // search
    SET_SEARCHED_MOVIES(state, movies) {
      state.searchedMovies = movies
    },
    SET_SEARCH_USERS(state, users) {
      state.searchedUsers = users
    }
  },
  actions: {
    // rest-auth
    postAuthData({ commit }, info) {
      axios.post(SERVER.URL + info.location, info.data)
        .then(res => {
          commit('SET_TOKEN', res.data.key)
          router.push({ name: 'ArticleList' })
        })
        .catch(err => console.log(err.response.data))
    },
    signup({ dispatch }, signupData) {
      const info = {
        data: signupData,
        location: SERVER.ROUTES.signup
      }
      dispatch('postAuthData', info)
    },
    login({ dispatch }, loginData) {
      const info = {
        data: loginData,
        location: SERVER.ROUTES.login
      }
      dispatch('postAuthData', info)
    },
    logout({ getters, commit }) {
      axios.post(SERVER.URL + SERVER.ROUTES.logout, null, getters.config)
        .then(() => {
          commit('SET_TOKEN', null)
          cookies.remove('auth-token')
          router.push({ name: 'ArticleList'})
        })
        .catch(err => console.log(err.response.data))
    },

    // actors
    fetchActors({ getters, commit }, selectList) {
      axios.get(SERVER.URL + SERVER.ROUTES.actorList + selectList, getters.config)
        .then(res => {
          commit('SET_LIKE_ACTORS', res.data)
        })
        .catch(err => console.log(err.response.data))
    },

    // articles
    fetchArticles({ getters, commit }, selectFeed) {
      axios.get(SERVER.URL + SERVER.ROUTES.articleList + selectFeed, getters.config)
        .then(res => {
          commit('SET_ARTICLES', res.data)
        })
        .catch(err => console.log(err.response.data))
    },

    createArticle({ getters }, articleData) {
      axios.post(SERVER.URL + SERVER.ROUTES.createArticle, articleData, getters.config)
        .then(() => {
          router.push({ name: 'ArticleList'})
        })
        .catch(err => console.log(err.response.data))
    },
    
    // movies
    fetchMovies({ getters, commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.movieList, getters.config)
        .then(res => {
          commit('SET_MOVIES', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    fetchMovie({ commit }, movie_id) {
      axios.get(TMDB.URL + TMDB.ROUTES.movieDetail + `/${movie_id}`, {
        params: {
          api_key: '3c8bd48509d32d366925172366a3081a',
          language: 'ko-KR'
        }
      })
        .then(res => {
          commit('SET_SELECTED_MOVIE', null)
          commit('SET_SELECTED_MOVIE', res.data)
        })
        .catch(err => console.log(err.response.data))
    },

    // search
    searchMovies({ commit }, keyword) {
      axios.get(TMDB.URL + TMDB.ROUTES.movieSearch, {
        params: {
          api_key: '3c8bd48509d32d366925172366a3081a',
          language: 'ko-KR',
          query: keyword
        }
      })
        .then(res => {
          commit('SET_SEARCHED_MOVIES', res.data.results)
        })
    },

    searchUsers({ commit }, keyword) {
      axios.get(SERVER.URL + SERVER.ROUTES.userSearch + keyword + '/')
        .then(res => {
          commit('SET_SEARCH_USERS', res.data)
        })
        .catch(err => console.log(err.response.data))
    },

    
  },
  modules: {
  }
})