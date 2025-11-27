<script setup>
import { ref, computed, reactive, onMounted, watch, getCurrentInstance, defineProps} from "vue";
import { useObraStore } from '@/stores/obra';
import { useCountryStore } from '@/stores/paises';
import { useGeneroStore } from '@/stores/genero';
import CarrosselComponent from "@/components/CarrosselComponent.vue";

const props = defineProps({
    iso: {  
        required: true,
    },
});


const obraStore = useObraStore();
const countryStore = useCountryStore();
const generoStore = useGeneroStore();

const tipoGenero = ref("movie");



const genero = ref(null);
const pais = ref(null);

const instance = getCurrentInstance();
const lingua = reactive(instance.appContext.config.globalProperties.$lingua);

onMounted(async () => {
    await countryStore.getAllCountrys(lingua.current)
    await obraStore.getFilmes(null, lingua.current, props.iso, "popularity.desc")
    await obraStore.getSeries(null, lingua.current, props.iso, "popularity.desc")
});

const paisAtual = computed(() => {
    return countryStore.getCountryNameById(props.iso);
});

</script>
<template>
    <h1>{{ paisAtual  }}</h1>
    <h2>Filmes mais populares:</h2>
    <CarrosselComponent
    :itens = "obraStore.filmes"
    />
    <h2>Séries mais populares:</h2>
    <CarrosselComponent
    :itens = "obraStore.series"
    />
</template>
<style scoped>
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
</style>