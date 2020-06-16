export default {
  URL: 'http://localhost:8000',
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
    
    // actor
    actorList: '/actors/',
    actorPopularList: '/actors/populars/',

    // articles
    articleList: '/articles/',
    articlePopularList: '/articles/populars/',
    articleSearch: '/articles/search/',

    // movies
    movieList: '/movies/',    
  }
}