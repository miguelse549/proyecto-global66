import { defineStore } from "pinia";
import type { PokemonList } from "../services/interfaces";

export const useListFavoriteStore = defineStore("listFavorite", {
  state: () => ({
    favorites: [] as PokemonList[],
  }),
  getters: {
    isFavorite: (state) => (name: string) => {
      return state.favorites.some((pokemon) => pokemon.name === name);
    },
  },
  actions: {
    addFavorite(pokemon: PokemonList) {
      if (!this.isFavorite(pokemon.name)) {
        this.favorites.push(pokemon);
      }
      console.log(this.favorites);
    },
    removeFavorite(name: string) {
      this.favorites = this.favorites.filter(
        (pokemon) => pokemon.name !== name
      );
    },
    toggleFavorite(pokemon: PokemonList) {
      if (this.isFavorite(pokemon.name)) {
        this.removeFavorite(pokemon.name);
      } else {
        this.addFavorite(pokemon);
      }
    },
  },
});
