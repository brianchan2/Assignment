import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { firestore, auth } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

export const useMovieStore = defineStore("movieId", {
  state: () => ({
    movies: [],
    cart: useLocalStorage("cart", {}),
  }),

  actions: {
    async addToCart(data) {
      this.cart[data.id] = data;
      await setDoc(doc(firestore, "cart", auth.currentUser.email), this.cart);
    },

    async removeFromCart(data) {
      if (this.cart[data.id]) {
        delete this.cart[data.id];
        await setDoc(doc(firestore, "cart", auth.currentUser.email), this.cart);
      }
    },
  },
});
