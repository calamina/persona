<script setup lang="ts">
import Logout from './Logout.vue'
import User from './User.vue'
import ThemeSwitch from '../theme/ThemeSwitch.vue'
import Search from './Search.vue'
</script>

<template>
  <div class="bar">
    <Suspense>
      <User class="element" />
    </Suspense>
    <Search class="element" />
    <div class="actions">
      <ThemeSwitch class="element" />
      <Logout class="element" />
    </div>
  </div>
</template>

<style scoped>
.bar {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  flex-shrink: 0;
  place-self: center;
  align-items: center;
  justify-content: space-between;
  gap: var(--dashboard-spacing);
  height: var(--title-height);
}

.element {
  display: flex;
  place-items: center;
  height: var(--header-size);
  border: var(--border-header);
  /* background-color: var(--header-bg); */
  overflow: hidden;
  border-radius: var(--border-radius);
  height: 100%;
}

.actions {
  justify-self: end;
  width: fit-content;
  display: flex;
  gap: var(--dashboard-spacing);
  height: 100%;
}
</style>
