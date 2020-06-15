<template>
  <div class="container w-75 mb-5" v-if="reviews">
    <h1 class="text-center">Reviews</h1>
    <div class="accordion" id="accordionExample">
      <div class="card" v-for="review in reviews" :key="review.id">
        <!-- review 제목 -->
        <div class="card-header" :id="'heading'+review.id">
          <h2 class="mb-0">
            <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" :data-target="'#collapse'+review.id" aria-expanded="false" :aria-controls="'collapse'+review.id">
              <div class="d-flex justify-content-between align-items-center">
                <span>{{ review.title }}</span>
                <span>{{ review.user.username }}</span>
              </div>
            </button>
          </h2>
        </div>

        <!-- review 내용 -->
        <div :id="'collapse'+review.id" class="collapse" :aria-labelledby="'heading'+review.id" data-parent="#accordionExample">
          <div class="card-body">
            <div>
              <div class="d-flex justify-content-between">
                <div>
                  <p><span class="badge badge-pill badge-warning">{{ review.rank }}</span> | <span>{{ review.created_at }}</span></p>                  
                </div>
                <div>
                  <button @click="initUpdate(review)" type="button" class="btn btn-sm btn-outline-info mb-2" data-toggle="modal" :data-target="'#update_review'+review.id">Update</button>              
                  <button @click="deleteR(review.id)" type="button" class="btn btn-sm btn-outline-danger mb-2 ml-2">Delete</button>
                  
                  <!-- update modal -->
                  <div class="modal fade" :id="'update_review'+review.id" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="staticBackdropLabel">Review Update</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="form-group">
                            <label :for="'update_title'+review.id">Title</label>
                            <input v-model="reviewUpdateData.formData.title" class="form-control" type="text" :id="'update_title'+review.id">
                          </div>
                          <div class="form-group">
                            <label :for="'update_content'+review.id">Content</label>
                            <textarea v-model="reviewUpdateData.formData.content" class="form-control" :id="'update_content'+review.id" rows="3"></textarea>
                          </div>
                          <div class="form-group">
                            <label :for="'update_rank'+review.id">Rank</label> |
                            <span class="badge badge-pill badge-warning">{{ reviewUpdateData.formData.rank }}</span>
                            <input v-model="reviewUpdateData.formData.rank" type="range" class="custom-range" min="0" max="10" :id="'update_rank'+review.id">
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button @click="updateR(review.id)" type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>
              <p>{{ review.content }}</p>
            </div>
            <hr>
            <h5>Comments</h5>
            <ReviewCommentCreate :reviewId="review.id" />
            <!-- comments list -->
            <div v-if="review.comments!=='[]'">
              <div class="d-flex flex-row justify-content-between" v-for="comment in changeStringToObject(review.comments)" :key="comment.pk">
                <p>{{ comment.fields['content'] }}</p>
                <div>
                  <span class="mr-2">{{ comment.fields.username }} | {{ comment.fields.created_at }}</span>
                  <button @click="deleteRC(review.id, Number(comment.pk))" type="button" class="btn btn-sm btn-outline-danger mb-2">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    


  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ReviewCommentCreate from '@/views/movies/reviews/ReviewCommentCreate.vue'

export default {
  name: 'ReviewList',
  data() {
    return {
      reviewUpdateData: {
        formData: {
          title: null,
          content: null,
          rank: null
        },
        reviewId: null
      }
    }
  },
  components: {
    ReviewCommentCreate
  },
  computed : {
    ...mapState(['reviews'])
  },
  methods: {
    ...mapActions(['updateReview', 'deleteReview', 'deleteReviewComment']),
    changeStringToObject(S) {
      const O = JSON.parse(S);
      return O
    },
    initUpdate(review) {
      this.reviewUpdateData.formData.title = review.title
      this.reviewUpdateData.formData.content = review.content
      this.reviewUpdateData.formData.rank = Number(review.rank)
    },
    updateR(reviewId) {
      this.reviewUpdateData.reviewId = reviewId
      this.updateReview(this.reviewUpdateData)
    },
    deleteR(reviewId) {
      this.deleteReview(reviewId)
    },
    deleteRC(reviewId, commentId) {
      let reviewCommentDeleteData = {
        reviewId: reviewId,
        commentId: commentId
      }
      this.deleteReviewComment(reviewCommentDeleteData)
    }
  }
}
</script>

<style>

</style>