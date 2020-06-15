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
    actors: null,
    selectedActor: null,

    // articles
    articles: null,

    // movies
    movies: null,
    selectedMovie: null,
    reviews: null,
    
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
    SET_ACTORS(state, actors) {
      state.actors = actors
    },
    SET_SELECTED_ACTOR(state, actor) {
      state.selectedActor = actor
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
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews
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
          commit('SET_ACTORS', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    selectActor({ commit }, actor_id) {
      axios.get(SERVER.URL + SERVER.ROUTES.actorList + actor_id + '/')
        .then(res => {
          commit('SET_SELECTED_ACTOR', res.data)
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
      // console.log(articleData.video_path.startsWith('https://www.youtube.com/watch?v='))
      console.log(articleData.video_path)
      if (articleData.video_path.startsWith('https://www.youtube.com/watch?v=')) {
        articleData.video_path = articleData.video_path.slice(32)
        axios.post(SERVER.URL + SERVER.ROUTES.articleList, articleData, getters.config)
          .then(() => {
            router.push({ name: 'ArticleList'})
          })
          .catch(err => console.log(err.response.data))
      }
      else {
        router.push({ name: 'ArticleCreate', params:{ actor_id: articleData.actorId } })
      }
    },
    
    // movies
    fetchMovies({ getters, commit }) {
      axios.get(SERVER.URL + SERVER.ROUTES.movieList, getters.config)
        .then(res => {
          commit('SET_MOVIES', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    selectMovie({ commit }, movie_id) {
      axios.get(TMDB.URL + TMDB.ROUTES.movieDetail + `/${movie_id}`, {
        params: {
          api_key: '3c8bd48509d32d366925172366a3081a',
          language: 'ko-KR'
        }
      })
        .then(res => {
          commit('SET_SELECTED_MOVIE', res.data)
        })
        .catch(err => console.log(err.response.data))
    },
    fetchReviews({ getters, commit }, movie_id) {
      axios.get(SERVER.URL + SERVER.ROUTES.movieList + `${movie_id}/reviews/`, getters.config)
        .then(res => {
          commit('SET_REVIEWS', res.data)
        })
        .catch(err => {
          console.log(err.response.data)
          commit('SET_REVIEWS', [])
        })
    },
    createReview({ state, getters, dispatch }, reviewData) {
      reviewData.rank = Number(reviewData.rank)
      axios.post(SERVER.URL + SERVER.ROUTES.movieList + `${state.selectedMovie.id}/reviews/`, reviewData, getters.config)
        .then(() => {
          dispatch('fetchReviews', state.selectedMovie.id)
        })
        .catch(err => console.log(err.response.data))
    },
    updateReview({ state, getters, dispatch }, reviewUpdateData) {
      reviewUpdateData.formData.rank = Number(reviewUpdateData.formData.rank)
      axios.put(SERVER.URL + SERVER.ROUTES.movieList + `${state.selectedMovie.id}/reviews/${reviewUpdateData.reviewId}/`, reviewUpdateData.formData, getters.config)
        .then(() => {
          dispatch('fetchReviews', state.selectedMovie.id)
        })
        .catch(err => console.log(err.response.data))
    },
    deleteReview({ state, getters, dispatch }, reviewId) {
      axios.delete(SERVER.URL + SERVER.ROUTES.movieList + `${state.selectedMovie.id}/reviews/${reviewId}/`, getters.config)
        .then(() => {
          dispatch('fetchReviews', state.selectedMovie.id)
        })
        .catch(err => console.log(err.response.data))
    },
    createReviewComment({ state, getters, dispatch }, reviewCommentData) {
      axios.post(SERVER.URL + SERVER.ROUTES.movieList + `${state.selectedMovie.id}/reviews/${reviewCommentData.reviewId}/comments/`, reviewCommentData.formData, getters.config)
        .then(() => {
          dispatch('fetchReviews', state.selectedMovie.id)
        })
        .catch(err => console.log(err.response.data))
    },
    deleteReviewComment({ state, getters, dispatch }, reviewCommentDeleteData) {
      axios.delete(SERVER.URL + SERVER.ROUTES.movieList + `${state.selectedMovie.id}/reviews/${reviewCommentDeleteData.reviewId}/comments/${reviewCommentDeleteData.commentId}/`, getters.config)
        .then(() => {
          dispatch('fetchReviews', state.selectedMovie.id)
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