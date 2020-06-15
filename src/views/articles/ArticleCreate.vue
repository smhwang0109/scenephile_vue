<template>
  <div>
    <h1>게시글 작성</h1>
    <div>
      <label for="title">title:</label>
      <input v-model="articleData.title" id="title" type="text" />
    </div>
    <div>
      <label for="content">content:</label>
      <textarea v-model="articleData.content" id="content" cols="30" rows="10"></textarea>
    </div>
    <div>
      <button @click="createArticle(articleData)">Submit!</button>
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
        title: null,
        content: null,
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