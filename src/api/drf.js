export default {
  URL: 'https://fanplace.herokuapp.com',
  // URL: 'http://localhost:8000',git
  ROUTES: {
    // rest-auth
    signup: '/rest-auth/signup/',
    login: '/rest-auth/login/',
    logout: '/rest-auth/logout/',

    // accounts
    myAccount: '/accounts/myaccount/',
    profile: '/accounts/',
    userSearch: '/accounts/search/',
    follow: '/accounts/follow/',
    userArticle: '/articles/users/',
    
    // actor
    actorList: '/actors/',
    actorPopularList: '/actors/populars/',
    actorArticle: '/articles/actors/',

    // articles
    articleList: '/articles/',
    articlePopularList: '/articles/populars/',
    articleSearch: '/articles/search/',

    // movies
    movieList: '/movies/',    
  }
}