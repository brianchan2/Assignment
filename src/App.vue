<script setup>
import { ref } from "vue";
import axios from "axios";
import { API_KEY } from "./config.js";

const items = ref("");

const isTrailer = ref();
let movieId = 550;
let trailers = [];
isTrailer.value = false;

async function movieClick(event) {
  let elementType = event.srcElement.id;
  let current = 0;
  if (elementType == "right") {
    current = current >= trailers.length - 1 ? trailers.length - 1 : current + 1;
    items.value.trailer = `https://www.youtube.com/embed/${trailers[current].key}`;

    if (current == trailers.length - 1) {
      right.style.visibility = "hidden";
      left.style.visibility = "visible";
      left.style.position = "relative";
    }

    if (current < trailers.length - 1) {
      left.style.visibility = "visible";
      left.style.position = "relative";
    }
  }

  if (elementType == "left") {
    current = current > 0 ? current - 1 : 0;
    items.value.trailer = `https://www.youtube.com/embed/${trailers[current].key}`;
    if (current == 0) {
      left.style.visibility = "hidden";
      left.style.position = "absolute";
      right.style.visibility = "visible";
    }

    if (current > 0) {
      right.style.visibility = "visible";
    }
  }
}

async function createDetails() {
  let info = await axios({
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${movieId}`,
    params: {
      api_key: API_KEY,
      append_to_response: "videos",
    },
  }).catch((err) => {
    console.log(err);
  });

  console.log(info);
  if (info) {
    info = info.data;
    items.value = info;

    items.budget = info.budget;
    trailers = info.videos.results.filter((video) => video.type == "Trailer");
    if (trailers && trailers.length >= 1) {
      items.value.trailer = `https://www.youtube.com/embed/${trailers[0].key}`;
      isTrailer.value = true;
      console.log(items.trailer);
    }
  }
}
</script>

<template>
  <select selected v-model="movieId" @change="createDetails">
    <option value="" selected hidden></option>
    <option value="550">Fight Club</option>
    <option value="551">The Poseidon Adventure</option>
    <option value="552">Bread and Tulips</option>
    <option value="594767">Shazam! Fury of the Gods</option>
    <option value="554">The Cuckoo</option>
    <option value="502356">The Super Mario Bros. Movie</option>
    <option value="557">Spider-Man</option>
    <option value="558">Spider-Man 2</option>
    <option value="559">Spider-Man 3</option>
    <option value="361743">Top Gun: Maverick</option>
  </select>
  <button>GET</button>
  <div id="movie" v-if="items">
    <h3 id="title">{{ items.title }}</h3>
    <h3 id="description">{{ items.overview }}</h3>
    <img id="poster" :src="`https://image.tmdb.org/t/p/original${items.poster_path}`" />
    <div id="trailer" v-if="isTrailer">
      <h3 id="left" @click="movieClick($event)">&lt</h3>
      <iframe id="movie" :src="items.trailer"></iframe>
      <h3 id="right" @click="movieClick($event)">></h3>
    </div>
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
            items.revenue - items.budget < 0
              ? "-$" + Math.abs(items.revenue - items.budget)
              : "$" + (items.revenue - items.budget)
          }}
        </h4>
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
    <div id="langauge"></div>
  </div>
</template>

<style scoped>
#trailer {
  display: flex;
  align-items: center;
  gap: 5px;
}
#right {
  display: inline;
}
#left {
  display: inline;
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
