<template>
  <div class="container w-75">
    <div class="form-group">
      <label for="title">Title</label>
      <input v-model="reviewData.title" class="form-control" type="text" placeholder="Default input" id="title">
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Example textarea</label>
      <textarea v-model="reviewData.content" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label for="rank">Rank</label>
      <input v-model="reviewData.rank" type="range" class="custom-range" min="0" max="10" id="rank">
    </div>
    <button @click="createReview(this.$route.params.movie_id, this.reviewData)" type="submit" class="btn btn-primary">Submit</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ReviewCreate',
  computed: {
    
  },
  data() {
    return {
      reviewData: {
        title: null,
        content: null,
        rank: null
      }
    }
  },
  methods: {
    ...mapActions(['createReview'])
  }
}
</script>

<style>

</style>