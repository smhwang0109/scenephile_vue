<template>
  <div>
    <input @keydown.enter="searchUsers(keyword)" v-model="keyword" id="movie-searchbar" class="w-100 customcard" type="text" placeholder="친구를 검색해보세요">
    <hr>
    <div class="d-flex flex-column align-items-center customcard" v-if="searchedUsers">
      <div v-for="searchedUser in searchedUsers" :key="searchedUser.id">
        <router-link :to="`/accounts/${searchedUser.id }`"><h5>{{ searchedUser.username }}</h5></router-link>
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

</style>t