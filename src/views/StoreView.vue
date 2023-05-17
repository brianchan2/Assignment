<script async setup>
    import axios from "axios"
    import { useMovieStore } from "../stores/movie.js"

    const API_KEY = import.meta.env.VITE_API_KEY;
    const movieData = useMovieStore()

    if (!movieData.movies || !(movieData.movies.length < 0)) {
        console.log("Runnning")
        axios({
            url: "https://api.themoviedb.org/3/trending/movie/week",
            method: "GET",
            params: {
                api_key: API_KEY,
            }
        }).then(movies => {
            movies.data.results.forEach(movie => {
            movieData.movies.push({
                    id: movie.id,
                    poster: movie.poster_path,
                    title: movie.title
                })
            })
        }).catch(err => {
            console.log(err)
        })
    }

    console.log(movieData.movies) 

</script>

<template>
    <h1 id="title">Popular</h1>
    <div id="movies" v-if="movieData.movies">
        <div id="movie" v-for="movie in movieData.movies" @click="movieData.addToCart(movie)">
            <img :src="`https://image.tmdb.org/t/p/original${movie.poster}`" />
            <h1>{{ movie.title }}</h1> 
        </div>
    </div>
</template>

<style scoped>
    #title {
        margin: 2rem 2rem;
    }
    #movies {
        display: flex;
        flex-direction: row;
        justify-content: center;
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