<template>
  <div>
    <input class="search-input mr-1 border border-secondary rounded" v-model="keyword" @keypress.enter="fetchUsers(keyword)">
    <button class="search-button btn btn-secondary" @click="fetchUsers(keyword)">검색</button>
    <hr>
    <ul>
      <li v-for="search_user in search_users" :key="search_user.id">        
        {{ search_user.username }}
      </li>
    </ul>
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
    ...mapState(['search_users']),    
  },
  methods: {
    ...mapActions(['fetchUsers']),
  },
}
</script>

<style scoped>
li {
  list-style: none;
}

.search-input {
  width: 70%;
}

.search-button {
  width: 20%;
  padding: 0.2rem 0.5rem;
}
</style>