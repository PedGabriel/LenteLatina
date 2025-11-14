<script setup>
import { ref, reactive, onMounted, watch, getCurrentInstance } from "vue";
import { useCountryStore } from "@/stores/paises";
import { useGeneroStore } from "@/stores/genero";
import { useObraStore } from "@/stores/obra";

const countryStore = useCountryStore();
const generoStore = useGeneroStore();
const obraStore = useObraStore();

const tipoGenero = ref("movie");

const genero = ref(null);
const pais = ref(null);

const instance = getCurrentInstance();
const lingua = reactive(instance.appContext.config.globalProperties.$lingua);

onMounted(async () => {
  await countryStore.getAllCountrys();
  await generoStore.getAllGeneros(tipoGenero.value, lingua.current);
});

const updateListing = async () => {
  if (tipoGenero.value === "movie") {
    await obraStore.getFilmes(genero.value, lingua.current, pais.value);
  } else {
    await obraStore.getSeries(genero.value, lingua.current, pais.value);
  }
};

watch(pais, () => {
    updateListing()
});

watch(genero, () => {
    updateListing()
});

watch(tipoGenero, () => {
    updateListing()
});

watch( 
    () => lingua.current,
    (current) => {
        console.log('oioioi')
        updateListing()
});



// watch([genero, pais, tipoGenero], async () => {
//     console.log('ioioio')
//     console.log(pais)
//     if (tipoGenero.value === 'movie') {
//         await obraStore.getFilmes(genero.value, lingua.current, pais.value);
//     } else {
//         await obraStore.getSeries(genero.value, lingua.current, pais.value);
//     }

//     console.log(tipoGenero, genero, pais, lingua.current);
// });
</script>
<template>
  <section>
    {{ lingua }}
    <div>
      <h3>Países latinos:</h3>
      <ul>
        <li
          class="clicavel"
          v-for="country in countryStore.latinCountries"
          :key="country.id"
          @click="pais = country.iso_3166_1"
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
          v-for="g in generoStore.generos"
          :key="g.id"
          @click="genero = g.id"
        >
          {{ g.name }}
        </li>
      </ul>
    </div>
    <div>
      <h3>Filmes:</h3>
      <ul>
        <li v-for="filme in obraStore.filmes" :key="filme.id">
          {{ filme.title }}
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
