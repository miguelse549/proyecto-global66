<script setup lang="ts">
import Button from '../components/ui/Button.vue';
import { useRouter } from "vue-router";

const router = useRouter();

const goToListPokemon = () => {
    router.push(`/search-pokemon`);
};

</script>

<template>
    <div class="home">
        <div class="home-logo">
            <img src="../assets/img/img-home.svg" alt="logo-pokemon">
        </div>

        <div class="home-content">
            <h2>Welcome to Pokédex</h2>
            <p>
                The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon
                world.
            </p>

            <div class="home-content-button">
                <Button @click="goToListPokemon" :variant="'primary'">Get Started</Button>
            </div>
        </div>


    </div>
</template>

<style lang="scss" scoped>
@use "../styles/variables" as *;
@use "../styles/mixins" as *;

.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100vh;
    padding: 0 30px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;

    .home-content {
        text-align: center;

        h2 {
            margin-bottom: 30px;
        }
    }

    .home-content-button {
        @include center-elements;
        margin-top: 50px;
    }

}
</style>
