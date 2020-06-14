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
    authToken: cookies.get('auth-token'),
    articles: [],
    movies: [],
    keyword: null,
    searchedMovies: null,
    likeActors: null
  },
  getters: {
    isLoggedIn: state => !!state.authToken,
    config: state => ({ headers: { Authorization: `Token ${state.authToken}`}}),
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.authToken = token
      cookies.set('auth-token', token)
    },
    SET_ARTICLES(state, articles) {
      state.articles = articles
    },
    SET_MOVIES(state, movies) {
      state.movies = movies
    },
    SET_KEYWORD(state, keyword) {
      state.keyword = keyword
    },
    SET_SEARCHED_MOVIES(state, movies) {
      state.searchedMovies = movies
    },
    SET_LIKE_ACTORS(state, actors) {
      state.likeActors = actors
    }
  },
  actions: {
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
    //
    fetchArticles({ commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.articleList)
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
    // Movie 관련
    fetchMovies({ commit, getters }) {
      axios.get(SERVER.URL + SERVER.ROUTES.movieList, getters.config)
        .then(res => {
          commit('SET_MOVIES', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    movieSearch({ state, commit }) {
      axios.get(TMDB.URL + TMDB.ROUTES.movieSearch, {
        params: {
          api_key: '3c8bd48509d32d366925172366a3081a',
          language: 'ko-KR',
          query: state.keyword
        }
      })
        .then(res => {
          commit('SET_SEARCHED_MOVIES', res.data.results)
        })
    },
    //
    getLikeActors({ getters, commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.actorList, getters.config)
        .then(res => {
          commit('SET_LIKE_ACTORS', res.data)
        })
    }
  },
  modules: {
  }
})