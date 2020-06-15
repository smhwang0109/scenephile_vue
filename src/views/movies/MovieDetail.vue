<template>
  <div>
   <div class="movie-info row">
     <img class="col-4 rounded" :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${selectedMovie.poster_path}`" :alt="`${selectedMovie.original_title} poster`">
     <div class="col-8">
       <h1>{{ selectedMovie.original_title }}</h1>
       <p>{{ selectedMovie.overview }}</p>
       <p>{{ selectedMovie.release_date }}</p>
       <p v-for="genre in selectedMovie.genres" :key="genre.id">
         {{ genre.name }}
       </p>
     </div>
   </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MovieDetail',
  data() {
    return {
      movie_id: this.$route.params.movie_id,
    }
  },
  computed: {
    ...mapState(['selectedMovie'])
  },
  methods: {
    ...mapActions(['fetchMovie'])
  },
  created() {
    this.fetchMovie(this.movie_id)
  }
}
</script>

<style>

</style>