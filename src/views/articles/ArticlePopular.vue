<template>
  <div class="my-3">
    <div class="article-feed row justify-content-around">
      <div class="col-8">
        <ActorList class="customcard p-3 rounded" :selectList="selectFeed"/>
        <hr>
        <div class="row">
          <div class="col-12 card px-0" v-for="article in articles" :key="article.id">
            <div class="flex-column">
              <div class="justify-content-between py-2 customcard">
                <div class="d-flex flex-row justify-content-start">
                  <img class="img-fluid rounded-circle ml-1 border user-image" src="@/assets/anonymoususer.png" :alt="`${article.user.username} profile`">
                  <div class="d-flex justify-content-start align-items-center ml-2">
                    <router-link :to="`/accounts/${article.user.id }`"><span> {{ article.user.username }} | </span></router-link>
                    <span class="ml-2">{{ article.actor.name }}</span>
                  </div>
                </div>
                <div>
                  :
                </div>
              </div>
              <div class="video-section">
                <div class="embed-responsive embed-responsive-1by1">
                  <iframe class="embed-responsive-item" :src="`https://www.youtube.com/embed/${article.video_path}`" allowfullscreen></iframe>
                </div>
              </div>
              <div class="customcard d-flex flex-column">
                <div class="border-bottom pb-2">
                  <i v-if="checkLike(article.like_users)" @click="clickLikeArticle(true, article.id)" class="fas fa-heart mr-2 like-btn liked"></i>
                  <i v-else @click="clickLikeArticle(false, article.id)" class="far fa-heart mr-2 like-btn"></i>
                  <span>{{ article.like_users.length }}명이 좋아합니다.</span>
                </div>
                <div class="border-bottom mt-2 pb-2">
                  {{ article.content }}
                </div>
                <ul>
                  <i class="far fa-comments"></i>
                  <li v-for="comment in changeStringToObject(article.comments)" :key="comment.pk">                  
                    <router-link :to="`/accounts/${comment.fields.user}`">{{ comment.fields['username'] }}</router-link> {{ comment.fields['content'] }} 
                    <i v-if="myAccount.id === comment.fields.user" @click="deleteComment(article.id, comment.pk)" class="delete-btn far fa-trash-alt"></i>
                    <br>
                  </li>
                </ul>
                <hr>
                <div class="row">
                  <input @keypress.enter="createComment(article.id)" v-model="commentData.content" class="form-control offset-1 col-8 mr-2" type="text" placeholder="댓글 작성">
                  <button @click="createComment(article.id)" type="submit" class="mb-3 col-2 btn btn-outline-primary">게시</button>
                </div>
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
import { mapState, mapGetters, mapActions } from 'vuex'
import axios from 'axios'

import SERVER from '@/api/drf'
import ActorList from '@/components/ActorList'
import UserSearch from '@/components/UserSearch'

export default {
  name: 'ArticlePopular',
  data() {
    return {
      selectFeed: 'populars/',
      commentData: {
        content: null
      }
    }
  },
  components: {
    ActorList,
    UserSearch,
  },
  computed: {
    ...mapState(['myAccount', 'articles', 'isArticleLike']),
    ...mapGetters(['config'])     
  },
  methods: {
    ...mapActions(['fetchArticles', 'likeArticle']),
    checkLike(like_users) {
      if (Object.values(like_users).includes(this.myAccount.id)) {
        return true
      } else {
        return false
      }
    },
    clickLikeArticle(isArticleLike, article_pk) {
      const data = {isArticleLike: isArticleLike, article_pk: article_pk, selectFeed: this.selectFeed, where: 'ArticleList'}
      this.likeArticle(data)
    },
    changeStringToObject(S) {
      const O = JSON.parse(S);
      return O
    },
    createComment(article_id) {
      axios.post(SERVER.URL + SERVER.ROUTES.articleList + article_id + '/comments/', this.commentData , this.config)
        .then(() => {
          this.commentData.content = null
          this.fetchArticles(this.selectFeed)
        })
    },
    deleteComment(article_id, comment_pk) {
      axios.delete(SERVER.URL + SERVER.ROUTES.articleList + article_id + '/comments/' + comment_pk, null , this.config)
        .then(() => {
          this.fetchArticles(this.selectFeed)
        })
    }
  },
  created() {
    this.fetchArticles(this.selectFeed)
  }


  }
</script>

<style scoped>
li {
  list-style: none;
}

.like-btn, .delete-btn:hover {
  cursor: pointer;
}

.liked {
  color: red;
}

.border-bottom {
  border-bottom: 1px solid gainsboro;
}

</style>
