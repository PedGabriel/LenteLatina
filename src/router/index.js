import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PaisesView from '@/views/PaisesView.vue';
import SobreView from '@/views/SobreView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/paises',
      name: 'paises',
      component: PaisesView,
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: SobreView,
    },
  ]
});
export default router;