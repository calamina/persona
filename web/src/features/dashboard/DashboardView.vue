<script setup lang="ts">
import FavoriteFeature from '../favorites/FavoriteFeature.vue'
import YoutubeFeed from '../youtube/YoutubeFeed.vue'
import DashboardHeader from './DashboardHeader.vue'
</script>

<template>
  <div class="dashboard">
    <DashboardHeader />
    <div class="elements">
      <Suspense>
        <FavoriteFeature class="col2" />
      </Suspense>
      <Suspense>
        <YoutubeFeed class="col3" />
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
  grid-template-columns: 8rem 1fr 1fr 8rem;
  align-items: center;
  gap: 8rem;
  /* grid-template-columns: auto auto; */
}

.col2 {
  grid-column: 2;
}
.col3 {
  grid-column: 3;
}
</style>
