<template>
  <div class="my-3">
    <h1 class="text-center">추천 영화</h1>
    <hr>
    <div class="movie-feed row justify-content-around">
      <div class="col-8">
        <ActorList />
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
import ActorList from '@/components/ActorList.vue'
import MovieSearch from '@/views/searchbars/MovieSearch.vue'
export default {
  name: 'MovieList',
  components: {
    MovieSearch,
    ActorList
  },
  computed: {
    ...mapState(['movies', 'likeActors'])
  },
  methods: {
    ...mapActions(['fetchMovies'])
  },
  created() {
    this.fetchMovies()
  }
}
</script>

<style>
</style>