import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalizedGeneric,
  type RouteLocationNormalizedLoadedGeneric,
} from 'vue-router'
import { authClient } from './auth-client.ts'

export type To = RouteLocationNormalizedGeneric
export type From = RouteLocationNormalizedLoadedGeneric

const routes = [
  { path: '/', component: () => import('../views/HomeView.vue') },
  { path: '/auth/login', component: () => import('../features/auth/views/AuthLogin.vue') },
  { path: '/auth/register', component: () => import('../features/auth/views/AuthRegister.vue') },
  {
    path: '/dashboard',
    component: () => import('../features/dashboard/DashboardView.vue'),
    beforeEnter: (to: To, from: From) => isAuth(to, from),
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'Backrooms',
  //   component: () => import('../views/BackroomsView.vue'),
  // },
]

async function isAuth(to: To, _from: From) {
  const { data } = await authClient.getSession()
  if (!data?.session && to.name !== 'Login') {
    return '/auth/login'
  }
}

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
