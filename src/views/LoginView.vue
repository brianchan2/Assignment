<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMovieStore } from "../stores/movie";
import { auth, firestore } from "../firebase";
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { getDoc, doc } from "@firebase/firestore";

const router = useRouter()
const username = ref("")
const password = ref("")
const invalid = ref(false)
const data = useMovieStore()

const login = async (type) => {
	if (type == "email") {
		try {
			const { user } = await signInWithEmailAndPassword(
				auth,
				email.value,
				passwordOne.value
			);
			store.user = user;
			router.push("/store");
		} catch (error) {
			console.log(error);
		}
	}

	if (type == "google") {
		const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    const cart = await getDoc(doc(firestore, "carts", user.email)).data()

    data.cart = cart
		data.user = user;
    router.push("/store")
	}
}

const register = async(type) => {
  if (type == "email") {
		try {
			const { user } = await signInWithEmailAndPassword(
				auth,
				email.value,
				passwordOne.value
			);
			store.user = user;
			router.push("/store");
		} catch (error) {
			console.log(error);
		}
	}

	if (type == "google") {
		const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);

    store.user = user;
    router.push("/store");
	}
}


if (auth.currentUser) {
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
        <button @click="login('email')">Login</button>
        <div id="alt-login">
          <button @click="login('google');"><img id="google-icon" src="https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png"></button>
          <button @click="login('google')"></button>
        </div>
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

#google-icon {
  width: 2rem;
  height: 2rem;
}

#alt-login {
  width: 80%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-evenly;
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
	width: 30%;
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