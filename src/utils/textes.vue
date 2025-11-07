<script setup>
import { onMounted } from 'vue';
import { useCountryStore } from '@/stores/paises';

const countryStore = useCountryStore();

onMounted(async () =>{
    await countryStore.getAllCountrys()
})
</script>
<template>
    <h3>Países</h3>
    <ul>
        <li
        v-for="country in countryStore.latinCountries"
        :key="country.id"
        >
        {{ country.native_name }}
        </li>
    </ul>
</template>