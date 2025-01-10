<script setup lang="ts">
import { defineProps } from 'vue';
defineProps<{
    pokemonName: string;
    isFavorite: Boolean;
}>();

const emit = defineEmits<{
    (event: 'clicked'): void;
}>();

const handelClick = () => {
    emit('clicked');
};


</script>
<template>
    <div class="container-card">
        <h3>{{ pokemonName }}</h3>
        <div class="button-circle" @click.stop="handelClick">
            <i class="icon">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11.6052 0.904438L8.43178 7.62704L1.33161 8.70855C0.0583408 8.9015 -0.451939 10.5415 0.471424 11.4809L5.60824 16.7107L4.39329 24.0984C4.1746 25.4338 5.52076 26.4341 6.64824 25.8096L13 22.3213L19.3518 25.8096C20.4792 26.429 21.8254 25.4338 21.6067 24.0984L20.3918 16.7107L25.5286 11.4809C26.4519 10.5415 25.9417 8.9015 24.6684 8.70855L17.5682 7.62704L14.3948 0.904438C13.8262 -0.293851 12.1787 -0.309084 11.6052 0.904438Z"
                        :fill="isFavorite ? '#ECA539' : '#BFBFBF'" />
                </svg>
            </i>
        </div>
    </div>
</template>
<style lang="scss" scoped>
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.container-card {
    background-color: $color-white-footer;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    width: 100%;
    text-transform: capitalize;
    margin-bottom: 12px;
    padding: 0 12px 0 20px;
    cursor: pointer;

    .button-circle {
        background-color: $color-btn-favorite;
        border-radius: 50%;
        height: 44px;
        width: 44px;
        cursor: pointer;
        @include center-elements;

    }

}
</style>