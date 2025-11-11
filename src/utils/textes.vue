<script setup>
import { onMounted, ref } from 'vue';
import { useCountryStore } from '@/stores/paises';
import { useGeneroStore } from '@/stores/genero';
import { useObraStore } from '@/stores/obra';

const countryStore = useCountryStore();
const generoStore = useGeneroStore();
const ObraStore = useObraStore();

const escolha = ref(Number)

onMounted(async () =>{
    await countryStore.getAllCountrys()
    await generoStore.getAllGeneros('movie')
    await ObraStore.getFilmes(', pt-BR, VE')
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
    <h4>Filmes:</h4>
    <ul>
        <li
        v-for="filme in filmes" :key="filme.id"
        >
        {{ filme.nome }}
        </li>
    </ul>
</template>