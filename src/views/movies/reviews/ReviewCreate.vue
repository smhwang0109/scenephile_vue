<template>
  <div class="container w-75">
    <h1 class="text-center">New Review</h1>
    <div class="form-group">
      <label for="title">Title</label>
      <input v-model="reviewData.title" class="form-control" type="text" id="title">
    </div>
    <div class="form-group">
      <label for="content">Content</label>
      <textarea v-model="reviewData.content" class="form-control" id="content" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label for="rank">Rank</label> |
      <span class="badge badge-pill badge-warning">{{ reviewData.rank }}</span>
      <input v-model="reviewData.rank" type="range" class="custom-range" min="0" max="10" id="rank">
    </div>
    <div class="d-flex justify-content-end">
      <button @click="create" type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'ReviewCreate',
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
    ...mapActions(['createReview']),
    create() {
      this.createReview(this.reviewData)
        .then(() => {
          this.reviewData.title = null
          this.reviewData.content = null
          this.reviewData.rank = null
        })
    }
  }
}
</script>

<style>

</style>