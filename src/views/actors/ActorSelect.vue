<template>
  <div class="my-3">
    <div class="actor-select row justify-content-around">
      <p>게시글을 작성할 배우를 골라주세요!</p>
      <div class="col-12">
        <div class="row">
          <router-link :to="{ name: 'ArticleCreate', params:{ actor_id: actor.id } }" class="col-2 px-0 mr-1 profile-container" v-for="actor in actors" :key="actor.id">
            <img class="img-fluid rounded-circle image" :src="`https://image.tmdb.org/t/p/w300_and_h300_bestv2/${actor.profile_path}`" :alt="`${actor.name} profile`">
            <div class="overlay rounded-circle">
              <div class="text">{{ actor.name }}</div>
            </div>
          </router-link>
        </div>
      </div>
      <UserSearch class="col-4" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import UserSearch from '@/components/UserSearch.vue'

export default {
  name: 'ActorSelect',
  components: {
    UserSearch
  },
  computed: {
    ...mapState(['actors']),    
  },
  methods: {
    ...mapActions(['fetchActors']),
  },
  created() {
    this.fetchActors('')
  },
}
</script>

<style>
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
  font-weight: bold;
}
</style>