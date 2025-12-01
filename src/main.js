import './assets/reset.css';

import './assets/main.css';

import { createApp, reactive } from 'vue';

import { createPinia } from 'pinia';

import App from './App.vue';

import router from './router';

import './assets/main.css';

import '@mdi/font/css/materialdesignicons.css';

import fallBackImg from './directives/fallBackImg.js';
import fallBackProfile from './directives/fallBackProfile.js';

const app = createApp(App);
const pinia = createPinia();


const linguaEstado = reactive({
    current: localStorage.getItem('lingua') || 'pt-BR'
})

app.config.globalProperties.$lingua = linguaEstado;

app.directive('fallback-img', fallBackImg)
app.directive('fallback-profile', fallBackProfile)

app.use(router);
app.use(pinia);

app.mount('#app');