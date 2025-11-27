<script setup>
import { ref } from "vue";

const props = defineProps({
  itens: { type: Array, required: true },
});

const caixa = ref(null);

function scrollLeft() {
  caixa.value.scrollBy({ left: -300, behavior: "smooth" });
}

function scrollRight() {
  caixa.value.scrollBy({ left: 300, behavior: "smooth" });
}
</script>

<template>
    <div class="tudo">
    <button class="seta" @click="scrollLeft">‹</button>

    <ul class="carrossel" ref="caixa">
      <li v-for="item in itens" :key="item.id">
        <img
          :src="`https://image.tmdb.org/t/p/w500${item.poster_path}`"
          :alt="item.title || item.name"
        >
        <p>{{ item.title || item.name }}</p>
      </li>
    </ul>

    <button class="seta" @click="scrollRight">›</button>
  </div>
</template>

<style scoped>
.tudo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.seta {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}

.carrossel {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 1rem 0;
  scroll-behavior: smooth;
}

li {
  min-width: 15rem;
  list-style: none;
}

img {
  width: 100%;
  height: 20rem;
  object-fit: cover;
}
</style>
