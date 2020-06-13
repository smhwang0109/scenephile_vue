import Vue from 'vue'
import VueRouter from 'vue-router'
// import Test from '@/views/Test.vue'
import LoginView from '@/views/accounts/LoginView'
import LogoutView from '@/views/accounts/LogoutView'
import SignupView from '@/views/accounts/SignupView'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogoutView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
