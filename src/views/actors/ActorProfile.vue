<template>
  <div class="my-3 flex-row">
    <div class="actor-profile row justify-content-around">
      <div class="offset-1 col-3 px-0 profile-container">
        <img class="img-fluid rounded-circle" :src="`https://image.tmdb.org/t/p/w300_and_h300_bestv2/${actor.profile_path}`" :alt="`${actor.name} profile`">
      </div>
      <div class="col-8">
        <p>{{ actor.name }}</p>
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
    ...mapState(['selectedActor'])
  },
  methods: {
    ...mapActions(['selectActor']),
    checkActor() {
      if (!this.actor) {
        this.selectActor(this.$route.params.actor_id)
          .then(() => {
            setTimeout(() => {
              console.log(this.selectedActor)
              this.actor = this.selectedActor
            }, 1000)
          })
      }
    }
  },
  created() {
    this.checkActor()
  }

}
</script>

<style>

</style>