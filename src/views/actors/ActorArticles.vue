<template>
  <div class="row">
    <div class="col-4 card px-0" v-for="article in actorArticles" :key="article.id">
      <div class="flex-column">
        <div class="video-section">
          <div class="embed-responsive embed-responsive-1by1 rounded">
            <iframe class="embed-responsive-item" :src="`https://www.youtube.com/embed/${article.video_path}`" allowfullscreen></iframe>
          </div>
        </div>
        <div class="d-flex flex-column my-2">
          <div class="d-flex justify-content-between align-items-center m-1 mb-2">
            <div class="d-flex flex-row justify-content-start">
              <img class="img-fluid rounded-circle ml-1 border user-image" src="@/assets/anonymoususer.png" :alt="`${article.user.username} profile`">
              <div class="d-flex justify-content-start align-items-center ml-2">
                <router-link :to="`/accounts/${article.user.id }`"><span> {{ article.user.username }}</span></router-link>
                <span class="ml-2">| {{ article.actor.name }}</span>
              </div>
            </div>
            <div>
              <i v-if="checkLike(article.like_users)" @click="clickLikeArticle(true, article.id)" class="fas fa-heart mr-2 like-btn liked"></i>
              <i v-else @click="clickLikeArticle(false, article.id)" class="far fa-heart mr-2 like-btn"></i>
              <span>{{ article.like_users.length }}명이 좋아합니다.</span>
            </div>
          </div>
          <div class="mx-2">
            {{ article.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ActorArticles',
  computed: {
    ...mapState(['actorArticles', 'myAccount', 'selectedActor'])
  },
  methods: {
    ...mapActions(['fetchActorArticles', 'likeArticle']),
    changeStringToObject(S) {
      const O = JSON.parse(S);
      return O
    },
    checkLike(like_users) {
      if (Object.values(like_users).includes(this.myAccount.id)) {
        return true
      } else {
        return false
      }
    },
    clickLikeArticle(isArticleLike, article_pk) {
      const data = {isArticleLike: isArticleLike, article_pk: article_pk, actor_id: this.selectedActor.id, where: 'ActorProfile'}
      this.likeArticle(data)
    },
  },
  created() {
    this.fetchActorArticles(this.$route.params.actor_id)
  }
}
</script>

<style>

</style>