<script setup lang="ts">
const { id, label } = defineProps<{
  id: string
  label: string
}>()
</script>

<template>
  <label :for="id">{{ label }}</label>
</template>

<style scoped>
label {
  line-height: 1.1rem;
  font-size: 0.9rem;
  color: var(--color-dim);
  color: var(--color);
}
</style>
