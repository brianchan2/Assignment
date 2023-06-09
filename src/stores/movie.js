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
      console.log("DATA: ", this.cart);
      await setDoc(doc(firestore, "cart", auth.currentUser.email), this.cart);
    },

    async removeFromCart(data) {
      console.log(this.cart[data.id]);
      if (this.cart[data.id]) {
        delete this.cart[data.id];
        await setDoc(doc(firestore, "cart", auth.currentUser.email), this.cart);
      }
    },
  },
});
