import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useMovieStore = defineStore("movieId", {
  state: () => ({
    movies: [],
    cart: undefined,
    user: useLocalStorage("user", null),
  }),

  actions: {
    addToCart(data) {
      this.$state.cart[data.id] = data;
      console.log("DATA: ", this.cart[data.id]);
    },

    removeFromCart(data) {
      console.log(this.cart[data.id]);
      if (this.cart[data.id]) {
        delete this.cart[data.id];
      }
    },
  },
});
