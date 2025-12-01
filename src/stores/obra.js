  import { ref } from 'vue';
  import { defineStore } from 'pinia';
  import api from '../plugins/axios';

  export const useObraStore = defineStore('obra', () => {

    const filmesHome = ref([]);
    const seriesHome = ref([]);

    const filmes = ref([]);
    const series = ref([]);

    const filme = ref();
    const serie = ref();

    const IDgeneroSelecionado = ref(null);
    const iso = ref(null);
    const pagina = ref(1);
    const sort = ref(null);

    async function getDetails(id, lingua, tipo) {
        return await api.get(`/${tipo}/${id}?append_to_response=credits`, {
          params: {
            language: lingua,
          }
        });

    }

    async function getFilmes(idGenero, lingua, isoPais, sort, paginaAtual) {
      const response = await api.get('discover/movie', {
        params: {
          with_genres: idGenero,
          language: lingua,
          with_origin_country: isoPais,
          sort_by: sort,
          page: paginaAtual,
        },
      });
      filmes.value = response.data.results;

      IDgeneroSelecionado.value = idGenero;
      iso.value = isoPais;
      pagina.value = paginaAtual;
    }

    async function getSeries(idGenero, lingua, isoPais, sort, paginaAtual) {
      const response = await api.get('discover/tv', {
        params: {
          with_genres: idGenero,
          language: lingua,
          with_origin_country: isoPais,
          sort_by: sort,
          page: paginaAtual,
        },
      });
      series.value = response.data.results;

      IDgeneroSelecionado.value = idGenero;
      iso.value = isoPais;
      pagina.value = paginaAtual;
    }

    function getFilmeById(id) {
      filme.value = filmes.value.find((f) => f.id == id);
    }
    function getSerieById(id) {
      serie.value = series.value.find((s) => s.id == id);
    }

    function setEstado({ idGenero, isoPais, paginaAtual, sortBy }) {
      IDgeneroSelecionado.value = idGenero;
      iso.value = isoPais;
      pagina.value = paginaAtual;
      sort.value = sortBy
    }

    async function salvarMaisPopular(tipo, lingua, isoPais) {
      if (tipo === 'filmes') {
        const response = await api.get('discover/movie', {
        params: {
          with_genres: null,
          language: lingua,
          with_origin_country: isoPais,
          sort_by: 'popularity.desc',
          page: 1,
        },
        
      });
      const filme = response.data.results[0];
        filmesHome.value.push({
          isoPais,
          filme}
        )
      } else {
        const response = await api.get('discover/tv', {
        params: {
          with_genres: null,
          language: lingua,
          with_origin_country: isoPais,
          sort_by: 'popularity.desc',
          page: 1,
        },
        
      });
      const serie = response.data.results[0];
        seriesHome.value.push({
          isoPais,
          serie}
        )
      }
    }

    return {
      filmesHome,
      seriesHome,
      filmes,
      series,
      filme,
      serie,
      IDgeneroSelecionado,
      iso,
      pagina,
      getFilmeById,
      getSerieById,
      getFilmes,
      getSeries,
      setEstado,
      salvarMaisPopular,
      getDetails,
    };
  });
