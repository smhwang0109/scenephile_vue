<template>
  <div v-if="selectedActor">
    <div class="actor-profile row justify-content-around customcard">
      <div class="col-3">
        <img class="img-fluid rounded-circle p-3" :src="`https://image.tmdb.org/t/p/w300_and_h300_bestv2/${selectedActor.profile_path}`" :alt="`${selectedActor.name} profile`">
      </div>
      <div class="col-9 p-3 pr-5">
        <div class="d-flex justify-content-between">
          <h1>{{ selectedActor.name }}</h1>
          <h2>
            <i v-if="selectedActor.is_like" @click="clickLike" class="fas fa-heart mr-2 like-btn liked"></i>
            <i v-else @click="clickLike" class="far fa-heart mr-2 like-btn"></i>
            <span class="badge badge-pill badge-danger">{{ selectedActor.like_count }}</span>
          </h2>
        </div>
        <hr>
        <h5>
          생년월일 : {{ selectedActor.birthday.slice(0,4) }}년 {{ selectedActor.birthday.slice(5,7) }}월 {{ selectedActor.birthday.slice(8,10) }}일
        </h5>
      </div>
    </div>
    <div class="d-flex justify-content-center my-3">
      <router-link type="button" @click="selectRM" id="related_movies" class="col-5 text-center btn btn-secondary mx-3" :to="{ name: 'ActorMovies', params: {actor_id: actor_id}}">
        출연작
      </router-link>
      <router-link type="button" @click="selectRA" id="related_articles" class="col-5 text-center btn btn-secondary mx-3" :to="{ name: 'ActorArticles', params: {actor_id: actor_id}}">
        게시물
      </router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

const RM = document.querySelector('#related_movies')
const RA = document.querySelector('#related_articles')

export default {
  name: 'ActorProfile',
  data() {
    return {
      actor_id: this.$route.params.actor_id
    }
  },
  computed: {
    ...mapState(['selectedActor'])
  },
  methods: {
    ...mapActions(['selectActor', 'likeActor']),
    clickLike() {
      this.likeActor(this.selectedActor.id)
      this.selectedActor.is_like = !this.selectedActor.is_like
    },
    selectRM() {
      RM.classList.remove('btn-secondary')
      RM.classList.add('btn-primary')
      RA.classList.remove('btn-primary')
      RA.classList.add('btn-secondary')
    },
    selectRA() {
      RA.classList.remove('btn-secondary')
      RA.classList.add('btn-primary')
      RM.classList.remove('btn-primary')
      RM.classList.add('btn-secondary')
    }
  },
  created() {
    this.selectActor(this.actor_id)
  }
}
</script>

<style>
.like-btn:hover {
  cursor: pointer;
}

.liked {
  color: red;
}

</style>