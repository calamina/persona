<script setup lang="ts">
import { ref } from 'vue'

export interface Tab {
  name: string
  action: (...args: any) => void
}

const { tabs } = defineProps<{
  tabs: Tab[]
}>()

const activeTab = ref<string>(tabs[0]?.name || '')

const switchTab = (tab: Tab) => {
  activeTab.value = tab.name
  tab.action()
}
</script>

<template>
  <div class="tabs">
    <button
      v-for="tab in tabs"
      class="tab"
      :key="tab.name"
      role="tab"
      :class="{ active: activeTab === tab.name }"
      @click="switchTab(tab)"
    >
      {{ tab.name }}
    </button>
  </div>
</template>

<style scoped>
.tabs {
  flex-shrink: 0;
  display: flex;
  height: var(--icon-size);
  /* height: fit-content; */
  /* background-color: var(--tab-wrap-bg); */
  /* border-bottom: var(--border); */
  /* border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius); */
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
  /* border-radius: var(--border-radius); */
  /* height: var(--icon-size); */

  &:last-child {
    border-right: none;
  }

  &:hover,
  &:focus-within,
  &.active {
    color: var(--color);
    background-color: var(--tab-active-bg);
    background-color: var(--element);
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
