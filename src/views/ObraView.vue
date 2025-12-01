<script setup>
import { reactive, onMounted, getCurrentInstance, defineProps } from 'vue';
import { useObraStore } from '@/stores/obra';

const props = defineProps({
  id: { required: true },
  tipo: { required: true }
});

const instance = getCurrentInstance();
const lingua = reactive(instance.appContext.config.globalProperties.$lingua);

const obraStore = useObraStore();

const dados = reactive({
  poster: '',
  titulo: '',
  generos: [],
  data: '',
  duracao: '',
  sinopse: '',
  diretor: '',
  elenco: []
});

onMounted(async () => {
  let response;

  if (props.tipo === 'filmes') {
    await obraStore.getFilmes(
      obraStore.IDgeneroSelecionado,
      lingua.current,
      obraStore.iso,
      obraStore.sort,
      obraStore.pagina
    );

    obraStore.getFilmeById(props.id);

    response = await obraStore.getDetails(props.id, lingua.current, 'movie');
    const detalhes = response.data;

    dados.poster = detalhes.poster_path;
    dados.titulo = `${detalhes.title} (${detalhes.release_date.slice(0, 4)})`;
    dados.generos = detalhes.genres;
    dados.data = detalhes.release_date;
    dados.duracao = `${Math.floor(detalhes.runtime / 60)}h ${detalhes.runtime % 60}m`;
    dados.sinopse = detalhes.overview;

    const diretor = detalhes.credits.crew.find(p => p.job === 'Director');
    dados.diretor = diretor ? diretor.name : '-';
    dados.elenco = detalhes.credits.cast.slice(0, 10);

  } else {
    await obraStore.getSeries(
      obraStore.IDgeneroSelecionado,
      lingua.current,
      obraStore.iso,
      obraStore.sort,
      obraStore.pagina
    );

    obraStore.getSerieById(props.id);

    response = await obraStore.getDetails(props.id, lingua.current, 'tv');
    const detalhes = response.data;

    dados.poster = detalhes.poster_path;
    dados.titulo = `${detalhes.name} (${detalhes.first_air_date.slice(0, 4)})`;
    dados.generos = detalhes.genres;
    dados.data = detalhes.first_air_date;
    dados.duracao = detalhes.episode_run_time.length
      ? `${detalhes.episode_run_time[0]} min`
      : '-';
    dados.sinopse = detalhes.overview;
    dados.diretor = '-';
    dados.elenco = detalhes.credits.cast.slice(0, 10);
  }
});

</script>
<template>
  <section class="detalhes">
        
    <div class="poster">
      <img class="poster"
        :src="`https://image.tmdb.org/t/p/w500${dados.poster}`"
        :alt="dados.titulo"
        v-fallback-img="'default-poster'"
      />
    </div>

    <div class="info">
      <h1>{{ dados.titulo }}</h1>

      <p class="sub">
        {{ dados.data }} • {{ dados.duracao }}
      </p>

      <p class="generos">
        <span v-for="g in dados.generos" :key="g.id">{{ g.name }}</span>
      </p>

      <h3>Sinopse</h3>
      <p class="sinopse">{{ dados.sinopse }}</p>

      <p><strong>Direção:</strong> {{ dados.diretor }}</p>
    </div>

  </section>

  <h2 class="elencoTitulo">Elenco Principal</h2>

  <div class="elenco">
      
    <button class="seta seta-esquerda">❮</button>

    <div class="elenco-lista">
      <div class="ator" v-for="ator in dados.elenco" :key="ator.id">

        <img
          v-fallback-profile="'default-poster'"
          class="ator-img"
          :src="`https://image.tmdb.org/t/p/w300${ator.profile_path}`"
        />

        <div class="ator-nome">{{ ator.name }}</div>
      </div>
    </div>

    <button class="seta seta-direita">❯</button>

  </div>
</template>
<style scoped>
.detalhes {
  display: flex;
  gap: 2rem;
  padding: 2rem 3rem;
}

.poster {
  flex: 1;
}

.poster {
  width: 100%;
  max-width: 330px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.25);
}

.info {
  flex: 2;
}

.sub {
  color: #444;
  margin-bottom: 0.5vw;
}

.generos {
  margin-bottom: 1.2vw;
}

.generos span {
  margin-right: 10px;
  color: #1b74c4;
  cursor: pointer;
  text-decoration: underline;
}

.sinopse {
  margin-top: 0.5vw;
  max-width: 650px;
  line-height: 1.5;
  margin-bottom: 1vw;
}

.elencoTitulo {
  margin-left: 3rem;
  margin-top: 2.5rem;
}

.elenco {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 3rem;
}

.elenco-lista {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
}

.ator {
  width: 150px;
  text-align: center;
}

.ator-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
  background: #ddd;
}

.ator-nome {
  margin-top: .4rem;
  font-size: .9rem;
}

.seta {
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

</style>