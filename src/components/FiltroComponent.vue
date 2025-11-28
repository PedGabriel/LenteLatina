<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

const props = defineProps({
    generos: {
        required: true,
    }
});

const emit = defineEmits(['aplicar', 'limpar']);

const mostrarFiltro = ref(false);
const pesquisa = ref('');

const filtrosSelecionadosTemp = ref([]);
const filtrosSelecionados = ref([]);

function limpar() {
    filtrosSelecionadosTemp.value = [];
    filtrosSelecionados.value = [];
    pesquisa.value = '';
    emit('limpar', []);
};

function aplicar() {
    filtrosSelecionados.value = [...filtrosSelecionadosTemp.value];
    
    const ids = filtrosSelecionados.value.map(g => g.id);
    
    mostrarFiltro.value = false; 
    emit('aplicar', ids);
};

const generosFiltrados = computed(() => {
    if (!pesquisa.value) return props.generos;
    return props.generos.filter(g =>
        g.nome.toLowerCase().includer(pesquisa.value.toLocaleLowerCase())
    )
})

</script>

<template>
  <div class="filtro-container">

    <button class="filtro-botao" @click="mostrarFiltro = !mostrarFiltro">
      <span class="filtro-texto">Filtrar por gênero</span>
    </button>

    <div v-show="mostrarFiltro" class="filtro-dropdown">

      <div class="filtro-header">
        <p class="filtro-titulo">Gêneros</p>

        <button class="filtro-limpar" @click="limpar">
          X Limpar filtros
          <span v-if="filtrosSelecionadosTemp.length">
            ({{ filtrosSelecionadosTemp.length }})
          </span>
        </button>
      </div>

      <div class="filtro-pesquisa-container">
        <input
          type="text"
          v-model="pesquisa"
          placeholder="Pesquisar gênero"
          class="filtro-pesquisa-input"
        />
      </div>

      <div class="filtro-lista">
        <label
          v-for="g in generosFiltrados"
          :key="g.id"
          class="filtro-item"
        >
          <input
            type="checkbox"
            :value="g"
            v-model="filtrosSelecionadosTemp"
            class="filtro-checkbox"
          />
          <span>{{ g.name }}</span>
        </label>
      </div>

      <button @click="aplicar" class="filtro-aplicar">
        APLICAR
      </button>
    </div>
  </div>
</template>
<style scoped>
.filtro-container {
  position: relative;
  display: inline-block;
  margin-left: 20vw;
}

.filtro-botao {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
}

.filtro-texto {
  margin-right: 6px;
  font-size: 1.1rem;
  font-weight: bold;
}

.filtro-icone {
  width: 18px;
  height: 18px;
}

.filtro-dropdown {
  position: absolute;
  width: 260px;
  right: 0;
  top: 110%;
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 0 15px rgba(0,0,0,0.3);
  z-index: 20;
}

.filtro-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bbb;
  padding-bottom: 6px;
}

.filtro-titulo {
  font-weight: bold;
  font-size: 1.1rem;
}

.filtro-limpar {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 0.8rem;
  text-decoration: underline;
}

.filtro-pesquisa-input {
  width: 100%;
  padding: 8px;
  margin-top: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.filtro-lista {
  max-height: 180px;
  overflow-y: auto;
  margin-top: 12px;
}

.filtro-item {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
  font-size: 0.9rem;
}

.filtro-checkbox {
  accent-color: #2c7a2c;
}

.filtro-aplicar {
  width: 100%;
  margin-top: 12px;
  padding: 10px;
  background: #2f5233;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

.filtro-aplicar:hover {
  background: #244028;
}
</style>