<script>
import { onMounted } from 'vue';
import { useCountryStore } from '@/stores/paises';

const countryStore = useCountryStore;

onMounted(async () =>{
    await countryStore.getAllCountrys()
})
</script>
<template>
    <ul>
        <li
        v-for="country in countryStore.countrys"
        :key="country.id"
        >
        {{ country.native_name }}
        </li>
    </ul>
</template>