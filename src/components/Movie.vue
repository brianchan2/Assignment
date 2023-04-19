<script setup>
import { ref } from "vue";

const title = ref();
const isTrailer = ref();
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
    url: `https://api.themoviedb.org/3/movie/${movieid}`,
    params: {
      api_key: API_KEY,
      append_to_response: "videos",
    },
  }).catch((err) => {
    console.log(err);
  });

  title.value = "Broken";
}

createDetails();
</script>

<template>
  <div id="movie">
    <h3 id="title">{{ title }}</h3>
    <div id="trailer" v-if="isTrailer">
      <h3 id="left">&lt</h3>
      <iframe id="movie"> </iframe>
      <h3 id="right">></h3>
    </div>
    <div id="income"></div>
    <h4 id="popularity"></h4>
    <h4 id="rating"></h4>
    <h4 id="release"></h4>
    <h4 id="duration"></h4>
    <div id="genres"></div>
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
</style>
