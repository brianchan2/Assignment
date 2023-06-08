<script setup>
import axios from "axios"
import { useMovieStore } from "../stores/movie.js"
import { ref } from "vue"
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"
import Modal from "../components/Modal.vue"
import { useRouter } from "vue-router"
import { auth } from "../firebase"

const API_KEY = import.meta.env.VITE_API_KEY;
const movieData = useMovieStore()
const selected = ref()
const router = useRouter()
const genre = ref()

if ((!movieData.movies || (movieData.movies.length <= 0))) {
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

if (!auth.currentUser) {
  router.push("/login")
}

</script>

<template>
  <Header />
  <img id="cart" @click="router.push(`/cart`)"
    src="https://static.vecteezy.com/system/resources/previews/004/999/463/original/shopping-cart-icon-illustration-free-vector.jpg" />
  <h1 id="title">Popular</h1>
  <select v-model="genre">
    <option value="28">Action</option>
    <option value="10751">Family</option>
    <option value="878">Science Fiction</option>
    <option value="12">Adventure</option>
    <option value="14">Fantasy</option>
    <option value="10770">TV Movie</option>
    <option value="16">Animation</option>
    <option value="36">History</option>
    <option value="53">Thriller</option>
    <option value="35">Comedy</option>
    <option value="27">Horror</option>
    <option value="10752">War</option>
    <option value="80">Crime</option>
    <option value="10402">Music</option>
    <option value="37">Western</option>
    <option value="99">Documentary</option>
    <option value="9648">Mystery</option>
    <option value="18">Drama</option>
    <option value="10749">Romance</option>
  </select>
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

select {
  color: white;
  background-color: black;
  margin-left: 2rem;
  margin-bottom: 2rem;
}

img {
  width: 10rem
}
</style>