<script setup lang="ts">
import Logout from './Logout.vue'
import User from './User.vue'
</script>

<template>
  <div>
    <Suspense>
      <User />
    </Suspense>
    <Logout />
  </div>
</template>

<style scoped>
div {
  width: 100%;
  display: flex;
  flex-shrink: 0;
  place-self: center;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing);
  height: var(--header-size);
  border: var(--border-header);
  background-color: var(--element);
  overflow: hidden;
  border-radius: var(--border-radius);
}
</style>
