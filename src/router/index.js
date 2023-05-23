import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StoreView from '../views/StoreView.vue'
import CartView from '../views/CartView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/store',
      name: "movie",
      component: StoreView
    },
    {
      path: '/login',
      name: "login",
      component: LoginView
    },
    {
      path: '/cart',
      name: "cart",
      component: CartView
    }
  ]
})

export default router
