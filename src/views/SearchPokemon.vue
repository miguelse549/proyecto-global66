<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { PokemonList, PokemonDetailFiltered } from '../services/interfaces';
import { getListPokemon, getDetailsPokemon } from '../services/pokemon-api.ts';
import { useListFavoriteStore } from "../stores/favorites-store.ts";
const search = ref<string>('');
const pokemons = ref<PokemonList[]>([]);
const pokemon = ref<PokemonDetailFiltered | null>(null);
const error = ref<string | null>(null);

const store = useListFavoriteStore();
const isFavorite = (name: string) => store.isFavorite(name);


const getPokemons = async () => {
    try {
        pokemons.value = await getListPokemon();

        console.log(pokemons.value);

    } catch (err) {
        error.value = "No se pudo cargar la lista de Pokémon.";
        console.error(err);
    }
};

const getDataPokemon = async () => {
    try {
        pokemon.value = await getDetailsPokemon('ivysaur');
        console.log(pokemon.value);

    } catch (err) {
        error.value = "No se pudo cargar la lista de Pokémon.";
        console.error(err);
    }
};

const toggleFavorite = (pokemon: PokemonList) => {
    store.toggleFavorite(pokemon);
};


onMounted(() => {
    getPokemons();
    getDataPokemon();
});

</script>

<template>
    <div>
        <input v-model="search" placeholder="Buscar Pokémon..." />
        <div v-for="pokemon in pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()))"
            :key="pokemon.name">
            <p>{{ pokemon.name }}</p>
            <button @click="toggleFavorite(pokemon)">
                {{ isFavorite(pokemon.name) ? "Quitar de favoritos" : "Agregar a favoritos" }}
            </button>
        </div>

    </div>
</template>
