<script setup lang="ts">
const { name } = defineProps<{ name: string }>()
</script>

<template>
  <div>
    <span>@ </span>
    <p>{{ name }}</p>
  </div>
</template>

<style scoped>
div {
  display: flex;
  gap: 1ch;
}

span {
  color: var(--bg-dim);
}

p {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
