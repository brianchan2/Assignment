<script setup>
import { ref } from "vue";
import axios from "axios";
import { API_KEY } from "../config.js";

const items = {
  title: ref(),
  trailer: ref(),
  income: ref(),
  genres: ref(),
  popular: ref(),
  rating: ref(),
  release: ref(),
  duration: ref(),
  budget: ref(),
  revenue: ref(),
};

const isTrailer = ref();
let movieId = 550;
isTrailer.value = false;

async function getTrailers(videos) {
  let trailer = videos.results.filter((video) => video.type == "Trailer");
  let current = 0;
  if (trailer.length) {
    let iframe = document.getElementById("movie");
    iframe.src = `https://www.youtube.com/embed/${trailer[0].key}`;
    iframe.style.display = "inline";
    if (trailer.length > 1) {
      let left = document.querySelector("#left");
      let right = document.querySelector("#right");

      right.addEventListener("click", () => {
        current = current >= trailer.length - 1 ? trailer.length - 1 : current + 1;
        iframe.src = `https://www.youtube.com/embed/${trailer[current].key}`;

        if (current == trailer.length - 1) {
          right.style.visibility = "hidden";
          left.style.visibility = "visible";
          left.style.position = "relative";
        }

        if (current < trailer.length - 1) {
          left.style.visibility = "visible";
          left.style.position = "relative";
        }
      });

      left.addEventListener("click", () => {
        current = current >= 0 ? current - 1 : 0;
        iframe.src = `https://www.youtube.com/embed/${trailer[current].key}`;
        if (current == 0) {
          left.style.visibility = "hidden";
          left.style.position = "absolute";
          right.style.visibility = "visible";
        }

        if (current > 0) {
          right.style.visibility = "visible";
        }
      });
    }
  } else {
    frame.remove();
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
    items.title.value = info.title;
    items.trailer.value = info.videos;
    items.duration.value = info.duration;
    items.genres.value = info.genres;
    items.rating.value = info.vote_average;
    items.popular.value = info.popularity;
    items.revenue.value = info.revenue;
    items.budget.value = info.budget;
  }

  console.log(items["title"].value);
}

createDetails();
</script>

<template>
  <div id="movie">
    <h3 id="title">{{ items.title.value }}</h3>
    <div id="trailer" v-if="isTrailer">
      <h3 id="left">&lt</h3>
      <iframe id="movie"> </iframe>
      <h3 id="right">></h3>
    </div>
    <div id="income">
      <div>
        <h4>Budget</h4>
        <h4>{{ "$" + items.budget.value }}</h4>
      </div>
      <div>
        <h4>Revenue</h4>
        <h4>{{ "$" + items.revenue.value }}</h4>
      </div>
      <div>
        <h4>Net</h4>
        <h4>
          {{
            items.revenue.value - items.budget.value < 0
              ? "-$" + Math.abs(items.revenue.value - items.budget.value)
              : "$" + (items.revenue.value - items.budget.value)
          }}
        </h4>
      </div>
    </div>
    <div id="popularity">
      <h3>Popularity</h3>
      <h3>{{ Math.round(items["popular"].value) }}</h3>
    </div>
    <div id="rating">
      <h3>Rating</h3>
      <h3>{{ `${Math.round(items["rating"].value)} / 10` }}</h3>
    </div>
    <h4 id="release"></h4>
    <h4 id="duration"></h4>
    <div id="genres" v-for="genre of items.genres.value">
      <h5 class="tag">{{ genre.name }}</h5>
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

#genres {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

#income {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-direction: row;
}

.tag {
  background-color: grey;
  width: fit-content;
  padding: 0.5rem;
  border-radius: 0.2rem;
  margin: 0.1rem;
  display: inline;
}
</style>
