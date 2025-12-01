<script setup>
import { ref } from 'vue'
import { getCurrentInstance } from 'vue'

const instance = getCurrentInstance()
const lingua = instance.appContext.config.globalProperties.$lingua;

const mostrarIdioma = ref(false);

const alternarVisibilidade = () => {
    mostrarIdioma.value = !mostrarIdioma.value;
}

function mudarIdioma(idioma) {
    lingua.current = idioma
    localStorage.setItem('lingua', idioma)
    mostrarIdioma.value = false
}

console.log(lingua.current)
</script>

<template>
    <nav>
        <RouterLink class="logo-area" to="/">
            <img src="/logo.png" class="logo">
        </RouterLink>

        <div class="right">
            <ul class="menu">
                <li>
                    <RouterLink activeClass="ativo" to="/">HOME</RouterLink>
                </li>
                <li>
                    <RouterLink activeClass="ativo" to="/paises">PAÍSES</RouterLink>
                </li>
            </ul>

            <div class="mudar">
                <p @click="alternarVisibilidade">
                    IDIOMA
                    <span :class="mostrarIdioma ? 'mdi mdi-chevron-up' : 'mdi mdi-chevron-down'"></span>
                </p>

                <ul v-if="mostrarIdioma" class="idiomas">
                    <li @click="mudarIdioma('pt-BR')" :class="{ ativoIdioma: lingua.current === 'pt-BR' }">
                        PT-BR
                    </li>

                    <li @click="mudarIdioma('es-ES')" :class="{ ativoIdioma: lingua.current === 'es-ES' }">
                        ES-ES
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
nav {
    background: #0D1321;
    color: #FCFCED;
    padding: 3vw 10vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
}
nav::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0.5rem;
    left: 0;
    background-color: #F9FADC;
}

.logo-area {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.logo {
    width: 110px;
    height: auto;
}

.right {
    display: flex;
    align-items: center;
    gap: 3vw;
}

.menu {
    display: flex;
    gap: 3vw;
}

.menu li {
    list-style: none;
    font-family: "Fjalla One", sans-serif;
    font-weight: 600;
}

nav ul a.ativo {
    text-decoration: underline;
}

nav ul a:hover {
    transform: scale(1.1);
    transition: 0.3s;
}

.mudar {
    position: relative;
    font-family: "Fjalla One", sans-serif;
    cursor: pointer;
}

.idiomas {
    position: absolute;
    top: 2.2vw;
    right: 0;
    display: flex;
    gap: 0.5vw;
}

.idiomas li {
    cursor: pointer;
    font-family: "Fjalla One", sans-serif;
    border-radius: 6px;
}

.ativoIdioma {
    text-decoration: underline;
}
</style>
