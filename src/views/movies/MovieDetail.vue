<template>
  <div class="my-3">
   <div class="movie-info row" v-if="selectedMovie">
     <img class="col-lg-4 col-sm-12 rounded" :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${selectedMovie.poster_path}`" :alt="`${selectedMovie.original_title} poster`">
     <div class="col-lg-8 col-sm-12">
       <div>
        <h1>{{ selectedMovie.original_title }}</h1>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="badge badge-pill badge-info mx-1" v-for="genre in selectedMovie.genres" :key="genre.id">
              {{ genre.name }}
            </span>
          </div>
          <button type="button" class="btn btn-secondary">{{ selectedMovie.release_date }}</button>
        </div>
       </div>
       <hr>
       <p>{{ selectedMovie.overview }}</p>
       
     </div>
   </div>
   <hr>
   <ReviewCreate />
   <hr>
   <ReviewList />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ReviewList from '@/views/movies/reviews/ReviewList.vue'
import ReviewCreate from '@/views/movies/reviews/ReviewCreate.vue'

export default {
  name: 'MovieDetail',
  components: {
    ReviewList,
    ReviewCreate
  },
  data() {
    return {
      movie_id: this.$route.params.movie_id,
    }
  },
  computed: {
    ...mapState(['selectedMovie'])
  },
  methods: {
    ...mapActions(['selectMovie', 'fetchReviews'])
  },
  created() {
    this.selectMovie(this.movie_id)
    this.fetchReviews(this.movie_id)
  }
}
</script>

<style>

</style>