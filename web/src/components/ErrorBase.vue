<script setup lang="ts">
const { errorMessage } = defineProps<{
  errorMessage: string | null
}>()
</script>

<template>
  <p>{{ errorMessage }}</p>
</template>

<style scoped>
p {
  color: var(--color-highlight);
  margin-top: 0.3rem;
  text-align: center;

  &:empty {
    display: none;
  }
}
</style>
