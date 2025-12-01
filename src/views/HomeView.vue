<script setup>
import { onMounted, getCurrentInstance, reactive } from 'vue';
import CarrosselComponent from '@/components/CarrosselComponent.vue';
import { useObraStore } from '@/stores/obra';
import { useCountryStore } from '@/stores/paises';
import { RouterLink } from 'vue-router';
import { useRouter } from "vue-router";

const obraStore = useObraStore();
const countryStore = useCountryStore();

const instance = getCurrentInstance();
const lingua = reactive(instance.appContext.config.globalProperties.$lingua);

onMounted(async () => {
    await countryStore.getAllCountrys(lingua.current);

      obraStore.filmesHome.value = [];
      obraStore.seriesHome.value = [];

    for (const pais of countryStore.latinCountries) {
      const iso = pais.iso_3166_1;
      await obraStore.salvarMaisPopular('filmes', lingua.current, iso);
      await obraStore.salvarMaisPopular('series', lingua.current, iso);
    }
});

</script>

<template>
  <div class="geral">
    <div class="inicio">
      <h1>Bem vindo ao melhor site de cinematografia latina!</h1>
      <p>
        O Lente Latina é um portal dedicado à divulgação e valorização do cinema e das séries produzidas na América Latina. Nosso objetivo é ampliar o alcance das produções latino-americanas, destacando suas histórias, talentos e perspectivas únicas que muitas vezes ficam à margem dos grandes circuitos de mídia.
      </p>
    </div>

    <div class="imagem">
        <img src="/public/mapa.png" alt="">
    </div>
  </div>
  <h2>Produções em destaque:</h2>
  <div class="destaqueFilmes">
    <h3>Filmes em destaque:</h3>
    <CarrosselComponent
    :itens = "obraStore.filmesHome"
    :tipo="'filmes'"
      :destaques="true"
    />
  </div>
  <div class="destaqueSeries">
    <h3>Séries em destaque:</h3>
    <CarrosselComponent
    :itens = "obraStore.seriesHome"
    :tipo="'series'"
      :destaques="true"
    />
  </div>
  <div class="explore">
      <RouterLink to="/paises">Explore mais produções latinas</RouterLink>
    <span class="mdi mdi-chevron-right"></span>
    </div>
    
</template>

<style scoped>  
div.destaqueFilmes {
  margin-bottom: 4vw;
  margin-top: 4vw;
}

template{
  position: relative;
}
.geral {
  display: flex;
   justify-content: center;
   
}

.inicio {
  width: 40%;
  position: relative;
}
.inicio::after{
   content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 10rem;
    left: 0;
    background-color: #0D1321;
}
img{
  width: 35vw;
  height: auto;
  
}
h1{
  margin: 4vw 0 3vw 0;
  
}
p{
  line-height: 200%;
   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
h2{
  padding: 0 12.5vw 2vw;
}
h3 {
  padding: 0 12.5vw 2vw;
}

div.explore{
   margin: 3vw 5vw 1vw;
  font-size: 1.2vw;
  display: flex;
  justify-content: center;
}
.explore {
  color: #0D1321;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s ease;
  padding-bottom: 3vw;

}

.explore:hover {
  color: #2A3A5E;
  transform: scale(1.05);
  text-decoration: underline;
}


</style>
