<script setup>
import { ref, computed, reactive, onMounted, watch, getCurrentInstance, defineProps} from "vue";
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

onMounted(async () => {
    await countryStore.getAllCountrys(lingua.current)
    await obraStore.getFilmes(null, lingua.current, props.iso, "popularity.desc", 1)
    await obraStore.getSeries(null, lingua.current, props.iso, "popularity.desc", 1)
});

const paisAtual = computed(() => {
    return countryStore.getCountryNameById(props.iso);
});


function irParaObras (iso, tipo) {
    router.push({ name: 'ListaObras', params: {iso, tipo}})
}

</script>
<template>
    <section>
    <button
    @click="router.push({name:'paises'})"
    >  <span>‹</span>  Voltar</button>
    <h1>{{ paisAtual  }}</h1>
    <h2>Filmes mais populares:</h2>
    <CarrosselComponent
    :itens = "obraStore.filmes"
    />
    <h2>Séries mais populares:</h2>
    <CarrosselComponent
    :itens = "obraStore.series"
    />
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
ul.botoes {
    display: flex;
    justify-content: space-between;
}
section {
    margin: 5vw;
}
ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    padding: 0;
    margin: 0 10vw;
}
ul li {
    width: 15rem;
    height: 30rem;
}
img {
  width: 100%;
  height: 20rem;
    object-fit: cover;
}
button {
    font-size: 1.5rem;
}
button span {
    font-size: 2rem;
}
</style>