<script setup lang="ts">
import IconBase from '../components/icons/IconBase.vue'

const { title } = defineProps<{ title: string }>()
</script>

<template>
  <div class="window">
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
.content {
  flex-shrink: 0;
  overflow-y: auto;
  scrollbar-color: var(--color) transparent;
  flex: 1;

  @media (max-width: 1250px) {
    max-height: 30svh;
  }
}

.window {
  background-color: var(--element);
  border: var(--border);
  border-radius: var(--spacing);
  display: flex;
  flex-flow: column;
  overflow: hidden;
  height: 100%;
  max-height: calc(100svh - var(--header-size) - 1.8rem);
}

h2 {
  font-size: 1rem;
  font-weight: 300;
  border-bottom: var(--border);
  padding: 0 var(--spacing);
  height: var(--header-size);
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  background-color: var(--element);
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
