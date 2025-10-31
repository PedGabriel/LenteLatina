<script>
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const activeColor = (path) => (route.path === path ? 'color: #A44200' : '');
</script>
<template>
    <nav>
        <ul>
            <li>
                <RouterLink
                to="/"
                :style="activeColor('/')"
                >
                HeaderComponent
            </li>
            <li><a href="/paises">Países</a></li>
            <li><a href="/about">Sobre</a></li>
        </ul>
    </nav>
</template>