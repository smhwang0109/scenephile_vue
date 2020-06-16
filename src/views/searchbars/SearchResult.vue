<template>
  <div class="my-3">
    <div class="article-feed row justify-content-around">
      <div class="col-8">
        <ActorSearch :keyword="keyword"/>
        <hr>
        <div class="row">
          <div class="col-12 card px-0" v-for="article in searchedArticles" :key="article.id">
            <div class="customcard flex-column">
              <div class="customcard justify-content-between py-2">
                <div>
                  {{ article.user.username }}
                </div>
                <div>
                  :
                </div>
              </div>
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
      </div>
      <UserSearch class="col-4" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import ActorSearch from '@/components/ActorSearch'
import UserSearch from '@/components/UserSearch'

export default {
  name: 'SearchResult',
  data() {
    return {
      keyword: this.$route.params.keyword
    }
  },
  components: {
    ActorSearch,
    UserSearch,
  },
  computed: {
    ...mapState(['searchedArticles']),    
  },
  methods: {
    ...mapActions(['searchArticles']),
    changeStringToObject(S) {
      const O = JSON.parse(S);
      return O
    },
    setKeyword() {
      this.keyword = this.$route.params.keyword
    }
  },
  created() {
    this.searchArticles(this.keyword)
  },
  updated() {
    this.setKeyword()
    this.searchArticles(this.keyword)
  }

}
</script>

<style>

</style>