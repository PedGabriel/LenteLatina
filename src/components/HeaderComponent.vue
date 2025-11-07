<script setup>
    import { useRoute } from 'vue-router';

    //const route = useRoute();

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
            <RouterLink
                activeClass="ativo"
                to="/sobre"
            >
                Sobre
            </RouterLink>
        </ul>
    </nav>
</template>
<style scoped>
    nav {
        background: #69140E;
        color: #FCFCED;
        padding: 3vw 6vw;
        border-bottom: #FCFCED;
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