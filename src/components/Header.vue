<script setup>
import { useRouter } from "vue-router"
import { useMovieStore } from "../stores/movie.js"

const router = useRouter()
const data = useMovieStore()

</script>

<template>
    <header>
        <img src="https://www.jobalign.com/wp-content/uploads/2017/07/Icon-Placeholder-1.png" @click="router.push('/')">
        <button @click="router.push('/login')" v-if="!data.loggedIn">Login</button>
    </header>
</template>

<style scoped>
    header {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 3rem;
        background-color: rgb(50,50,50);
    }

    img {
        max-width: 80%;
        max-height: 80%;
        margin-left: 1rem;
    }

    button {
        margin-left: auto;
        margin-right: 1rem;
        background-color: black;
        border-style: none;
        height: 2rem;
        width: 4rem;
        border-radius: 0.5rem;
        font-weight: bold;
    }
</style>