<script setup>
import { defineProps, onMounted } from 'vue';
import { useObraStore } from '@/stores/obra';
import { useCountryStore } from '@/stores/paises';
import { useGeneroStore } from '@/stores/genero';

const props = defineProps({
    iso: {  
        required: true,
    },
});

onMounted(async () => {
    await countryStore.getCountryNameById(props.iso);
})

const obraStore = useObraStore();
const countryStore = useCountryStore();
const generoStore = useGeneroStore();

const tipoGenero = ref("movie");

const genero = ref(null);
const pais = ref(null);

const instance = getCurrentInstance();
const lingua = reactive(instance.appContext.config.globalProperties.$lingua);

onMounted(async () => {
    await obraStore.getFilmes(null, lingua, )
})

</script>
<template>
    
</template>