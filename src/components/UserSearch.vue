<template>
  <div>
    <input @keydown.enter="searchUsers(keyword)" v-model="keyword" id="movie-searchbar" class="w-100" type="text" placeholder="친구를 검색해보세요">
    <hr>
    <div class="d-flex flex-column align-items-center" v-if="searchedUsers">
      <div class="row mb-3 bg-light mx-0" v-for="searchedUser in searchedUsers" :key="searchedUser.id">
        <!-- <img class="col-4 px-0" :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`" :alt="`${movie.original_title} poster`"> -->
        <div class="col-8 px-0 d-flex flex-column justify-content-center align-items-center">
          <p>{{ searchedUser.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'UserSearch',
  data() {
    return {
      keyword: null
    }
  },
  computed: {
    ...mapState(['searchedUsers']),    
  },
  methods: {
    ...mapActions(['searchUsers']),
  },
}
</script>

<style scoped>

</style>