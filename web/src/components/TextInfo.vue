<script setup lang="ts">
import TextBase from './TextBase.vue'
</script>

<template>
  <TextBase margin="md" class="center">
    <slot />
  </TextBase>
</template>

<style scoped>
.center {
  text-align: center;
}
</style>
