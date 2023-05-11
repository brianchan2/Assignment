<script setup>
    import axios from "axios"
    import { useMovieStore } from "../stores/movie.js"

    const moviedata = useMovieStore()

    console.log(moviedata.movies)

</script>

<template>

</template>

<style scoped>

</style>