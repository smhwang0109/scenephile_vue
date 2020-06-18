<template>
  <div v-if="selectedActor">
    <div class="actor-profile row justify-content-around customcard">
      <div class="col-3">
        <img v-if="selectedActor.profile_path" class="img-fluid rounded-circle p-3" :src="`https://image.tmdb.org/t/p/w300_and_h300_bestv2/${selectedActor.profile_path}`" :alt="`${selectedActor.name} profile`">
        <img v-else class="img-fluid rounded-circle image" :src="`http://placehold.jp/300x300.png?text=${selectedActor.name}`" :alt="`${selectedActor.name} profile`">
      </div>
      <div class="col-9 p-3 pr-5">
        <div class="d-flex justify-content-between align-items-center">
          <h1 class="m-0">{{ selectedActor.name }}</h1>
          <h3 class="d-flex align-items-center">
            <i v-if="selectedActor.is_like" @click="clickLike" class="fas fa-heart mr-2 like-btn liked"></i>
            <i v-else @click="clickLike" class="far fa-heart mr-2 like-btn"></i>
            <span class="badge badge-pill badge-warning">{{ selectedActor.like_users.length }}</span>
          </h3>
        </div>
        <hr>
        <h5 v-if="selectedActor.birthday">
          생년월일 : {{ selectedActor.birthday.slice(0,4) }}년 {{ selectedActor.birthday.slice(5,7) }}월 {{ selectedActor.birthday.slice(8,10) }}일
        </h5>
        <h5 class="mt-5 d-inline-block mr-3">
          {{ selectedActor.name }} 배우님을 좋아하는 마음을 표현해주세요!
        </h5>
        <button @click="toArticleCreate(selectedActor.id)" class="btn btn-primary">게시물 작성</button>
      </div>
    </div>
    <div class="d-flex justify-content-center my-3">
      <div type="button" @click="toggleButton_movies(actor_id)" class="col-5 text-center btn mx-3" :class="{'btn-secondary': !isMovie, 'btn-primary': isMovie}" :to="{ name: 'ActorMovies', params: {actor_id: actor_id}}">
        출연작
      </div>
      <div type="button" @click="toggleButton_articles(actor_id)" class="col-5 text-center btn mx-3" :class="{'btn-secondary': !isArticle, 'btn-primary': isArticle}" :to="{ name: 'ActorArticles', params: {actor_id: actor_id}}">
        게시물
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ActorProfile',
  data() {
    return {
      actor_id: this.$route.params.actor_id,
      isMovie: false,
      isArticle: false,
    }
  },
  computed: {
    ...mapState(['selectedActor'])
  },
  methods: {
    ...mapActions(['selectActor', 'likeActor']),
    toArticleCreate(actor_id) {
      this.$router.push({ name: 'ArticleCreate', params:{ actor_id: actor_id, actor: this.selectedActor }})
    },
    toggleButton_movies(actor_id) {
      this.isArticle = false
      this.isMovie = true
      this.$router.push({ name: 'ActorMovies', params: {actor_id: actor_id}})
    },
    toggleButton_articles(actor_id) {
      this.isArticle = true
      this.isMovie = false
      this.$router.push({ name: 'ActorArticles', params: {actor_id: actor_id}})
    },
    clickLike() {
      this.likeActor(this.selectedActor.id)
      if (this.selectedActor.is_like) {
        this.selectedActor.like_users.length = this.selectedActor.like_users.length - 1
      } else {
        this.selectedActor.like_users.length = this.selectedActor.like_users.length + 1
      }
      this.selectedActor.is_like = !this.selectedActor.is_like
    },
  },
  created() {
    this.selectActor(this.actor_id)
  },
}
</script>

<style>
.like-btn:hover {
  cursor: pointer;
}

.liked {
  color: red;
}

.btn-primary {
  background-color: #F6AF86;
  border-color: #F6AF86;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}

.btn-primary:hover {
    color: #fff;
    background-color: #f5a273;
    border-color: #F6AF86;
}

.btn-primary:not(:disabled):not(.disabled).active:focus, .btn-primary:not(:disabled):not(.disabled):active:focus, .show>.btn-primary.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem #f5c4a8;
}

.btn-primary:not(:disabled):not(.disabled).active, .btn-primary:not(:disabled):not(.disabled):active, .show>.btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #f5c4a8;
    border-color: #f5c4a8;
}

.btn-primary.focus, .btn-primary:focus {
    color: #fff;
    background-color: #f5c4a8;
    border-color: #f5c4a8;
    box-shadow: 0 0 0 0.2rem #f5c4a8;
}

</style>