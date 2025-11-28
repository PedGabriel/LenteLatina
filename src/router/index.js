import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PaisesView from '@/views/PaisesView.vue';
import Textes from '@/utils/textes.vue';
import PaisView from '@/views/PaisView.vue';
import ListagemObrasView from '@/views/ListagemObrasView.vue';
import ObraView from '@/views/ObraView.vue';

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
    {
      path: '/pais/:iso',
      name: 'país',
      component: PaisView,
      props: true,
    },
    {
      path: '/pais/:iso/:tipo',
      name: 'ListaObras',
      component: ListagemObrasView,
      props: true, 
    },
    {
      path: '/obra/:tipo/:id',
      name: 'obras',
      component: ObraView,
      props: true,
    }
  ]
});
export default router;