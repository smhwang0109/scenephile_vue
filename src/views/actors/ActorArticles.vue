<template>
  <div class="row">
    <div class="col-4 card px-0" v-for="article in actorArticles" :key="article.id">
      <div class="customcard flex-column">
        <div class="customcard video-section">
          <div class="embed-responsive embed-responsive-1by1">
            <iframe class="embed-responsive-item" :src="`https://www.youtube.com/embed/${article.video_path}`" allowfullscreen></iframe>
          </div>
        </div>
        <div class="customcard d-flex flex-column">
          <div>
            <i class="far fa-heart mr-2"></i>
            <i class="far fa-comments"></i>
          </div>
          <div>
            {{ article.content }}
          </div>
          <ul>
            <li v-for="comment in changeStringToObject(article.comments)" :key="comment.pk">                  
              {{ comment.fields['content'] }}
              <br>
            </li>
          </ul>
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
    ...mapState(['actorArticles'])
  },
  methods: {
    ...mapActions(['fetchActorArticles']),
    changeStringToObject(S) {
      const O = JSON.parse(S);
      return O
    },
  },
  created() {
    this.fetchActorArticles(this.$route.params.actor_id)
  }
}
</script>

<style>

</style>