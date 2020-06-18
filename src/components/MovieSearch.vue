<template>
  <div>
    <input @keydown.enter="searchMovies(keyword)" v-model="keyword" id="movie-searchbar" class="w-100 customcard" type="text" placeholder="영화를 검색해보세요">
    <hr>
    <div class="d-flex flex-column align-items-center" v-if="searchedMovies">
      <router-link :to="{ name: 'MovieDetail', params: {movie_id: searchedMovie.id }}" class="row mb-3 bg-light mx-0 rounded searched customcard" v-for="searchedMovie in searchedMovies" :key="searchedMovie.id">
        <img v-if="searchedMovie.poster_path" class="col-4 px-0 rounded-left" :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${searchedMovie.poster_path}`" :alt="`${searchedMovie.original_title} poster`">
        <img v-else class="col-4 px-0 rounded-left" :src="`http://placehold.jp/300x450.png?text=${searchedMovie.original_title}`" :alt="`${searchedMovie.original_title} poster`">
        <div class="col-8 px-3 d-flex flex-column justify-content-center align-items-center">
          <h5>{{ searchedMovie.original_title }}</h5>
          <p>{{ searchedMovie.release_date }}</p>
        </div>
      </router-link>
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

<style scoped>
.searched:hover {
  opacity: 70%;
  cursor: pointer;
}

a {
  color: black;
}
</style>