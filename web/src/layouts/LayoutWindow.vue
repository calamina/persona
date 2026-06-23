<script setup lang="ts">
import IconBase from '../components/icons/IconBase.vue'

const { title, fit } = defineProps<{ title: string; fit?: boolean }>()
</script>

<template>
  <div class="window" :class="{ fit }">
    <h2>{{ title }}</h2>
    <slot name="tabs" />
    <Transition mode="out-in">
      <div class="content">
        <Suspense>
          <slot />
          <template #fallback>
            <div class="loading">
              Loading
              <IconBase name="loading" />
            </div>
          </template>
        </Suspense>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.window {
  background-color: var(--element);
  border: var(--border-dashboard);
  border-radius: var(--border-radius);
  display: flex;
  flex-flow: column;
  overflow: hidden;
  height: 100%;
}

.content {
  flex-shrink: 0;
  overflow-y: auto;
  scrollbar-color: var(--scroll-color) transparent;
  flex: 1;

  @media (max-width: 1250px) {
    max-height: 30svh;
  }
}

.fit {
  height: fit-content;
  flex-shrink: 0;
}

h2 {
  font-size: 1rem;
  font-weight: 300;
  border-bottom: var(--border);
  padding: 0 var(--title-spacing);
  height: var(--header-size);
  display: flex;
  flex-shrink: 0;
  justify-content: var(--title-align);
  align-items: center;
  background-color: var(--title-color);
}

.loading {
  display: flex;
  flex-flow: column;
  flex: 1;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.15s ease-out,
    transform 0.15s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.v-enter-from {
  transform: translateY(-0.3rem);
}
.v-leave-to {
  transform: translateY(0.3rem);
}
</style>
