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
  justify-content: center;
  margin: 0 auto;
  gap: 0.5rem;
  width: 80%;
}


.seta {
  background: none;
  border: none;
  font-size: 4rem;
  cursor: pointer;
  transition: transform 0.25s ease, color 0.25s ease;
  color: #0D1321;
}


.seta:hover {
  transform: scale(1.2);
  color: #1f2a45;
}

.carrossel {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 1rem 0;
  scroll-behavior: smooth;
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);

}

li {
  min-width: 15rem;
  margin: 0 0.5vw 0 0.5vw;
  background-color: #F5F8B3;
  padding: 1vw 1vw 0.1vw 1vw;
  border-radius: 15px;
  box-shadow: 
    0 10px 20px rgba(0, 0, 0, 0.45),
    0 4px 5px rgba(0, 0, 0, 0.35);
 transition: transform 0.25s ease, box-shadow 0.25s ease;
}
li:hover {
  transform: scale(1.05);
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 0.55),
    0 6px 15px rgba(0, 0, 0, 0.45);
}

img {
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 15px;
    box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.45),
    0 4px 10px rgba(0, 0, 0, 0.35);
  
}
p{
  padding-top: 0.5vw;
   font-family: "Fjalla One", sans-serif;
   
}
</style>
