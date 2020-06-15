<template>
  <div class="row">
    <div class="col-2 px-0 mr-1" v-for="actor in likeActors" :key="actor.id">
      <img class="img-fluid rounded-circle" :src="`https://image.tmdb.org/t/p/w300_and_h300_bestv2/${actor.profile_path}`" :alt="`${actor.name} profile`">
    </div>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ActorList',
  computed: {
    ...mapState(['likeActors']),    
  },
  methods: {
    ...mapActions(['fetchActors']),
  },
  created() {
    this.fetchActors()
  }
}
</script>

<style scoped>
li {
  list-style: none;
  float: left;
}

.profile-img {
  max-width: 50%;
  height: auto;
}
</style>