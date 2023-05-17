import { defineStore } from "pinia";
import { ref } from "vue"

export const useMovieStore = defineStore("movieId", {
    state: () =>  ({
        movies: [],
        cart: {}
    }),

    actions: ({
        addToCart(data) {
            console.log(data)
            this.cart[data.id] = data
        }
    })
})