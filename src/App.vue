<script setup>
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

import {RouterView, useRoute} from 'vue-router'

const route = useRoute()

</script>
<template>

  <HeaderComponent />

  <main>
    <RouterView />
  </main>

  <FooterComponent/>

</template>