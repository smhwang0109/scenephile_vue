<template>
  <div class="d-flex flex-row">
    <div class="col-7">
      <ActorList/>
      <ul class="m-0 p-0">
        <li v-for="article in articles" :key="`article_${article.id}`">
          <div class="container customcard flex-column">
            <div class="customcard justify-content-between py-2">
              <div>
                {{ article.user.username }}
              </div>
              <div>
                :
              </div>
            </div>
            <div class="customcard video-section">
              {{ article.video_path}}
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
                <li v-for="comment in changeStringToObject(article.comments)" :key="`comment_${comment.pk}`">                  
                  {{ comment.fields['content'] }}
                  <br>
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="col-5">
      <UserSearch/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import ActorList from '@/components/ActorList'
import UserSearch from '@/components/UserSearch'

export default {
  name: 'ArticleList',
  components: {
    ActorList,
    UserSearch,
  },
  computed: {
    ...mapState(['articles']),    
  },
  methods: {
    ...mapActions(['fetchArticles']),
    changeStringToObject(S) {
      const O = JSON.parse(S);
      return O
    }
  },
  created() {
    this.fetchArticles()
  }


  }
</script>

<style scoped>
.customcard {
  position: relative;
  display: flex;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0,0,0,.125);
  /* border-radius: .25rem; */
  padding: 0.5rem;
}

li {
  list-style: none;
}

.video-section {
  height: 300px;
}

</style>