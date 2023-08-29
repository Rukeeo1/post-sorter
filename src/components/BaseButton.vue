<template lang="">
  <button :class="buttonClass" @click="handleClick">
    <slot></slot>
  </button>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary' 
  }
})

const buttonClass = computed(() => {
  return `btn btn-${props.variant}`
})


</script>
<style lang="scss" scoped>
.btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  height: 54px;
  font-size: 1.1875em;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;

  &-primary {

    background: $green;
    color: $black;

    &:hover {
      background-color: darken($green, 10%);
    }
  }

  &-secondary {
    background-color: $gray100;
    color: $white;
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>
