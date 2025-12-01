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
import FiltroComponent from "@/components/FiltroComponent.vue";


const props = defineProps({
  iso: {
    required: true,
  },
  tipo: {
    required: true,
  },
});

const isoRota = props.iso;

const countryStore = useCountryStore();
const router = useRouter();
const obraStore = useObraStore();
const generoStore = useGeneroStore();

const IDgeneroSelecionado = ref(null);
const pagina = ref(1);

obraStore.setEstado({
  idGenero: IDgeneroSelecionado.value,
  isoPais: props.iso,
  paginaAtual: pagina.value,
  sortBy: null
});

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
      IDgeneroSelecionado.value,
      lingua.current,
      props.iso,
      null,
      pagina.value
    );
  }
});

const paisInfo = computed(() => {
  return countryStore.countrys.find(c => c.iso_3166_1 === props.iso);
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
    obraStore.setEstado({
      idGenero: IDgeneroSelecionado.value,
      isoPais: props.iso,
      paginaAtual: pagina.value,
      sortBy: null
});
  } else {
    console.log("foi");
    await generoStore.getAllGeneros("tv", lingua.current);
    await obraStore.getSeries(
      IDgeneroSelecionado.value,
      lingua.current,
      props.iso,
      null,
      pagina.value
    );
    obraStore.setEstado({
      idGenero: IDgeneroSelecionado.value,
      isoPais: props.iso,
      paginaAtual: pagina.value,
      sortBy: null
    });
  }
}

watch(IDgeneroSelecionado, () => {
  update();
});

function abrirObra(id, tipo) {
  router.push({
    name: 'obras',
    params: { id, tipo },
    
  }
)
  
}
</script>
<template>
  <section>
  <button
    class="voltar"
    @click="router.push({ name: 'país', params: { isoRota } });"
    >  <span>‹</span>  Voltar</button>
    <div class="header">
        <img :src="paisInfo?.bandeira" alt="" class="flag">
        <h1>{{ paisInfo?.native_name }}</h1>
    </div>
    <div class="filtroETitulo">
      <h2>{{ tipoAtual }}</h2>
      <FiltroComponent
      :generos="generoStore.generos"
      @aplicar="IDgeneroSelecionado = $event"
      @limpar="IDgeneroSelecionado = null"
      />
    </div>
    <div v-if="props.tipo == 'filmes'">
    <ul>
      <li v-for="filme in obraStore.filmes" :key="filme.id">
        <img
        @click="abrirObra(filme.id, props.tipo)"
          :src="`https://image.tmdb.org/t/p/w500${filme.poster_path}`"
          :alt="filme.title"
        />
        <p>{{ filme.title}}</p>
      </li>
    </ul>
  </div>
  <div v-else>
    <ul>
      <li v-for="serie in obraStore.series" :key="serie.id">
        <img
        @click="abrirObra(serie.id, props.tipo)"

          :src="`https://image.tmdb.org/t/p/w500${serie.poster_path}`"
          :alt="serie.name"
        />
        <p>{{ serie.name }}</p>
      </li>
    </ul>
  </div>
  </section>
</template>
<style scoped>
button.voltar {
    background: none;
    border: none;
    color: #0D1321;
    font-size: 1.5rem;
    cursor: pointer;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    margin-bottom: 1rem;
}

button.voltar:hover {
    transform: scale(1.05);
    transition: 0.2s ease;
}

button span {
  font-size: 1.8rem;
  margin-right: 0.4rem;
  margin-bottom: 0.25vw;
}
section {
  margin: 3vw 6vw;
}

.header {
  display: flex;
  align-items: center;
  gap: 1vw;
  margin-bottom: 6vw;
}

.header .flag {
  width: 84px;
  height: 52px;
  object-fit: cover;
  border-radius: 4px;
  border: 1.5px solid #cfcfcf;
}
ul {
  margin: 4rem auto;
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  justify-items: center;
}

ul li {
  width: 100%;
  max-width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul li img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.25);
  cursor: pointer;
  transition: transform .2s;
}

ul li img:hover {
  transform: scale(1.03);
}

ul li p {
  margin-top: .6rem;
  text-align: center;
  font-size: 1rem;
}

.filtroETitulo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
