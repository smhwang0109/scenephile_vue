<template>
  <div>
    <div class="row">
      <router-link :to="{ name: 'MovieDetail', params: { movie_id: movie.id }}" class="card col-lg-4 col-sm-12 px-0 poster-container" v-for="movie in actorMovies" :key="movie.id">
        <img v-if="movie.poster_path" class="image card-img-top img-fluid rounded" :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" :alt="`${movie.original_title} poster`">
        <img v-else class="image card-img-top img-fluid rounded" :src="`http://placehold.jp/300x450.png?text=${movie.original_title}`" :alt="`${movie.original_title} poster`">
        
        <div class="overlay rounded">
          <div class="text">{{ movie.original_title }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ActorMovies',
  computed: {
    ...mapState(['actorMovies'])
  },
  methods: {
    ...mapActions(['fetchActorMovies'])
  },
  created() {
    this.fetchActorMovies(this.$route.params.actor_id)
  }
}
</script>

<style scoped>
.poster-container {
  position: relative;
}

.poster-container:hover {
  cursor: pointer;
}

.image {
  display: block;
  width: 100%;
  height: auto;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  background-color: #3e3f3f;
}

.poster-container:hover .overlay {
  opacity: 0.8;
}

.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  width: 80%;
  font-weight: bold;
}
</style>