import './assets/nullstyle.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import Home from './pages/HomeView.vue'
import Favorites from './pages/FavoritesView.vue'
import Orders from './pages/OrdersView.vue'

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/favorites', name: 'Favorites', component: Favorites },
	{ path: '/orders', name: 'Orders', component: Orders },
]
const router = createRouter({
	history: createWebHistory('/VueSneakers/'),
	routes,
})

const app = createApp(App)
app.use(autoAnimatePlugin)
app.use(router)
app.use(Toast)
app.mount('#app')
