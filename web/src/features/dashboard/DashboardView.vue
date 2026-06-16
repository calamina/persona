<script setup lang="ts">
import FavoriteFeature from '../favorites/FavoriteFeature.vue'
import FeedFeature from '../feed/FeedFeature.vue'
import DashboardHeader from './DashboardHeader.vue'
</script>

<template>
  <div class="dashboard">
    <DashboardHeader />
    <div class="elements">
      <Suspense>
        <FavoriteFeature />
      </Suspense>
      <Suspense>
        <FeedFeature />
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
  height: 100svh;
  display: grid;
  padding: var(--spacing);
  gap: var(--spacing);
  grid-template-rows: var(--header-size) auto auto;
  grid-template-rows: var(--header-size) auto var(--header-size);
  grid-template-columns: 1fr;
}

.elements {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}
</style>
