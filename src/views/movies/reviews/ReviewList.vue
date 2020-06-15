<template>
  <div>
    <p v-for="review in reviews" :key="review.id">{{ review.title }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ReviewList',
  computed : {
    ...mapState(['reviews'])
  }
}
</script>

<style>

</style>