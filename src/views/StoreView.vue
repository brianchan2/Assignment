<script setup>
    import axios from "axios"
    import { useMovieStore } from "../stores/movie.js"

    const moviedata = useMovieStore()

    moviedata.movies.push("Ji")

    console.log(moviedata.movies)

    if (!moviedata.movies || !(moviedata.movies.length < 0)) {
        console.log("You are missing movie data")
    }

</script>

<template>

</template>

<style scoped>

</style>