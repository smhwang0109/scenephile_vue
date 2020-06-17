<template>
  <div>
    <input @keydown.enter="searchUsers(keyword)" v-model="keyword" id="movie-searchbar" class="w-100 customcard" type="text" placeholder="친구를 검색해보세요">
    <hr>
    <div class="d-flex flex-column justify-content-center align-items-center customcard" v-if="searchedUsers">
      <div @click="toUserProfile(searchedUser.id)" class="user-profile border-bottom d-flex justify-content-center align-items-center col-12 py-3" v-for="searchedUser in searchedUsers" :key="searchedUser.id">
        <img class="img-fluid rounded-circle mr-3 border user-image" src="@/assets/anonymoususer.png" :alt="`${searchedUser.username} profile`">
        <h5 class="m-0">{{ searchedUser.username }}</h5>
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
    toUserProfile(user_id) {
      this.$router.push({ name: 'Profile', params: { user_id : user_id } })
    }
  },
}
</script>

<style scoped>
.user-profile:hover {
  cursor: pointer;
}
</style>t