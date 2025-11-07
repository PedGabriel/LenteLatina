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
    state.countrys.find((country) => country.id === id).native_name
  };

  const latinAmericanCountries = ["AR", "BO","BR","CL","CO","CR", "CU","DO", "EC","SV", "GT","HN","MX","NI","PA","PY","PE","PR", "UY","VE"];

  async function getAllCountrys() {
    const response = await api.get(`configuration/countries?language=${lingua.value}`);
    state.countrys = response.data;
  }

  const latinCountries = computed(() => state.countrys.filter(c => latinAmericanCountries.includes(c.iso_3166_1)))

  return { countrys, getAllCountrys, getCountryNameById, latinCountries };
});