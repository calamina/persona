<script setup lang="ts">
import { ref } from 'vue'
import IconBase from '../components/icons/IconBase.vue'
import type { IconName } from '../utils/icon.ts'
const { title, icon, fit } = defineProps<{ title?: string; icon?: IconName; fit?: boolean }>()
const toggled = ref(true)
</script>

<template>
  <div class="window" :class="{ fit: fit || !toggled }">
    <h2 :class="{ borderless: !toggled }">
      <IconBase v-if="icon" :name="icon" class="title-icon" />
      {{ title ?? '' }}
      <button @click="toggled = !toggled">
        <IconBase name="fold" />
      </button>
    </h2>
    <slot name="tabs" v-if="toggled" />
    <div class="content" v-if="toggled">
      <slot />
    </div>
    <slot name="actions" class="bottom" />
  </div>
</template>

<style scoped>
.window {
  position: relative;
  background-color: var(--element);
  border: var(--border-dashboard);
  border-radius: var(--border-radius);
  display: flex;
  flex-flow: column;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
}

.content {
  flex-shrink: 0;
  overflow-y: auto;
  scrollbar-color: var(--scroll-color) transparent;
  flex: 1;

  @media (max-width: 1250px) {
    max-height: 100%;
    flex-shrink: 1;
  }
}

.fit {
  overflow: visible;
  height: fit-content;
  flex-shrink: 0;
}

h2 {
  font-size: 1rem;
  font-weight: 300;
  border-bottom: var(--border);
  padding: 0;
  padding-left: var(--title-spacing);
  height: var(--title-height);
  display: flex;
  flex-shrink: 0;
  gap: var(--list-gap);
  justify-content: var(--title-align);
  align-items: center;
  background-color: var(--title-bg);
  color: var(--title-color);
  flex-shrink: 0;
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);

  &.borderless {
    border-bottom-color: transparent;
    border-radius: var(--border-radius);
  }
}

.title-icon {
  height: 1.2rem;
  color: inherit;
}

button {
  display: flex;
  align-items: center;
  margin-left: auto;
  border: none;
  outline: none;
  background-color: transparent;
  height: var(--title-height);
  width: var(--title-height);
  cursor: pointer;
}

.bottom {
  position: sticky;
  bottom: 0;
}
</style>
