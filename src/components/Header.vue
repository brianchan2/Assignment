<script setup>
import { useRouter } from "vue-router"
import { signOut } from "@firebase/auth";
import { auth } from "../firebase"

const router = useRouter()
</script>

<template>
	<header>
		<img src="data:image/png;base64,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" @click="router.push('/')">
		<button @click="router.push('/login'); user.value = auth.currentUser" v-if="!auth.currentUser">Login</button>
		<button @click="signOut(auth); router.push('/');" v-if="auth.currentUser">Logout</button>
	</header>
</template>

<style scoped>
header {
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
	height: 3rem;
	background-color: rgb(50, 50, 50);
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