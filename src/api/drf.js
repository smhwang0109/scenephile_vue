export default {
  URL: 'http://localhost:8000',
  ROUTES: {
    // rest-auth
    signup: '/rest-auth/signup/',
    login: '/rest-auth/login/',
    logout: '/rest-auth/logout/',

    // accounts
    userSearch: '/accounts/search/',
    
    // actor
    actorList: '/actors/',

    // articles
    createArticle: '/articles/create/',
    articleList: '/articles/',
    articleCommentList: '/articles/:article_id/comments/',

    // movies
    movieList: '/movies/',
    
  }
}