import { reactive, computed, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '../plugins/axios';

export const useObraStore = defineStore('obra', () => {
    const state = reactive ({
        filmes: [],
        series: [],
    });

      let lingua = ref(`pt-BR`);

      const filmes = computed(() => state.filmes);
      const series = computed(() => state.series)

      function getFilmeById(id) {
        state.filmes.find((filme) => filme.id == id).name
      }
      function getSerieById(id) {
        
      }

})