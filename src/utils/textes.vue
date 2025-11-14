<script setup>
import { ref, onMounted, watch, getCurrentInstance } from 'vue';
import { useCountryStore } from '@/stores/paises';
import { useGeneroStore } from '@/stores/genero';
import { useObraStore } from '@/stores/obra';

const countryStore = useCountryStore();
const generoStore = useGeneroStore();
const obraStore = useObraStore();

const tipoGenero = ref('movie');
const genero = ref(null);
const pais = ref(null);

const instance = getCurrentInstance();
const lingua = instance.appContext.config.globalProperties.$lingua;
console.log('Lingua em textos.vue:', lingua.current);


onMounted(async () => {
    await countryStore.getAllCountrys();
    await generoStore.getAllGeneros(tipoGenero.value, lingua.current);
});


watch([genero, pais, tipoGenero], async () => {
    if (!genero.value || !pais.value) return;

    if (tipoGenero.value === 'movie') {
        await obraStore.getFilmes(genero.value, lingua.current, pais.value);
    } else {
        await obraStore.getSeries(genero.value, lingua.current, pais.value);
    }
});
</script>
<template>
    <section>
    <div>
    <h3>Países latinos:</h3>
    <ul>
        <li
        class="clicavel"
        v-for="country in countryStore.latinCountries"
        :key="country.id"
        @click="pais.value = country.iso_3166_1"
        >
        {{ country.native_name }}
        </li>
    </ul>
    </div>
    <div>
    <h3>Gêneros:</h3>
    <div>
    <label for="tipoGenero">Tipo de Gênero:</label>
    <select v-model="tipoGenero">
        <option value="movie">Filmes</option>
        <option value="tv">Séries</option>
    </select>
    </div>
    <ul>
        <li
        class="clicavel"
        v-for="g in generoStore.generos" :key="g.id"
        @click="genero.value = g.id"
        >
        {{ genero.name }}
        </li>
    </ul>
    </div>
    <div>
    <h3>Filmes:</h3>
    <ul>
        <li
        v-for="filme in obraStore.filmes" :key="filme.id"
        >
        {{ filme.original_title }}
        </li>
    </ul>
    </div>
    </section>
</template>
<style scoped>
section {
    display: flex;
    justify-content: space-between;
    margin: 0 15vw;
}
.clicavel {
    cursor: pointer;
}


</style>