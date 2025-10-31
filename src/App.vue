<script setup>
import HeaderComponent from './components/header.vue'
//import FooterComponent from './components/footer.vue'

import {RouterView, useRoute} from 'vue-router'

const route = useRoute()
</script>
<template>
  <HeaderComponent />
  <!--<FooterComponent/> -->
</template>