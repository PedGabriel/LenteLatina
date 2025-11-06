import { reactive, computed, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '../plugins/axios';

export const useCountryStore = defineStore('country', () => {
  const state = reactive({
    countrys: [],
  });

  let lingua = ref(`pt-BR`);

  const countrys = computed(() => state.countrys);

  function getCountryNameById (id) {
    state.country.find((country) => country.id === id).native_name
  };

  async function getAllCountrys() {
    const response = await api.get(`configuration/countries?language=${lingua.value}`);
    state.countrys = response.data.countrys;
  }

  return { countrys, getAllCountrys, getCountryNameById };
});