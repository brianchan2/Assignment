import { defineStore } from "pinia";
import { ref } from "vue"

export const useMovieStore = defineStore("movieId", () => {
    const data = ref({
        movies: [],
        cart: []
    })

    return data.value
})