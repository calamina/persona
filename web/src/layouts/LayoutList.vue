<script setup lang="ts">
const { fit, space } = defineProps<{ fit?: boolean; space?: boolean }>()
</script>

<template>
  <div class="list" :class="{ fit, space }">
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

  &.space {
    gap: calc(var(--list-gap) * 2.5);
  }
}
</style>
