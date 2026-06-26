<script setup lang="ts">
const { fit } = defineProps<{ fit?: boolean }>()
</script>

<template>
  <div class="list" :class="{ fit }">
    <slot />
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-flow: column;
  padding: var(--spacing-list-vr) var(--spacing-list-hr);
  gap: var(--list-gap);

  &.fit {
    height: fit-content;
  }
}
</style>
