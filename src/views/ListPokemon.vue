<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from "vue-router";
import Button from '../components/ui/Button.vue';
import CardPokemon from '../components/ui/CardPokemon.vue';
import Modal from '../components/ui/Modal.vue';
import Loading from '../components/ui/Loading.vue';
import Input from '../components/ui/Input.vue';
import type { PokemonList, PokemonDetailFiltered } from '../services/interfaces.ts';
import { getListPokemon, getDetailsPokemon } from '../services/pokemon-api.ts';
import { useListFavoriteStore } from "../stores/favorites-store.ts";
const search = ref<string>('');
const pokemons = ref<PokemonList[]>([]);
const pokemon = ref<PokemonDetailFiltered | null>(null);
const error = ref<string | null>(null);
const filter = ref<'all' | 'favorites'>('all');
const showModal = ref<boolean>(false);
const showLoading = ref<boolean>(false)

const store = useListFavoriteStore();
const router = useRouter();

const filteredPokemons = computed(() => {
    let filtered = pokemons.value.filter(pokemon =>
        pokemon.name.toLowerCase().includes(search.value.toLowerCase())
    );
    if (filter.value === 'favorites') {
        filtered = filtered.filter(pokemon => store.isFavorite(pokemon.name));
    }
    return filtered;
});


watch(
    () => store.favorites,
    () => {
        pokemons.value = pokemons.value.map(pokemon => ({
            ...pokemon,
            isFavorite: store.isFavorite(pokemon.name)
        }));
    },
    { deep: true }
);
const getPokemons = async () => {
    showLoading.value = true
    try {
        const data = await getListPokemon();
        pokemons.value = data.map((pokemon: PokemonList) => ({
            ...pokemon,
            isFavorite: store.isFavorite(pokemon.name)
        }))
        hideLoading(200)
    } catch (err) {
        showLoading.value = false
        error.value = "No se pudo cargar la lista de Pokémon.";
        console.error(err);
    }
};

