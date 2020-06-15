<template>
  <div class="my-3">
    <h1 class="text-center">추천 영화</h1>
    <hr>
    <div class="movie-feed row justify-content-around">
      <div class="col-8">
        <div class="col-12 row">
          <div class="col-1 card px-0 mr-1" v-for="actor in likeActors" :key="actor.id">
            <img class="card-img-top img-fluid" :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${actor.profile_path}`" :alt="`${actor.name} profile`">
          </div>
        </div>
        <hr>
        <div class="row">
          <div class="col-lg-4 col-sm-12 card px-0" v-for="movie in movies" :key="`movie_${movie.id}`">
            <img class="card-img-top img-fluid" :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" :alt="`${movie.original_title} poster`">
            <div class="card-body">
              <h5 class="card-text text-center">{{ movie.original_title }}</h5>
            </div>
          </div>
        </div>
      </div>
      <MovieSearch class="col-4" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import MovieSearch from '@/views/searchbars/MovieSearch.vue'
export default {
  name: 'MovieList',
  components: {
    MovieSearch
  },
  computed: {
    ...mapState(['movies', 'likeActors'])
  },
  methods: {
    ...mapActions(['fetchMovies', 'getLikeActors'])
  },
  created() {
    this.fetchMovies()
    this.getLikeActors()
  }
}
</script>

<style>
</style>