<script setup>
    import axios from "axios"
    import { useMovieStore } from "../stores/movie";

    const movieData = useMovieStore()

</script>

<template>
    <div id="header">
        <h1>Your cart:</h1>
        <h1>0 Items</h1>
    </div>
    
    <div id="movies">
        <div id="movie" v-for="movie in movieData.cart">
            <img :src="`https://image.tmdb.org/t/p/original${movie.poster}`" />
            <h1>{{ movie.title }}</h1>
        </div>
    </div>
    
</template>

<style scoped>
    #header {
        display: flex;
        margin: 2rem;
    }
    #header h1:nth-child(2) {
        margin-left: auto;
        margin-right: 2rem;
    }

    #movies {
        display: flex;
        flex-direction: row;
        gap: 1.5vw;
        flex-wrap: wrap;
        margin-left: 2rem;
        margin-right: 2rem;
    }
    #movie {
        width: 166px;
    }

    #movie h1 {
        color: white;
        font-size: 0.7em;
        width: 100%;
        text-overflow: clip;
        text-align: center;
        position: relative;
        bottom: 10%;
        height: 10%;
        background-color: rgba(0, 0, 0, 0.7);
    }

    img {
        width: 10rem
    }
</style>