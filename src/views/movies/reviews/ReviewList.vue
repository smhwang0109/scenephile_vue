<template>
  <div class="container w-75 mb-5" v-if="reviews">
    <h1 class="text-center">리뷰</h1>
    <div class="accordion" id="accordionExample">
      <div class="card" v-for="review in reviews" :key="review.id">
        <!-- review 제목 -->
        <div class="card-header" :id="'heading'+review.id">
          <h2 class="mb-0">
            <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" :data-target="'#collapse'+review.id" aria-expanded="false" :aria-controls="'collapse'+review.id">
              <div class="d-flex justify-content-start align-items-center">
                <span>{{ review.title }} | </span>
                <span class="ml-2 badge badge-pill badge-warning">{{ review.rank }}</span>
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
                  <p>
                    <router-link :to="`/accounts/${review.user.id}`"><span>{{ review.user.username }}</span></router-link> |
                    <span>{{ review.created_at.slice(0,10) }}</span> |
                    <span class="badge badge-pill badge-warning">{{ review.rank }}</span>
                  </p>                  
                </div>
                <div>
                  <button v-if="myAccount.id === review.user.id" @click="initUpdate(review)" type="button" class="btn btn-sm btn-outline-info mb-2" data-toggle="modal" :data-target="'#update_review'+review.id">수정</button>              
                  <button v-if="myAccount.id === review.user.id" @click="deleteR(review.id)" type="button" class="btn btn-sm btn-outline-danger mb-2 ml-2">삭제</button>
                  
                  <!-- update modal -->
                  <div class="modal fade" :id="'update_review'+review.id" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="staticBackdropLabel">리뷰 수정</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="form-group">
                            <label :for="'update_title'+review.id">제목</label>
                            <input v-model="reviewUpdateData.formData.title" class="form-control" type="text" :id="'update_title'+review.id">
                          </div>
                          <div class="form-group">
                            <label :for="'update_content'+review.id">내용</label>
                            <textarea v-model="reviewUpdateData.formData.content" class="form-control" :id="'update_content'+review.id" rows="3"></textarea>
                          </div>
                          <div class="form-group">
                            <label :for="'update_rank'+review.id">평점</label> |
                            <span class="badge badge-pill badge-warning">{{ reviewUpdateData.formData.rank }}</span>
                            <input v-model="reviewUpdateData.formData.rank" type="range" class="custom-range" min="0" max="10" :id="'update_rank'+review.id">
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">취소</button>
                          <button @click="updateR(review.id)" type="button" class="btn btn-primary" data-dismiss="modal">리뷰 수정</button>
                        </div>
                      </div>
                    </div>
                  </div>
                
                </div>
              </div>
              <p>{{ review.content }}</p>
            </div>
            <hr>
            <h5>댓글</h5>
            <ReviewCommentCreate :reviewId="review.id" />
            <!-- comments list -->
            <div v-if="review.comments!=='[]'">
              <div class="d-flex flex-row justify-content-between" v-for="comment in changeStringToObject(review.comments)" :key="comment.pk">
                <p>{{ comment.fields['content'] }}</p>
                <div>
                  <router-link :to="`/accounts/${comment.fields.user }`"><span>{{ comment.fields.username }}</span></router-link> |
                  <span>{{ comment.fields.created_at.slice(0,10) }} | </span>
                  <button v-if="myAccount.id === comment.fields.user " @click="deleteRC(review.id, Number(comment.pk))" type="button" class="btn btn-sm btn-outline-danger mb-2">댓글 삭제</button>
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
    ...mapState(['reviews', 'myAccount'])
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