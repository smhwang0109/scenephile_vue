<template>
  <div>
    <h1>게시글 작성</h1>
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
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "ArticleCreate",
  data() {
    return {
      articleData: {
        content: null,
        actorId: this.$route.params.actor_id,
        video_path: null
      }
    };
  },
  methods: {
    ...mapActions(['createArticle'])
  },
};
</script>

<style>
</style>