import { defineStore } from "pinia";
import { ref } from "vue"
import { useLocalStorage } from "@vueuse/core";

export const useMovieStore = defineStore("movieId", {
    state: () =>  ({
        movies: [],
        cart: useLocalStorage("cart", {}),
        loggedIn: useLocalStorage("login", false)
    }),

    actions: ({
        addToCart(data) {
            this.$state.cart[data.id] = data
            console.log("DATA: ",this.cart[data.id])
        },

        removeFromCart(data) {
            console.log(this.cart[data.id])
            if (this.cart[data.id]) {
                console.log("Removed?")
                delete this.cart[data.id]
            }
        }
    })
})