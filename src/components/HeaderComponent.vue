<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute();

</script>
<template>
    <!-- Logo ficando na esquerda -->
   <nav>
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
    }
    ul {
        display: flex;
        justify-content: center;
    }
    ul a {
        border: #FCFCED 2px solid;
        border-radius: 8px;
        padding: 0.5vw 1.5vw;
        margin: 0 3vw 0 0;
        &.ativo {
            background-color: #A44200;
        }
    }
    ul li:last-child{
        margin: 0;
    }
    ul a:hover {
        transform: scale(1.1);
        transition: 0.3s;
    }
</style>