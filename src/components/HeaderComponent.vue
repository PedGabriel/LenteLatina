<script setup>
    import { useRoute } from 'vue-router';
    import { getCurrentInstance } from 'vue';
    
    const instance = getCurrentInstance();
    const lingua = instance.appContext.config.globalProperties.$lingua;

    function mudarIdioma () {
        localStorage.setItem('lingua', lingua.current)
        console.log('Lingua alterado para', lingua.current)
    }

</script>
<template>
    
   <nav>
          <!-- <p>logo</p> -->
        <ul>
            <RouterLink
                activeClass="ativo"
                to="/"
            >
                Home
            </RouterLink>
            <RouterLink 
                active-class="ativo"
                to="/paises"
                >
                Países
            </RouterLink>
            <!--
            <RouterLink
                activeClass="ativo"
                to="/sobre"
            >
                Sobre
            </RouterLink>
            -->
        </ul>
        <div>
        <label for="lingua">Idioma:</label>
        <select name="lingua" id="lingua"
        v-model="lingua.current"
        @change="mudarIdioma"
        >
            <option value="pt-BR">Português</option>
            <option value="es-ES">Espanhol</option>
        </select>
    </div>
    </nav>
</template>
<style scoped>
    nav div {
        font-weight: 600;
    }
    nav div label {
        margin-right: 1vw;
    }
    nav div select {
        border: solid 1px black;
        background: #FCFCED;
        color: #68140E;
        font-weight: 600;
        padding: 0.5vw;
    }
    nav {
        background: #69140E;
        color: #FCFCED;
        padding: 3vw 6vw;
        border-bottom: #FCFCED;
        display: flex;
        justify-content: space-around;
    }
    ul {
        display: flex;
        justify-content: center;
    }
    ul a {
        border: #FCFCED 2px solid;
        border-radius: 8px;
        padding: 0.3vw 1vw;
        margin: 0 2vw 0 0;
        font-weight: 600;
        &.ativo {
            background-color: #FCFCED;
            color: #69140E;
        } 
    }
  
    ul a:hover {
        transform: scale(1.1);
        transition: 0.3s;
    }
  p{
    position: absolute;
    justify-content: left;
 }
</style>