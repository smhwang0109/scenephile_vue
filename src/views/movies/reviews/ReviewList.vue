<template>
  <div class="container w-75 mb-5" v-if="reviews">
    <h1 class="text-center">Reviews</h1>
    <div class="accordion" id="accordionExample">
      <div class="card" v-for="review in reviews" :key="review.id">
        <div class="card-header" :id="'heading'+review.id">
          <h2 class="mb-0">
            <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" :data-target="'#collapse'+review.id" aria-expanded="false" :aria-controls="'collapse'+review.id">
              <div class="d-flex justify-content-between align-items-center">
                <span>{{ review.title }}</span>
                <span>{{ review.user.username }} | {{ review.created_at }}</span>
              </div>
            </button>
          </h2>
        </div>

        <div :id="'collapse'+review.id" class="collapse" :aria-labelledby="'heading'+review.id" data-parent="#accordionExample">
          <div class="card-body">
            <h5>Content</h5>
            <p>{{ review.content }}</p>
            <hr>
            <h5>Rank</h5>
            <p>{{ review.rank }}</p>
            <hr>
            <h5>Comments</h5>
            <ul>
              <li v-for="comment in changeStringToObject(review.comments)" :key="comment.pk">
                {{ comment.fields['content'] }} | {{ comment.fields.username }} | {{ comment.fields.created_at }}
              </li>
            </ul>
            <hr>
            <ReviewCommentCreate />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ReviewCommentCreate from '@/views/movies/reviews/ReviewCommentCreate.vue'

export default {
  name: 'ReviewList',
  components: {
    ReviewCommentCreate
  },
  computed : {
    ...mapState(['reviews'])
  },
  methods: {
    changeStringToObject(S) {
      const O = JSON.parse(S);
      return O
    },
  }
}
</script>

<style>

</style>