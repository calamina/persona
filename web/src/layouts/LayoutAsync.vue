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
      <Transition mode="out-in" name="load" appear>
        <LayoutWindow>
          <LoadingContent />
        </LayoutWindow>
      </Transition>
    </template>
  </Suspense>
</template>
