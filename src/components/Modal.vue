<script setup>
import axios from "axios"
import { ref } from "vue"
import { useMovieStore } from "../stores/movie.js"

const movieId = defineProps(['movie'])
const items = ref()
const purchaseText = ref()
const emits = defineEmits(["toggleModal"]);
const movieStore = useMovieStore()

let info = await axios({
  method: "GET",
  url: `https://api.themoviedb.org/3/movie/${movieId.movie}`,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    append_to_response: "videos",
  },
}).catch((err) => {
  console.log(err);
});

if (info) {
  info = info.data;
  items.value = info;
  items.budget = info.budget;
}

async function addToCart() {
  if (movieStore.cart[items.value.id]) {
    movieStore.removeFromCart(items.value)
    purchaseText.value = "Add to cart"
  }
  else {
    movieStore.addToCart(items.value)
    purchaseText.value = "Remove from cart"
  }
}


if (!movieStore.cart[items.value.id]) {
  purchaseText.value = "Add to cart"
}
else {
  purchaseText.value = "Remove from cart"
}
</script>

<template>
  <div id="shadow" @click="emits('toggleModal')"></div>
  <div id="modal" v-if="items">
    <div id="movie">
      <a :href="`https://www.themoviedb.org/movie/${items.id}`" target="_blank">
        <h3 id="title">{{ items.title }}</h3>
      </a>
      <h3 id="description">{{ items.overview }}</h3>
      <img id="poster" :src="`https://image.tmdb.org/t/p/original${items.poster_path}`" />
      <div id="income">
        <div>
          <h4>Budget</h4>
          <h4>{{ "$" + items.budget }}</h4>
        </div>
        <div>
          <h4>Revenue</h4>
          <h4>{{ "$" + items.revenue }}</h4>
        </div>
        <div>
          <h4>Net</h4>
          <h4>
            {{
              items.revenue - items.budget < 0 ? "-$" + Math.abs(items.revenue - items.budget) : "$" + (items.revenue -
                items.budget) }} </h4>
        </div>
      </div>
      <div id="popularity">
        <h4>Popularity</h4>
        <h4>{{ Math.round(items["popularity"]) }}</h4>
      </div>
      <div id="rating">
        <h4>Rating</h4>
        <h4>{{ `${Math.round(items["vote_average"] * 10)} / 100` }}</h4>
      </div>
      <div id="release">
        <h4>Release Date</h4>
        <h4>{{ items.release_date }}</h4>
      </div>
      <div>
        <h4>Duration</h4>
        <h4 id="duration">{{ items.runtime + " mins" }}</h4>
      </div>
      <div id="genres">
        <h4>Genres</h4>
        <h5 class="tag" v-for="genre of items.genres">{{ genre.name }}</h5>
      </div>
      <div id="langauge">
        <h4>Languages</h4>
        <h5 class="tag" v-for="language of items.spoken_languages">
          {{ language.name }}
        </h5>
      </div>
    </div>
    <button id="purchase" @click="addToCart()">{{ purchaseText }}</button>
  </div>
</template>

<style scoped>
* {
  color: white;
  font-family: sans-serif;
}

#shadow {
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  top: 0;
  position: fixed;
}

#modal {
  right: 0;
  top: 0;
  width: 50%;
  bottom: 0;
  background-color: rgb(0, 0, 0);
  z-index: 2;
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

#movie {
  margin-top: 3vh;
  margin-left: 2vw;
  display: flex;
  flex-direction: column;
  gap: 2vh;
  align-items: flex-start;
}

h4 {
  margin-bottom: 10px;
}

#income {
  display: flex;
  flex-direction: row;
  gap: 3rem;
  height: auto;
  width: auto;
  align-items: center;
}

#purchase {
  width: 5vw;
  height: 3vh;
  background: #343434;
  align-self: flex-end;
  margin-right: 2vw;
}

#description {
  width: 60%;
}

#poster {
  top: 15%;
  position: absolute;
  width: 10%;
  margin-left: 85%;
  margin-right: 1%;
}

#cast {
  position: absolute;
  overflow-x: hidden;
  width: 25%;
  right: 2rem;
  top: 25rem;
}

#info {
  display: flex;
}

#income {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: row;
}

#description {
  width: 60%;
}

button {
  box-shadow: none;
  border: none;
  border-radius: 5px;
}

select {
  background-color: grey;
  border-radius: 5px;
  margin-right: 10px;
}

.tag {
  background-color: grey;
  width: fit-content;
  padding: 0.5rem;
  border-radius: 0.2rem;
  margin-right: 0.1rem;
  display: inline;
}
</style>