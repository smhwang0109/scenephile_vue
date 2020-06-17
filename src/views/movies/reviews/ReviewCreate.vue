<template>
  <div class="container w-75">
    <h1 class="text-center">리뷰 쓰기</h1>
    <div class="form-group">
      <label for="title">제목</label>
      <input v-model="reviewData.title" class="form-control" type="text" id="title">
    </div>
    <div class="form-group">
      <label for="content">내용</label>
      <textarea v-model="reviewData.content" class="form-control" id="content" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label for="rank">평점</label> |
      <span class="badge badge-pill badge-warning">{{ reviewData.rank }}</span>
      <input v-model="reviewData.rank" type="range" class="custom-range" min="0" max="10" id="rank">
    </div>
    <div class="d-flex justify-content-end">
      <button @click="create" type="submit" class="btn btn-primary">리뷰 작성</button>
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
        rank: 5
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
          this.reviewData.rank = 5
        })
    }
  }
}
</script>

<style>

</style>