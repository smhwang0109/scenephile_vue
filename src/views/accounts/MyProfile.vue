<template>
  <div>
    <h1>{{ selectedUser.username }}</h1>
    <button>Follow</button>
    <p>followers: {{ selectedUser.followers_cnt }}</p>
    <p>followings: {{ selectedUser.followings_cnt }}</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MyProfile',
  computed: {
    ...mapState(['selectedUser'])
  },
  methods: {
    ...mapActions(['selectSelf'])
  },
  created() {
    this.selectSelf()
  }
}
</script>

<style>

</style>