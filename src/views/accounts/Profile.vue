<template>
  <div v-if="selectedUser">
    <div class="d-flex justify-content-between customcard">
      <h1 class="ml-3">{{ selectedUser.username }}</h1>
      <div class="d-flex align-items-center align-content-center mr-3">
        <div v-if="!selectedUser.isMe">
          <button @click="followUser(selectedUser.id)" v-if="!selectedUser.isFollow" type="button" class="btn btn-warning mr-2 text-white">Follow</button>
          <button @click="followUser(selectedUser.id)" v-else type="button" class="btn btn-warning mr-2 text-white">UnFollow</button>
        </div>
        <button type="button" class="btn btn-primary mr-2">
          followers <span class="badge badge-light">{{ selectedUser.followers_cnt }}</span>
        </button>
        <button type="button" class="btn btn-primary">
          followings <span class="badge badge-light">{{ selectedUser.followings_cnt }}</span>
        </button>
      </div>
    </div>
    <hr>
    <div class="d-flex flex-column customcard">
      <h5 class="ml-3 mt-2 mb-1"><span>{{ selectedUser.username }}님이 </span>좋아하는 배우</h5>
      <div class="row container mx-1 p-3">
        <router-link :to="`/actors/${actor.pk}/`" class="col-2 px-0 mr-1 profile-container" v-for="actor in changeStringToObject(selectedUser.like_actors)" :key="actor.pk">
          <img class="img-fluid rounded-circle image" :src="`https://image.tmdb.org/t/p/w300_and_h300_bestv2/${actor.fields.profile_path}`" :alt="`${actor.fields.name} profile`">
          <div class="overlay rounded-circle">
            <div class="text">{{ actor.fields.name }}</div>
          </div>
        </router-link>
      </div>
    </div>
    <hr>
    <div class="container rounded">
      <div class="row">
        <div class="col-4 card px-0" v-for="article in userArticles" :key="article.id">
          <div class="flex-column">
            <div class="video-section">
              <div class="embed-responsive embed-responsive-1by1 rounded">
                <iframe class="embed-responsive-item" :src="`https://www.youtube.com/embed/${article.video_path}`" allowfullscreen></iframe>
              </div>
            </div>
            <div class="d-flex flex-column">
              <div>
                <router-link class="mr-2" :to="`/accounts/${article.user.id}`">{{ article.username }}</router-link>
                <i v-if="checkLike(article.like_users)" @click="clickLikeArticle(true, article.id)" class="fas fa-heart mr-2 like-btn liked"></i>
                <i v-else @click="clickLikeArticle(false, article.id)" class="far fa-heart mr-2 like-btn"></i>
              </div>
              <div>
                {{ article.content }}
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
export default {
  name: 'Profile',
  data() {
    return {
      userId: this.$route.params.user_id
    }
  },
  computed: {
    ...mapState(['myAccount', 'selectedUser', 'userArticles'])
  },
  methods: {
    ...mapActions(['selectUser', 'followUser', 'likeArticle', 'fetchUserArticles']),
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
      const data = {isArticleLike: isArticleLike, article_pk: article_pk, user_id: this.selectedUser.id, where: 'Profile'}
      this.likeArticle(data)
    },
  },
  created() {
    this.selectUser(this.userId)
    this.fetchUserArticles(this.userId)
  },
}
</script>