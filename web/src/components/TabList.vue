<script setup lang="ts">
defineProps<{
  tabs: readonly string[]
}>()

const activeTab = defineModel<string>({ required: true })
</script>

<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      :key="tab"
      class="tab"
      role="tab"
      :class="{ active: activeTab === tab }"
      @click="activeTab = tab"
    >
      {{ tab }}
    </button>
  </div>
</template>

<style scoped>
/* Keep your existing CSS exactly as it is */
.tabs {
  flex-shrink: 0;
  display: flex;
  height: var(--icon-size);
  overflow: hidden;
}
.tab {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  color: var(--color-dimmer);
  background-color: var(--tab-inactive-bg);
  border-bottom: var(--border);
  border-right: var(--border);

  &:last-child {
    border-right: none;
  }
  &:hover,
  &:focus-within,
  &.active {
    color: var(--color);
    background-color: var(--tab-active-bg);
  }
  &.active {
    border-bottom-color: transparent;
    &::before,
    &::after {
      content: '=';
      opacity: 0.4;
    }
    &::before {
      margin-right: 1ch;
    }
    &::after {
      margin-left: 1ch;
    }
  }
}
</style>
