<template>
  <div class="my-3">
    <div class="article-feed row justify-content-around">
      <div class="col-8">
        <div class="customcard row">
          <img class="img-fluid rounded-circle image offset-1 col-3 py-2" :src="`https://image.tmdb.org/t/p/w300_and_h300_bestv2/${actor.profile_path}`" :alt="`${actor.name} profile`">
          <h1 class="col-8 d-flex justify-content-center align-items-center">게시물 작성 - {{ actor.name }}</h1>
        </div>
        <hr>
        <div class="customcard">
          <div class="video-section">
            <div class="embed-responsive embed-responsive-1by1">
              <iframe class="embed-responsive-item" src="" allowfullscreen></iframe>
              hi
            </div>
          </div>
          <div>
            <label for="video_path">영상 URL:</label>
            <input v-model="articleData.video_path" id="video_path" type="text" />
          </div>
          <div>
            <label for="content">content:</label>
            <textarea v-model="articleData.content" id="content" cols="30" rows="10"></textarea>
          </div>
          <div>
            <button @click="createArticle(articleData)">게시글 작성</button>
          </div>
        </div>
      </div>
      <div class="col-4 search-bar">
        <input v-model="inputValue" @keypress.enter="fetchVideos" placeholder="Youtube 검색">
          <div @click="setVideoPath(video)" class="select-video d-flex border p-2" v-for="video in videos" :key="video.etag">
            <div class="col-6 embed-responsive embed-responsive-16by9">
              <iframe class="embed-responsive-item" :src="`https://www.youtube.com/embed/${video.id.videoId}`" allowfullscreen></iframe>
            </div>
            <div class="col-6">
              <p>{{ video.snippet.title }}</p>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

const API_KEY = 'AIzaSyD_vgPjSNKmP7Ap1R6eP-5Ek1dvWjbiBrY'
const API_URL = 'https://www.googleapis.com/youtube/v3/search'

export default {
  name: "ArticleCreate",
  data() {
    return {
      articleData: {
        content: null,
        actorId: this.$route.params.actor_id,
        video_path: null
      },
      inputValue: '',
      videos: [],
      selectedVideo: null,
      actor: this.$route.params.actor      
    }
  },
  methods: {
    ...mapActions(['createArticle', 'fetchVideos']),
    fetchVideos() {
      axios.get(API_URL, {
        params: {
          key: API_KEY,
          part: 'snippet',
          type: 'video',
          q: this.inputValue,
          maxResults: 5
        }
      })
        .then(res => {
          res.data.items.forEach(item => {
            const parser = new DOMParser()
            const doc = parser.parseFromString(item.snippet.title, 'text/html')
            item.snippet.title = doc.body.innerText
          })
          this.videos = res.data.items
        })
    },
    setVideoPath(video) {
      this.articleData.video_path = `https://www.youtube.com/watch?v=${video.id.videoId}`
    }
  },
};
</script>

<style scoped>
.select-video:hover {
  cursor: pointer;
}
</style>