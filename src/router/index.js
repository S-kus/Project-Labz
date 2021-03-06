import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreateProjectlist from '../views/projectlists/CreateProjectlist.vue'
import ProjectlistDetails from '../views/projectlists/ProjectlistDetails.vue'
import UserProjectlists from '../views/projectlists/UserProjectlists.vue'

// route guard
import { projectAuth } from '../firebase/config';

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/projectlists/create',
    name: 'CreateProjectlist',
    component: CreateProjectlist,
    beforeEnter: requireAuth
  },
  {
    path: '/projectlists/:id',
    name: 'ProjectlistDetails',
    component: ProjectlistDetails,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: '/projectlists/user',
    name: 'UserProjectlists',
    component: UserProjectlists,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
