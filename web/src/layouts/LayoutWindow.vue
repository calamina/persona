<script setup lang="ts">
import { ref } from 'vue'
import IconBase from '../components/icons/IconBase.vue'
import type { IconName } from '../utils/icon.ts'
// import { computed, ref } from 'vue'

const {
  title,
  icon,
  fit,
  // collapse = true,
} = defineProps<{
  title?: string
  icon?: IconName
  fit?: boolean
  collapse?: boolean
}>()

const toggled = ref(true)
const fullscreen = ref(false)
// const screenIcon = computed((): IconName => (fullscreen.value ? 'fold' : 'fullscreen'))
</script>

<template>
  <div class="window" :class="{ fit: fit || !toggled, fullscreen }">
    <h2 v-if="title" :class="{ borderless: !toggled }">
      <IconBase v-if="icon" :name="icon" class="title-icon" />
      {{ title ?? '' }}
      <div class="actions">
        <slot class="action" name="action" />
        <!-- <button class="action" @click="toggled = !toggled" v-if="collapse && !fullscreen">
          <IconBase name="fold" />
        </button>
        <button class="action" @click="fullscreen = !fullscreen" v-if="collapse">
          <IconBase :name="screenIcon" :key="screenIcon" />
        </button> -->
      </div>
    </h2>
    <slot name="tabs" v-if="toggled || fullscreen" />
    <div class="content" v-if="toggled || fullscreen">
      <slot />
    </div>
    <div class="footer" v-if="(toggled || fullscreen) && $slots.footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.window {
  position: relative;
  background-color: var(--element);
  border: var(--dashboard-border);
  border-radius: var(--border-radius);
  display: flex;
  flex-flow: column;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  /* 
  &.fullscreen {
    position: absolute;
    top: calc(var(--header-size) + 2 * var(--dashboard-spacing));
    left: var(--dashboard-spacing);
    right: var(--dashboard-spacing);
    bottom: var(--dashboard-spacing);
    height: calc(100% - (var(--header-size) + 3 * var(--dashboard-spacing)));
    width: calc(100% - 2 * var(--dashboard-spacing));
    z-index: 2;
  } */
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
  color: var(--color);
  /* color: var(--title-color); */
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
  color: var(--title-color);
}

button {
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  background-color: transparent;
  height: var(--title-height);
  width: var(--title-height);
  cursor: pointer;
}

.action {
  width: fit-content;
}

.actions {
  width: fit-content;
  margin-left: auto;
  display: flex;
}
</style>
