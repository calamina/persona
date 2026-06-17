<script setup lang="ts">
import IconBase from '../components/icons/IconBase.vue'

const { title } = defineProps<{ title: string }>()
</script>

<template>
  <div class="window">
    <h2>{{ title }}</h2>
    <Transition mode="out-in">
      <Suspense>
        <slot></slot>
        <template #fallback>
          <div class="loading">
            Loading
            <IconBase name="loading" />
          </div>
        </template>
      </Suspense>
    </Transition>
  </div>
</template>

<style scoped>
.window {
  position: relative;
  background-color: var(--element);
  border: 2.5px solid var(--border);
  border-radius: 0.6rem;
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  flex: 1;
}

h2 {
  font-size: 1rem;
  font-weight: 300;
  border-bottom: 2.5px solid var(--border);
  padding: 0 0.6rem;
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
