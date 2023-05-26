<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useMovieStore } from "../stores/movie"

const router = useRouter()
const username = ref("")
const password = ref("")
const invalid = ref(false)
const data = useMovieStore()

const checkPass = () => {
	if (username.value == "tmdb") {
		if (password.value == "movies") {
			router.push("/store")
			data.loggedIn = true
		}
	}
	else {
		invalid.value = true
		setTimeout(() => {
			invalid.value = false
		}, 1500)
	}
}

if (data.loggedIn) {
	router.push("/store")
}

</script>

<template>
	<h3 @click="router.push('/')">&lt-- Go back</h3>
	<div id="wrapper">
		<div id="menu">
			<div id="content">
				<h1>Login</h1>
				<input v-model="username" placeholder="Username" type="text">
				<input v-model="password" placeholder="Password" type="password">
				<button @click="checkPass()">Login</button>
				<h4 v-if="invalid">Invalid Credentials. Did you correctly type your credentials?</h4>
			</div>
		</div>
	</div>
</template>

<style scoped>
#wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	min-height: 100vh;
}

h3 {
	position: absolute;
	top: 10px;
	left: 10px;
	user-select: none;
	text-decoration: underline;
}

h4 {
	color: red;
	font-weight: lighter;
}

input {
	width: 80%;
	height: 5vh;
	background-color: rgb(50, 50, 50);
	border: none;
	color: white;
	padding-left: 10px;
}

::placeholder {
	color: white;
	font-weight: bold;
}

#menu {
	background-color: rgba(0, 0, 0, 0.5);
	width: 20%;
	padding-bottom: 5%;
	border-radius: 3%;
}

button {
	width: 80%;
	height: 5vh;
	background-color: rgb(50, 50, 50);
	border: none;
	color: white;
	padding-left: 10px;
}

#content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 110%;
	gap: 2rem;
	margin: 1rem;

}
</style>