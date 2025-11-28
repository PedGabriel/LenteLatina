<script setup>
import {
  ref,
  computed,
  reactive,
  onMounted,
  watch,
  getCurrentInstance,
  defineProps,
} from "vue";
import { useObraStore } from "@/stores/obra";
import { useGeneroStore } from "@/stores/genero";
import { useCountryStore } from "@/stores/paises";
import { useRouter } from "vue-router";

const props = defineProps({
  iso: {
    required: true,
  },
  tipo: {
    required: true,
  },
});

const countryStore = useCountryStore();
const router = useRouter();
const obraStore = useObraStore();
const generoStore = useGeneroStore();

const IDgeneroSelecionado = ref(null);
const pagina = ref(1);

const instance = getCurrentInstance();
const lingua = reactive(instance.appContext.config.globalProperties.$lingua);

onMounted(async () => {
  await countryStore.getAllCountrys(lingua.current);
  if (props.tipo == "filmes") {
    await generoStore.getAllGeneros("movie", lingua.current);
    await obraStore.getFilmes(
      IDgeneroSelecionado.value,
      lingua.current,
      props.iso,
      null,
      pagina.value
    );
  } else {
    await generoStore.getAllGeneros("tv", lingua.current);
    await obraStore.getSeries(
      IDgeneroSelecionado,
      lingua.current,
      props.iso,
      null,
      pagina.value
    );
  }
});

const paisAtual = computed(() => {
  return countryStore.getCountryNameById(props.iso);
});

let tipoAtual = "";

if (props.tipo == "filmes") {
  tipoAtual = "Filmes:";
} else {
  tipoAtual = "Séries:";
}

async function update() {
  if (props.tipo == "filmes") {
    await generoStore.getAllGeneros("movie", lingua.current);
    await obraStore.getFilmes(
      IDgeneroSelecionado.value,
      lingua.current,
      props.iso,
      null,
      pagina.value
    );
    console.log("foi");
  } else {
    await generoStore.getAllGeneros("tv", lingua.current);
    await obraStore.getSeries(
      IDgeneroSelecionado.value,
      lingua.current,
      props.iso,
      null,
      pagina.value
    );
  }
}

watch(IDgeneroSelecionado, () => {
  update();
});

console.log("FILMES:", obraStore.filmes);
</script>
<template>
  <h1>{{ paisAtual }}</h1>
  <h2>{{ tipoAtual }}</h2>
  <!--filtro-->
  <div v-if="props.tipo == 'filmes'">
    <ul>
      <li v-for="filme in obraStore.filmes" :key="filme.id">
        <img
          :src="`https://image.tmdb.org/t/p/w500${filme.poster_path}`"
          :alt="filme.title"
        />
        <p>{{ filme.title }}</p>
      </li>
    </ul>
  </div>
  <div v-else>
    <ul>
      <li v-for="serie in obraStore.series" :key="serie.id">
        <img
          :src="`https://image.tmdb.org/t/p/w500${serie.poster_path}`"
          :alt="serie.name"
        />
        <p>{{ serie.name }}</p>
      </li>
    </ul>
  </div>
</template>
<style scoped>
ul {
margin: 10vw;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, auto);
  gap: 1rem;
}
ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1vw;
}
ul li img {
  width: 100%;
  height: 800px;
  object-fit: cover;
}
</style>
