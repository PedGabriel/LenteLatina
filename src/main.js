import './assets/reset.css';

import './assets/main.css';

import { createApp } from 'vue';

import { createPinia } from 'pinia';

import App from './App.vue';

import router from './router';

import './assets/main.css';

import '@mdi/font/css/materialdesignicons.css';

const app = createApp(App);
const pinia = createPinia();

app.use(router);
app.use(pinia);

app.mount('#app');