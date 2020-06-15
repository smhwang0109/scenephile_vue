<template>
  <div>
    <input @keydown.enter="searchMovies(keyword)" v-model="keyword" id="movie-searchbar" class="w-100" type="text" placeholder="영화를 검색해보세요">
    <hr>
    <div class="d-flex flex-column align-items-center" v-if="searchedMovies">
      <div class="row mb-3 bg-light mx-0" v-for="movie in searchedMovies" :key="movie.id">
        <img class="col-4 px-0" :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" :alt="`${movie.original_title} poster`">
        <div class="col-8 px-0 d-flex flex-column justify-content-center align-items-center">
          <h5>{{ movie.original_title }}</h5>
          <p>{{ movie.release_date }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MovieSearch',
  data() {
    return {
      keyword: null
    }
  },
  computed: {
    ...mapState(['searchedMovies'])
  },
  methods: {
    ...mapActions(['searchMovies']),
  }
}
</script>

<style>
</style>