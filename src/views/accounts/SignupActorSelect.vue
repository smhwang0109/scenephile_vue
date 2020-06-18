<template>
  <div class="my-4">
    <div class="row d-flex justify-content-center">
      <h3 class="text-center mb-0">좋아하는 배우를 선택해주세요!</h3>
    </div>
    <hr>
    <div class="row customcard p-3 d-flex justify-content-around">
      <div @click="pushActor(actor)" class="col-2 px-0 mb-3 mr-1 profile-container" v-for="actor in actors.slice(0, 20)" :key="actor.id">
        <img class="img-fluid rounded-circle image" :src="`https://image.tmdb.org/t/p/w300_and_h300_bestv2/${actor.profile_path}`" :alt="`${actor.name} profile`">
        <div v-show="isChecked(actor)" class="overlay-default rounded-circle">
          <div class="text"><i class="fas fa-check"></i></div>
        </div>
        <div v-show="!isChecked(actor)" class="overlay rounded-circle">
          <div class="text">{{ actor.name }}</div>
        </div>
      </div>
      <div @click="sendLikeActor" :to="{ name:'ArticleList' }" class="col-12 d-flex justify-content-center pt-5">
        <div class="col-3 btn btn-primary">다 선택했어요!</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ActorSelect',
  data() {
    return {
      likeActors: [],

    }
  },
  computed: {
    ...mapState(['actors']),
  },
  methods: {
    ...mapActions(['signupFetchActors', 'likeActor']),
    pushActor(actor) {
      if (Object.values(this.likeActors).includes(actor)) {
        this.likeActors = this.likeActors.filter((element) => {
          return actor !== element
        })
      } else {
        this.likeActors.push(actor)
      }
      console.log(this.likeActors)
    },
    isChecked(actor) {
      if (Object.values(this.likeActors).includes(actor)) {
        return true
      } else {
        return false
      }
    },
    sendLikeActor() {
      console.log(this.likeActors)
      for (let actor of this.likeActors) {
        console.log(actor)
        console.log('됨')
        this.likeActor(actor.id)
        this.$router.push({name: 'ArticleList'})
      }
    }
  },
  created() {
    this.signupFetchActors('populars/')
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


.overlay-default {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0.8;
  background-color: #3e3f3f;
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
  transition: .2s ease;
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