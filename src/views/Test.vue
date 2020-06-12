<template>
  <div>
    <h1>Test Page</h1>
    <input v-model="actorName" type="text">
    <button @click="actor">버튼</button>
  </div>
</template>

<script>
import axios from 'axios'

const API_KEY = 'ead842d2812c5cea6902fe33bb171943'
export default {
  name: 'Test',
  data() {
    return {
      actorName: null,
      actorId: null,
      actorMovieList: null,
    }
  },
  methods: {
    actor() {
      // 우리 drf DB에 검색 요청 보냄(DB에 없으면 아래 로직 진행)
      axios.get(`https://api.themoviedb.org/3/search/person?query=${this.actorName}&api_key=${API_KEY}&language=ko-KR&page=1&include_adult=true`)
        .then(res => {
          this.actorId = res.data.results[0].id
          axios.get(`https://api.themoviedb.org/3/person/${this.actorId}?api_key=${API_KEY}&language=ko-KR`)
            .then(res => {
              console.log(res.data)
            })
          axios.get(`https://api.themoviedb.org/3/person/${this.actorId}/movie_credits?api_key=${API_KEY}&language=ko-KR`)
            .then(res => {
              console.log(res.data)
            })
        })
    }
  }
}
</script>

<style>

</style>