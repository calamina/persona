<script setup lang="ts">
import IconBase from './icons/IconBase.vue'
</script>

<template>
  <div class="loading">
    Loading
    <IconBase name="loading" />
  </div>
</template>

<style scoped>
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
</style>
