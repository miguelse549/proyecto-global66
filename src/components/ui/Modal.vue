<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import Button from './Button.vue';

const props = defineProps({
    name: {
        type: String,
        required: false,
        default: ''
    },
    image: {
        type: String,
        required: false,
        default: ''
    },
    weight: {
        type: Number,
        required: false,
        default: ''
    },
    height: {
        type: Number,
        required: false,
        default: ''
    },
    types: {
        type: String,
        required: false,
        default: ''
    },
    isFavorite: {
        type: Boolean,
        required: false,
        default: false
    }
});

const emit = defineEmits(['close-modal'])

const closeModal = () => {
    emit('close-modal');
};

const sharePokemon = () => {
    const pokemonData = `${props.name},${props.weight}, ${props.height}, ${props.types}`;
    navigator.clipboard.writeText(pokemonData)
        .then(() => {
            alert('Pokemon data copied!');
        })
        .catch((error) => {
            console.error('Error copying data: ', error);
        });
};


</script>

<template>
    <div class="modal">

        <div class="card-modal">
            <i class="icon" @click="closeModal">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M13 0C5.81855 0 0 5.81855 0 13C0 20.1815 5.81855 26 13 26C20.1815 26 26 20.1815 26 13C26 5.81855 20.1815 0 13 0ZM19.3742 16.4125C19.6206 16.6589 19.6206 17.0573 19.3742 17.3036L17.2984 19.3742C17.052 19.6206 16.6536 19.6206 16.4073 19.3742L13 15.9355L9.5875 19.3742C9.34113 19.6206 8.94274 19.6206 8.69637 19.3742L6.62581 17.2984C6.37944 17.052 6.37944 16.6536 6.62581 16.4073L10.0645 13L6.62581 9.5875C6.37944 9.34113 6.37944 8.94274 6.62581 8.69637L8.70161 6.62056C8.94798 6.37419 9.34637 6.37419 9.59274 6.62056L13 10.0645L16.4125 6.62581C16.6589 6.37944 17.0573 6.37944 17.3036 6.62581L19.3794 8.70161C19.6258 8.94798 19.6258 9.34637 19.3794 9.59274L15.9355 13L19.3742 16.4125Z"
                        fill="white" />
                </svg>
            </i>
            <div class="card-modal-header">
                <img style="width: 180px; height: 180px" :src="props.image" alt="image-pokemon" loading="lazy" />
            </div>
            <div class="card-modal-body">
                <p><span>Name:</span> {{ props.name }}</p>
                <hr>
                <p><span>Weight:</span> {{ props.weight }}</p>
                <hr>
                <p><span>Height:</span> {{ props.height }}</p>
                <hr>
                <p><span>Types:</span> {{ props.types }}</p>
                <hr>
            </div>
            <div class="card-modal-actions">
                <Button @click="sharePokemon">Share to my Frieds</Button>
                <div class="card-modal-actions-button">
                    <i class="icon-favorite">
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.6052 0.904438L8.43178 7.62704L1.33161 8.70855C0.0583408 8.9015 -0.451939 10.5415 0.471424 11.4809L5.60824 16.7107L4.39329 24.0984C4.1746 25.4338 5.52076 26.4341 6.64824 25.8096L13 22.3213L19.3518 25.8096C20.4792 26.429 21.8254 25.4338 21.6067 24.0984L20.3918 16.7107L25.5286 11.4809C26.4519 10.5415 25.9417 8.9015 24.6684 8.70855L17.5682 7.62704L14.3948 0.904438C13.8262 -0.293851 12.1787 -0.309084 11.6052 0.904438Z"
                                :fill="props.isFavorite ? '#ECA539' : '#BFBFBF'" />
                        </svg>
                    </i>
                </div>
            </div>

        </div>
    </div>

</template>

<style lang="scss" scoped>
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;


.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.card-modal {
    z-index: 10000;
    height: 506px;
    background-color: $color-bg-white;
    width: 570px;
    max-width: 85%;
    border-radius: 5px;
    position: relative;

    .icon {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }

    .card-modal-header {
        background-image: url("../../assets/img/bg-image.png");
        background-size: cover;
        height: 220px;
        width: 100%;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        @include center-elements;
    }

    .card-modal-body {
        padding: 20px 30px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .card-modal-actions {
        padding: 0 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .card-modal-actions-button {
        background-color: $color-btn-favorite;
        border-radius: 50%;
        height: 44px;
        width: 44px;
        cursor: pointer;
        @include center-elements;

    }

    p {
        text-transform: capitalize;

        span {
            font-weight: bold;
        }
    }

    hr {
        border: 1px solid $color-hr;
    }

}
</style>
