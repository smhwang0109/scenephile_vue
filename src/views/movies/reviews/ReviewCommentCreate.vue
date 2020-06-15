<template>
  <div class="row">
    <input @keypress.enter="createComment" v-model="reviewCommentData.formData.content" class="form-control col-10" type="text" placeholder="댓글을 달아주세요.">
    <button @click="createComment" type="submit" class="mb-3 col-2 btn btn-primary">댓글 작성</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ReviewCommentCreate',
  props: {
    reviewId: Number
  },
  data() {
    return {
      reviewCommentData: {
        formData: {
          content: null
        },
        reviewId: this.reviewId
      }
    }
  },
  methods: {
    ...mapActions(['createReviewComment']),
    createComment() {
      this.createReviewComment(this.reviewCommentData)
        .then(() => {
          this.reviewCommentData.formData.content = null
        })
    }
  }
}
</script>

<style>

</style>