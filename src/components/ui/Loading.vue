<template>
    <div class="loading">
        <img src="../../assets/img/img-loading.svg" />
    </div>
</template>

<style lang="scss" scoped>
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.loading {

    @include center-elements;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
}

img {
    animation: jump 1s ease-in-out infinite;

}

@keyframes jump {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-20px);
    }
}
</style>
