<script setup>
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const activeColor = (path) => (route.path === path ? 'font-weight: 700;' : '');

</script>
<template>
   <nav>
        <ul>
            <li>
                <RouterLink
                to="/"
                :style="activeColor('/')"
                >
                Home
                </RouterLink>
            </li>
            <li>
                <RouterLink
                to="/paises"
                :style="activeColor('/paises')"
                >
                Países
                </RouterLink>
            </li>
            <li><a href="/about">Sobre</a></li>
        </ul>
    </nav>
</template>
<style scopet>
    nav {
        background: #69140E;
        color: #FCFCED;
    }
    ul {
        display: flex;
        justify-content: space-between;
        padding: 3vw 6vw;
    }
    ul li {
        border: #FCFCED 2px solid;
        border-radius: 8px;
        padding: 0.5vw 1.5vw;
    }
    ul li:hover {
        transform: scale(1.1);
        transition: 0.3s;
    }
</style>