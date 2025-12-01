<script setup>
import { ref, reactive, onMounted, watch, getCurrentInstance } from "vue";
import { useCountryStore } from "@/stores/paises";
import { useRouter } from "vue-router";

const router = useRouter();

const countryStore = useCountryStore();

const instance = getCurrentInstance();
const lingua = reactive(instance.appContext.config.globalProperties.$lingua);
console.log(lingua.current)

onMounted(async () => {
    await countryStore.getAllCountrys(lingua.current);
});

async function update () {
  await countryStore.getAllCountrys(lingua.current);
}

watch(lingua, () => {
    update()
});

function abrirPais (iso) {
    router.push({ name: 'país', params: { iso } });
}
</script>
<template>
    <div class="geral">
    <div class="inicio">
      <h1>Conheça mais produções de toda a América Latina</h1>
      <p>
        Escolha um país e descubra a riqueza, a diversidade e os estilos únicos que moldam o cinema latino-americano. Cada nação guarda histórias, olhares e vozes próprias — esta página é o ponto de partida para conhecer todas elas.
      </p>
    </div>

    <div class="imagem">
        <img src="/public/mapa.png" alt="">
    </div>
  </div>
    <div class="paises">
  <div
    class="card"
    v-for="country in countryStore.latinCountries"
    :key="country.iso_3166_1"
    @click="abrirPais(country.iso_3166_1)"
  >
    <img :src="country.bandeira" class="bandeira" alt="" />
    <span class="nome">{{ country.native_name }}</span>
  </div>
</div>
</template>
<style scoped>
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

.paises {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    padding: 2rem 5vw;
}

.card {
  cursor: pointer;
  background: #0D1321;
  border-radius: 12px;
  padding: 2.5rem 3rem 1.5rem 3rem;
  text-align: center;
  transition: 0.2s;
  transform: ease;
  box-shadow: ease 0.2s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
}

.bandeira {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 6px solid #e8e7cb;
}

.nome {
  display: block;
  margin-top: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
}
</style>