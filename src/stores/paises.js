import { reactive, computed, ref } from 'vue';
import { defineStore } from 'pinia';
import api from '../plugins/axios';

export const useCountryStore = defineStore('country', () => {
  const state = reactive({
    countrys: [],
  });


  const countrys = computed(() => state.countrys);

  function getCountryNameById(id) {
  const found = state.countrys.find(
    (country) => country.iso_3166_1 === id
  );
  return found ? found.native_name : null;
}

  const latinAmericanCountries = ["AR", "BO","BR","CL","CO","CR", "CU","DO", "EC","SV", "GT","HN","MX","NI","PA","PY","PE","PR", "UY","VE"];

  async function getAllCountrys(lingua) {
    const response = await api.get(`configuration/countries?language=${lingua}`);
    state.countrys = response.data;
  }

  const latinCountries = computed(() => state.countrys.filter(c => latinAmericanCountries.includes(c.iso_3166_1)))

  return { countrys, getAllCountrys, getCountryNameById, latinCountries };
});