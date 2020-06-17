<template>
  <div class="row d-flex justify-content-around">
    <h5 v-if="this.$route.path==='/articles'" class="col-12 my-3">{{ myAccount.username }} 님이 좋아하는 배우들만 모아뒀어요 :)</h5>
    <h5 v-else-if="this.$route.path==='/articles/popular'" class="col-12 my-3">{{ myAccount.username }} 님이 좋아할만한 현재 인기있는 배우들입니다 :)</h5>
    <h5 v-else class="col-12 my-3">{{ myAccount.username }} 님이 좋아하는 배우가 나오는 영화를 추천해드립니다 :)</h5>
    <router-link :to="{ name: 'ActorProfile', params: { actor_id: actor.id }}" class="col-2 px-0 m-1 profile-container" v-for="actor in actors.slice(0,10)" :key="actor.id">
      <img class="img-fluid rounded-circle image" :src="`https://image.tmdb.org/t/p/w300_and_h300_bestv2/${actor.profile_path}`" :alt="`${actor.name} profile`">
      <div class="overlay rounded-circle">
        <div class="text">{{ actor.name }}</div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ActorList',
  props: {
    selectList: String,
  },
  computed: {
    ...mapState(['actors', 'myAccount']),    
  },
  methods: {
    ...mapActions(['fetchActors', 'getMyAccount']),
  },
  created() {
    this.fetchActors(this.selectList)
    this.getMyAccount()
  }
}
</script>

<style scoped>
.profile-container {
  position: relative;
}

.profile-container:hover {
  cursor: pointer;
}

.image {
  display: block;
  width: 100%;
  height: auto;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: .5s ease;
  background-color: #3e3f3f;
}

.profile-container:hover .overlay {
  opacity: 0.8;
}

.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  width: 80%;
  font-weight: 50;
}
</style>