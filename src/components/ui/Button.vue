<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
    variant: {
        type: String,
        default: "primary",
    },
    fixedSize: {
        type: Boolean,
        default: false,
    }
});
</script>
<template>
    <button :class="[variant, { 'fixed-size': fixedSize }]">
        <slot name="icon"></slot>
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.primary {
    background-color: $color-primary-bg-button;

    &:hover {
        background-color: $color-primary-bg-button-hover;
    }
}

.primary-no-hover {
    background-color: $color-primary-bg-button;
}

.secondary {
    background-color: $color-secondary-bg-button;
}

button {
    @include center-elements;
    gap: 8px;
}

.fixed-size {
    width: 275px;

}
</style>