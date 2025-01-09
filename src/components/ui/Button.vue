<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
    variant: {
        type: String,
        default: "primary",
    },
});
</script>
<template>
    <button :class="variant">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
@use "../../styles/variables" as *;

.primary {
    background-color: $color-primary-bg-button;

    &:hover {
        background-color: $color-primary-bg-button-hover;
    }
}

.secondary {
    background-color: $color-secondary-bg-button;
}
</style>