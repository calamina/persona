<script setup lang="ts">
const {
  type = 'a',
  cover,
  inline,
} = defineProps<{ type?: 'a' | 'button' | 'div'; cover?: boolean; inline?: boolean }>()
</script>

<template>
  <component :is="type" class="item" :class="{ cover, inline }">
    <slot name="visual" />
    <div class="data">
      <slot />
    </div>
  </component>
</template>

<style scoped>
.item {
  text-decoration: none;
  color: var(--color);
  padding: var(--spacing-small);
  border-radius: var(--border-radius-small);
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  gap: var(--item-gap);

  &:hover,
  &:focus-within {
    background-color: var(--element-focus);
  }
}
.data {
  display: flex;
  flex-flow: column;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.cover {
  grid-template-columns: 6rem 1fr;
}

.inline {
  display: flex;

  .data {
    flex-flow: row;
    gap: var(--item-gap);
  }
}
</style>
