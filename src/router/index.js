import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PaisesView from '@/views/PaisesView.vue';
import SobreView from '@/views/SobreView.vue';
import Textes from '@/utils/textes.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test',
      name: 'teste',
      component: Textes,
    },
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
  ]
});
export default router;