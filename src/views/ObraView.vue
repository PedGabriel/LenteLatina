<script setup>
    import { ref, reactive, onMounted, watch, getCurrentInstance, defineProps } from 'vue';
    import { useObraStore } from '@/stores/obra';
    import { useRouter } from 'vue-router';

    const props = defineProps({
        id: {
            required: true,
        },
        tipo: {
            required: true,
        }
    });

    const instance = getCurrentInstance();
    const lingua = reactive(instance.appContext.config.globalProperties.$lingua);

    const obraStore = useObraStore();


    onMounted(async () => {
        if (props.tipo == 'filmes') {
            await obraStore.getFilmes(obraStore.IDgeneroSelecionado, lingua.current, obraStore.iso, obraStore.sort, obraStore.pagina )
            await obraStore.getFilmeById(props.id)
        }
    })

    console.log(props.tipo)
</script>
<template>
    <img
    :src="`https://image.tmdb.org/t/p/w500${obraStore.filme?.poster_path}`"
    :alt="obraStore.filme?.title">
    <h1>{{ obraStore.filme?.title }}</h1>

</template>
<style scoped>

</style>