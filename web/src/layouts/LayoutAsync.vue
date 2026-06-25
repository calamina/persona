<script setup lang="ts">
import LoadingContent from '../components/LoadingContent.vue'
import LayoutWindow from './LayoutWindow.vue'
</script>

<template>
  <Suspense>
    <template #default>
      <Transition mode="out-in" appear>
        <slot />
      </Transition>
    </template>

    <template #fallback>
      <Transition mode="out-in" appear>
        <LayoutWindow>
          <LoadingContent />
        </LayoutWindow>
      </Transition>
    </template>
  </Suspense>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.085s ease-out,
    transform 0.085s ease-out;
}

.v-enter-from {
  opacity: 0.5;
  transform: translateY(-0.3rem);
}
.v-leave-to {
  opacity: 0;
  transform: translateY(0.3rem);
}
</style>