const getDataPokemon = async (pokemonName: string) => {
    showLoading.value = true
    try {

        pokemon.value = await getDetailsPokemon(pokemonName);
        pokemon.value.isFavorite = store.isFavorite(pokemonName);
        setTimeout(() => {
            showLoading.value = false;
            showModal.value = true;
        }, 1000);

    } catch (err) {

        error.value = "No se pudo cargar la lista de Pokémon.";
        console.error(err);
        showLoading.value = false
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

const closeModal = () => {
    showModal.value = false;
};

const hideLoading = (timeclose: number) => {
    setTimeout(() => {
        showLoading.value = false
    }, timeclose)
}

const goToBackHome = () => {
    router.push(`/`);
};

onMounted(() => {
    getPokemons();
});

</script>

<template>

    <div class="container">
        <Loading v-if="showLoading"></Loading>
        <Modal v-if="showModal" @close-modal="closeModal" :pokemon="pokemon">
        </Modal>
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
                <div class="main-content-empty" v-if="filteredPokemons.length === 0">

                    <h1> Uh-oh!</h1>
                    <h4>You look lost on your journey!</h4>
                    <Button @click="goToBackHome">Go back home</Button>


                </div>
            </div>

        </main>

        <footer>
            <div class="footer-content">
                <Button @click="setFilter('all')" :fixedSize="true"
                    :variant="filter === 'all' ? 'primary-no-hover' : 'secondary'">

                    <template #icon>
                        <i><svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.4375 16.9231H0.6875C0.505164 16.9231 0.330295 17.0122 0.201364 17.1709C0.0724328 17.3296 0 17.5448 0 17.7692L0 21.1538C0 21.3783 0.0724328 21.5935 0.201364 21.7522C0.330295 21.9109 0.505164 22 0.6875 22H3.4375C3.61984 22 3.7947 21.9109 3.92364 21.7522C4.05257 21.5935 4.125 21.3783 4.125 21.1538V17.7692C4.125 17.5448 4.05257 17.3296 3.92364 17.1709C3.7947 17.0122 3.61984 16.9231 3.4375 16.9231ZM3.4375 0H0.6875C0.505164 0 0.330295 0.0891481 0.201364 0.247833C0.0724328 0.406517 0 0.62174 0 0.846154L0 4.23077C0 4.45518 0.0724328 4.67041 0.201364 4.82909C0.330295 4.98777 0.505164 5.07692 0.6875 5.07692H3.4375C3.61984 5.07692 3.7947 4.98777 3.92364 4.82909C4.05257 4.67041 4.125 4.45518 4.125 4.23077V0.846154C4.125 0.62174 4.05257 0.406517 3.92364 0.247833C3.7947 0.0891481 3.61984 0 3.4375 0ZM3.4375 8.46154H0.6875C0.505164 8.46154 0.330295 8.55069 0.201364 8.70937C0.0724328 8.86806 0 9.08328 0 9.30769L0 12.6923C0 12.9167 0.0724328 13.1319 0.201364 13.2906C0.330295 13.4493 0.505164 13.5385 0.6875 13.5385H3.4375C3.61984 13.5385 3.7947 13.4493 3.92364 13.2906C4.05257 13.1319 4.125 12.9167 4.125 12.6923V9.30769C4.125 9.08328 4.05257 8.86806 3.92364 8.70937C3.7947 8.55069 3.61984 8.46154 3.4375 8.46154ZM21.3125 17.7692H7.5625C7.38016 17.7692 7.2053 17.8584 7.07636 18.0171C6.94743 18.1757 6.875 18.391 6.875 18.6154V20.3077C6.875 20.5321 6.94743 20.7473 7.07636 20.906C7.2053 21.0647 7.38016 21.1538 7.5625 21.1538H21.3125C21.4948 21.1538 21.6697 21.0647 21.7986 20.906C21.9276 20.7473 22 20.5321 22 20.3077V18.6154C22 18.391 21.9276 18.1757 21.7986 18.0171C21.6697 17.8584 21.4948 17.7692 21.3125 17.7692ZM21.3125 0.846154H7.5625C7.38016 0.846154 7.2053 0.935302 7.07636 1.09399C6.94743 1.25267 6.875 1.46789 6.875 1.69231V3.38462C6.875 3.60903 6.94743 3.82425 7.07636 3.98294C7.2053 4.14162 7.38016 4.23077 7.5625 4.23077H21.3125C21.4948 4.23077 21.6697 4.14162 21.7986 3.98294C21.9276 3.82425 22 3.60903 22 3.38462V1.69231C22 1.46789 21.9276 1.25267 21.7986 1.09399C21.6697 0.935302 21.4948 0.846154 21.3125 0.846154ZM21.3125 9.30769H7.5625C7.38016 9.30769 7.2053 9.39684 7.07636 9.55552C6.94743 9.71421 6.875 9.92943 6.875 10.1538V11.8462C6.875 12.0706 6.94743 12.2858 7.07636 12.4445C7.2053 12.6032 7.38016 12.6923 7.5625 12.6923H21.3125C21.4948 12.6923 21.6697 12.6032 21.7986 12.4445C21.9276 12.2858 22 12.0706 22 11.8462V10.1538C22 9.92943 21.9276 9.71421 21.7986 9.55552C21.6697 9.39684 21.4948 9.30769 21.3125 9.30769Z"
                                    fill="white" />
                            </svg>
                        </i>
                    </template>

                    All</Button>
                <Button @click="setFilter('favorites')" :fixedSize="true"
                    :variant="filter === 'favorites' ? 'primary-no-hover' : 'secondary'">
                    <template #icon>
                        <i><svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.81981 0.765294L7.13459 6.45365L1.12675 7.36877C0.0493653 7.53204 -0.38241 8.91975 0.398897 9.71458L4.74543 14.1398L3.7174 20.391C3.53235 21.5209 4.67141 22.3673 5.62543 21.8389L11 18.8873L16.3746 21.8389C17.3286 22.363 18.4677 21.5209 18.2826 20.391L17.2546 14.1398L21.6011 9.71458C22.3824 8.91975 21.9506 7.53204 20.8733 7.36877L14.8654 6.45365L12.1802 0.765294C11.6991 -0.248643 10.305 -0.261532 9.81981 0.765294Z"
                                    fill="white" />
                            </svg>
                        </i>
                    </template>

                    Favorites</Button>
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
    height: 100vh;

    header {
        height: 110px;
        background-color: $color-white;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        @include center-elements;

        .header-content {
            @include center-elements;
            height: 100%;
        }
    }

    .header-content,
    .main-content,
    .footer-content {
        width: 570px;
        max-width: 85%;

    }

    main {
        margin-top: 110px;
        margin-bottom: 85px;
        overflow-y: auto;
        scrollbar-gutter: stable both-edges;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        padding-right: calc(100vw - 100%);

        .main-content {
            flex-direction: column;
        }

        .main-content-empty {

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
        }

    }


    footer {
        height: 80px;
        background-color: $color-white-footer;
        box-shadow: 0px -5px 4px 0px #0000000D;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        @include center-elements;

        .footer-content {
            @include center-elements;
            height: 100%;
            gap: 20px;

        }
    }

}
</style>