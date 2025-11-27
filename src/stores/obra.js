import { reactive, computed, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '../plugins/axios';

export const useObraStore = defineStore('obra', () => {

      const filmes = ref([]);
      const series = ref([]);
  
      function getFilmeById(id) {
        return filmes.value.find((filme) => filme.id == id).name
      }
      function getSerieById(id) {
        return series.value.find((serie) => serie.id == id).name
      }

      async function getFilmes(idGenero, lingua, isoPais, sort, pagina) {
        const response = await api.get('discover/movie', {
          params: {
              with_genres: idGenero,
              language: lingua,
              with_origin_country: isoPais,
              sort_by: sort,
              page: pagina,
          }
        });
        filmes.value = response.data.results
      };

      async function getSeries(idGenero, lingua, isoPais, sort, pagina) {
        const response = await api.get('discover/tv', {
          params: {
              with_genres: idGenero,
              language: lingua,
              with_origin_country: isoPais,
              sort_by: sort,
              page: pagina,
          }
        });
        series.value = response.data.results
      };
      return {filmes, series, getFilmeById, getSerieById, getFilmes, getSeries};
});