<script setup>
import { ref, reactive, onMounted, watch, getCurrentInstance } from "vue";
import { useCountryStore } from "@/stores/paises";
import { useRouter } from "vue-router";

const router = useRouter();

const countryStore = useCountryStore();

const instance = getCurrentInstance();
const lingua = reactive(instance.appContext.config.globalProperties.$lingua);
console.log(lingua.current)

onMounted(async () => {
    await countryStore.getAllCountrys(lingua.current);
});

async function update () {
  await countryStore.getAllCountrys(lingua.current);
}

watch(lingua, () => {
    update()
});

function abrirPais (iso) {
    router.push({ name: 'país', params: { iso } });
}
</script>
<template>
    <div>
    <h1>Paises</h1>
    <ul>
        <li
        class="clicavel"
        v-for="country in countryStore.latinCountries" :key="country.iso_3166_1"
        @click="abrirPais(country.iso_3166_1)"
        >
        {{ country.native_name }}

        </li>
    </ul>
    </div>
</template>
<style scoped>
    ul {
        display: flex;
        justify-content: space-between;
    }
    li {        
        margin-bottom: 1.5vw;
        border: 2px black solid;
    }
    div {
        margin: 3vw 10vw;
    }
    h1 {
        margin-bottom: 2vw;
    }
    li:hover {
        background: yellow;
    }
</style>