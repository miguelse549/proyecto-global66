<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import Button from '../components/ui/Button.vue';
import CardPokemon from '../components/ui/CardPokemon.vue';
import Input from '../components/ui/Input.vue';
import type { PokemonList, PokemonDetailFiltered } from '../services/interfaces.ts';
import { getListPokemon, getDetailsPokemon } from '../services/pokemon-api.ts';
import { useListFavoriteStore } from "../stores/favorites-store.ts";
const search = ref<string>('');
const pokemons = ref<PokemonList[]>([]);
const pokemon = ref<PokemonDetailFiltered | null>(null);
const error = ref<string | null>(null);
const filter = ref<'all' | 'favorites'>('all');


const store = useListFavoriteStore();

const filteredPokemons = computed(() => {
    let filtered = pokemons.value.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.value.toLowerCase())
    );
    if (filter.value === 'favorites') {
        filtered = filtered.filter(pokemon => store.isFavorite(pokemon.name));
    }
    return filtered;
});

const getPokemons = async () => {
    try {
        pokemons.value = await getListPokemon();
    } catch (err) {
        error.value = "No se pudo cargar la lista de Pokémon.";
        console.error(err);
    }
};

const getDataPokemon = async (pokemonName: string) => {
    try {
        pokemon.value = await getDetailsPokemon(pokemonName);
        pokemon.value.isFavorite = store.isFavorite(pokemonName);
        console.log(pokemon.value);

    } catch (err) {
        error.value = "No se pudo cargar la lista de Pokémon.";
        console.error(err);
    }
};

const toggleFavorite = (pokemon: PokemonList) => {


    console.log(pokemon)
    store.toggleFavorite(pokemon);
    console.log(store.isFavorite(pokemon.name));

    const pokemonInList = pokemons.value.find(p => p.name === pokemon.name);
    console.log(pokemonInList);
    if (pokemonInList) {
        pokemonInList.isFavorite = store.isFavorite(pokemon.name);
    }
};


const setFilter = (newFilter: 'all' | 'favorites') => {
    filter.value = newFilter;
};



onMounted(() => {
    getPokemons();
});

</script>

<template>

    <div class="container">
        <header>
            <div class="header-content">
                <Input v-model="search"></Input>
            </div>
        </header>

        <main>
            <div class="main-content">
                <CardPokemon @clicked="toggleFavorite(pokemon)" @click="getDataPokemon(pokemon.name)"
                    v-for="pokemon in filteredPokemons" :key="pokemon.name" :isFavorite="pokemon.isFavorite"
                    :pokemonName="pokemon.name">
                </CardPokemon>
            </div>
        </main>

        <footer>
            <div class="footer-content">
                <Button @click="setFilter('all')">All</Button>
                <Button @click="setFilter('favorites')">Favorites</Button>
            </div>
        </footer>
    </div>

</template>

<style lang="scss" scoped>
@use "../styles/variables" as *;
@use "../styles/mixins" as *;


.container {

    display: flex;
    flex-direction: column;
    height: 100%;

    header,
    main,
    footer {
        @include center-elements;
    }

    header {
        height: 110px;
        background-color: $color-white;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;


        .header-content {
            @include center-elements;
        }
    }

    .header-content,
    .main-content,
    .footer-content {
        width: 570px;
        max-width: 85%;
    }

    main {
        padding-top: 110px;
        padding-bottom: 80px;
        overflow-y: auto;
        position: relative;
        flex-grow: 1;

    }

    footer {
        height: 80px;
        background-color: $color-white-footer;
        box-shadow: 0px -5px 4px 0px #0000000D;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 10;

        .footer-content {
            display: flex;
            justify-content: center;
            gap: 20px;
        }
    }

}
</style>