<template>
  <div class="my-3">
    <div class="article-feed row justify-content-around">
      <div class="col-8">
        <div class="customcard">
          <div class="row">
            <img class="img-fluid rounded-circle ml-2 col-2" :src="`https://image.tmdb.org/t/p/w300_and_h300_bestv2/${actor.profile_path}`" :alt="`${actor.name} profile`">
            <div class="d-flex justify-content-start align-items-center">
              <span>{{ actor.name }}</span>
            </div>
          </div>
        </div>
        <div class="customcard d-flex flex-column">
          <div v-if="articleData.video_path" class="video-section">
            <div class="embed-responsive embed-responsive-1by1 p-0">
              <iframe class="embed-responsive-item" :src="`https://www.youtube.com/embed/${articleData.video_path.slice(32,)}`" allowfullscreen></iframe>
            </div>
          </div>
          <div class="my-1">
            <label for="video_path">Video URL:</label>
            <input class="form-control" v-model="articleData.video_path" id="video_path" type="text" />
          </div>
          <div class="my-1">
            <label for="content">Content:</label>
            <textarea class="form-control" v-model="articleData.content" id="content" cols="30" rows="10"></textarea>
          </div>
          <div class="d-flex justify-content-end my-1">
            <button type="submit" class="btn btn-primary" @click="createArticle(articleData)">게시하기</button>
          </div>
        </div>
      </div>
      <div class="col-4 search-bar">
        <input v-model="inputValue" @keypress.enter="fetchVideos" class="w-100 customcard" placeholder="영상을 검색해보세요">
        <hr>
        <div @click="setVideoPath(video)" class="select-video d-flex border p-2" v-for="video in videos" :key="video.etag">
          <div class="col-6 embed-responsive embed-responsive-16by9 customcard">
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

const API_KEY = 'AIzaSyB5YPuqlraidrM-9Eh42CJ6jTR-rWQmwXQ'
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