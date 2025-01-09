<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

defineProps({
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '' },

})

const emit = defineEmits(['update:modelValue'])

const emitUpdate = (val: string) => {

    console.log(val)
    emit('update:modelValue', val)
}
</script>
<template>
    <div class="main">
        <input @input="emitUpdate(($event.target as HTMLInputElement).value)" :value="modelValue" type="text"
            placeholder="Search" />
        <i>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="currentColor" class="size-4">
                <path fill-rule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clip-rule="evenodd" />
            </svg>
        </i>
    </div>
</template>

<style lang="scss" scoped>
@use "../../styles/variables" as *;

.main {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    box-shadow: 0px 2px 10px 0px #0000000A;

    i {
        position: absolute;
        left: 10px;
        color: $color-placeholder-input;
        width: 18px;
        height: 18px;

    }

    input {
        height: 50px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        padding-left: 40px;
        padding-right: 10px;
        width: 100%;

        &:focus {
            outline: none;
        }

        &::placeholder {
            color: $color-placeholder-input;

        }
    }
}
</style>
