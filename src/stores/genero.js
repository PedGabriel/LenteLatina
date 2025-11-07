import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '../plugins/axios';

export const useGeneroStore = defineStore('genero', () => {
  const state = reactive({
    generos: [],
  });

  const generos = computed(() => state.generos);

  const getGeneroName = (id) =>
    state.generos.find((genero) => genero.id === id).name;

  const getAllGeneros = async (type) => {
    const response = await api.get(`genre/${type}/list?language=pt-BR`);
    state.generos = response.data.genres;
  };

  return { generos, getAllGeneros, getGeneroName };
});