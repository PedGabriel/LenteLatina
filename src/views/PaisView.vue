<script setup>
import { ref, computed, reactive, onMounted, getCurrentInstance, defineProps} from "vue";
import { useObraStore } from '@/stores/obra';
import { useCountryStore } from '@/stores/paises';
import CarrosselComponent from "@/components/CarrosselComponent.vue";
import { useRouter } from "vue-router";

const props = defineProps({
    iso: {  
        required: true,
    },
});

const router = useRouter();
const obraStore = useObraStore();
const countryStore = useCountryStore();

const instance = getCurrentInstance();
const lingua = reactive(instance.appContext.config.globalProperties.$lingua);

obraStore.setEstado({
  idGenero: null,
  isoPais: props.iso,
  paginaAtual: 1,
  sortBy: "popularity.desc"
});



onMounted(async () => {
    await countryStore.getAllCountrys(lingua.current)
    await obraStore.getFilmes(null, lingua.current, props.iso, "popularity.desc", 1)
    await obraStore.getSeries(null, lingua.current, props.iso, "popularity.desc", 1)
});

const paisInfo = computed(() => {
  return countryStore.countrys.find(c => c.iso_3166_1 === props.iso);
});

console.log(paisInfo.value)


function irParaObras (iso, tipo) {
    router.push({ name: 'ListaObras', params: {iso, tipo}})
}



</script>
<template>
    <section>
    <button
    class="voltar"
    @click="router.push({name:'paises'})"
    >  <span>‹</span>  Voltar</button>
    <div class="header">
        <img :src="paisInfo?.bandeira" alt="" class="flag">
        <h1>{{ paisInfo?.native_name }}</h1>
    </div>
    <div class="secao">
        <h2>Filmes mais populares:</h2>
        <CarrosselComponent :itens="obraStore.filmes" :tipo="'filmes'" />
    </div>
    <div class="secao">
        <h2>Séries mais populares:</h2>
        <CarrosselComponent :itens="obraStore.series" :tipo="'series'" />
    </div>
    <ul class="botoes">
        <li>
            <button @click="irParaObras(props.iso, 'filmes')">
                Ver todos os filmes
            </button>
        </li>
        <li>
            <button @click="irParaObras(props.iso, 'series')">
                Ver todas as séries
            </button>
        </li>
    </ul>
    </section>
</template>
<style scoped>
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

.secao {
  margin: 2rem 0;
}

.secao h2 {
  margin-bottom: 1rem;
}

.botoes {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
  list-style: none;
  padding: 0;
}

.botoes button {
  background: #0d1321;
  color: white;
  padding: 0.9rem 2.2rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 500;
}

.botoes button:hover {
  transform: translateY(-4px);
  transition: 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

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
</style>