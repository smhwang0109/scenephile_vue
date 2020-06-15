<template>
  <div class="my-4 flex-row">
    <div class="actor-profile row justify-content-around">
      <div class="offset-1 col-3 px-0 profile-container">
        <img class="img-fluid rounded-circle" :src="`https://image.tmdb.org/t/p/w300_and_h300_bestv2/${actor.profile_path}`" :alt="`${actor.name} profile`">
      </div>
      <div class="offset-1 col-7">
        <div class="name">
          <p>{{ actor.name }}</p>
          <p>
            생년월일 : {{ actor.birthday.slice(0,4) }}년 {{ actor.birthday.slice(5,7) }}월 {{ actor.birthday.slice(8,10) }}일
          </p>
        </div>
        <div class="like-btn" @click="likeActor(actor.id)">
          <i v-show="actorLike.like_count" class="far fa-heart mr-2"></i>{{ actorLike.like_count }} 개
        </div>
      </div>
      <div class="col-12 d-flex justify-content-center mt-3">
        <router-link class="col-2 text-center" :to="{ name: 'ActorMovies', params: {actor_id: actor.id}}">
          출연작
        </router-link>
        <router-link class="col-2 text-center" :to="{ name: 'ActorArticles', params: {actor_id: actor.id}}">
          게시물
        </router-link>
      </div>
      <div class="col-12">
        <router-view></router-view>
      </div>


        
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ActorProfile',
  data() {
    return {
      actor: this.$route.params.actor
    }
  },
  computed: {
    ...mapState(['selectedActor', 'actorLike'])
  },
  methods: {
    ...mapActions(['selectActor', 'likeActor', 'getLikeActorData']),
    checkActor() {
      if (!this.actor) {
        this.selectActor(this.$route.params.actor_id)
          .then(() => {
            setTimeout(() => {
              this.actor = this.selectedActor
            }, 1000)
          })
      }
    }
  },
  created() {
    this.checkActor()
    this.getLikeActorData(this.$route.params.actor_id)
  }

}
</script>

<style>
.like-btn:hover {
  cursor: pointer;
}

</style>