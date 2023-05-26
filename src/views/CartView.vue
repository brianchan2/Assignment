<script setup>
import { useMovieStore } from "../stores/movie";
import Header from "../components/Header.vue"
import Footer from "../components/Footer.vue"

const movieData = useMovieStore()
</script>

<template>
	<Header />
	<div id="header">
		<h1>Your cart:</h1>
		<h1>{{ `${Object.keys(JSON.parse(JSON.stringify(movieData.cart))).length} Items` }}</h1>
	</div>

	<div id="movies">
		<div @click="movieData.removeFromCart(movie)" id="movie" v-for="movie in movieData.cart">
			<h4 class="close">x</h4>
			<img :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" />
			<h1>{{ movie.title }}</h1>
		</div>
	</div>
	<Footer />
</template>

<style scoped>
#header {
	display: flex;
	margin: 2rem;
}

#header h1:nth-child(2) {
	margin-left: auto;
	margin-right: 2rem;
}

.close {
	user-select: none;
	position: relative;
	top: 5%;
	left: 90%;
	width: 1rem;
	height: 1rem;
	border-radius: 100%;
	background-color: gray;
	text-align: center;
}

Footer {
	bottom: 0;
}

#movies {
	display: flex;
	flex-direction: row;
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