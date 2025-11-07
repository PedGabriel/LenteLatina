<script setup>
import { onMounted } from 'vue';
import { useCountryStore } from '@/stores/paises';
import { useGeneroStore } from '@/stores/genero';

const countryStore = useCountryStore();
const generoStore = useGeneroStore();

onMounted(async () =>{
    await countryStore.getAllCountrys()
    await generoStore.getAllGeneros('movie')
})
</script>
<template>
    <h3>Países latinos:</h3>
    <ul>
        <li
        v-for="country in countryStore.latinCountries"
        :key="country.id"
        >
        {{ country.native_name }}
        </li>
    </ul>
    <br>
    <h3>Gêneros:</h3>
    <ul>
        <li
        v-for="genero in generoStore.generos" :key="genero.id"
        >
        {{ genero.name }}
        </li>
    </ul>
</template>