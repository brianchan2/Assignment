<script setup>
import axios from "axios"
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import Modal from "../components/Modal.vue"

import { useRouter } from "vue-router"
import { useMovieStore } from "../stores/movie.js"
import { ref } from "vue"

const API_KEY = import.meta.env.VITE_API_KEY;
const movieData = useMovieStore()
const selected = ref()
const router = useRouter()

if ((!movieData.movies || (movieData.movies.length <= 0))) {
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

function getDetails(movie) {
  selected.value = movie.id
}

async function closeModal() {
  console.log("working?")
  selected.value = undefined
}

if (!movieData.loggedIn) {
  router.push("/login")
}

</script>

<template>
  <Header />
  <img id="cart" @click="router.push(`/cart`)"
    src="https://static.vecteezy.com/system/resources/previews/004/999/463/original/shopping-cart-icon-illustration-free-vector.jpg" />
  <h1 id="title">Popular</h1>
  <div id="movies" v-if="movieData.movies">
    <div id="movie" v-for="movie in movieData.movies" @click="getDetails(movie)">
      <img :src="`https://image.tmdb.org/t/p/original${movie.poster}`" />
      <h1>{{ movie.title }}</h1>
    </div>
  </div>
  <Footer />
  <Modal v-if="selected" :movie="selected" @toggleModal=closeModal() />
</template>

<style scoped>
#title {
  margin: 2rem 2rem;
}

#cart {
  z-index: 1;
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

#cart {
  position: fixed;
  top: 10%;
  right: 0;
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