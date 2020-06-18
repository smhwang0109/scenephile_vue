<template>
  <!-- eslint-disable vue/no-use-v-if-with-v-for,vue/no-confusing-v-for-v-if -->
  <div class="row">
    <router-link :to="{ name: 'ActorProfile', params: { actor_id: actor.id }}" class="col-2 px-0 mr-1 profile-container" v-for="actor in searchedActors.results" :key="actor.id">
      <img v-if="actor.profile_path" class="img-fluid rounded-circle image" :src="`https://image.tmdb.org/t/p/w300_and_h300_bestv2/${actor.profile_path}`" :alt="`${actor.name} profile`">
      <img v-else class="img-fluid rounded-circle image" :src="`http://placehold.jp/300x300.png?text=${actor.name}`" :alt="`${actor.name} profile`">
      <div class="overlay rounded-circle">
        <div class="text">{{ actor.name }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ActorSearch',
  computed: {
    ...mapState(['searchedActors', 'keyword']),
  },
}
</script>
