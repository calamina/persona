<script setup lang="ts">
import ChanList from '../chan/ChanList.vue'
import FavoriteFeature from '../favorite/FavoriteFeature.vue'
import YoutubeFeed from '../youtube/YoutubeFeed.vue'
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
        <ChanList />
      </Suspense>
      <Suspense>
        <YoutubeFeed />
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
  padding: 3.6rem;
  gap: 2.4rem;
  /* grid-template-rows: var(--header-size) auto auto; */
  /* grid-template-rows: var(--header-size) auto var(--header-size); */
  grid-template-rows: var(--header-size) auto;
  @media (max-width: 1250px) {
    align-items: start;
    height: auto;
  }
}

.elements {
  overflow: hidden;
  align-items: center;
  gap: var(--spacing);
  gap: 1.2rem;
  max-height: 100%;
  display: flex;
  @media (max-width: 1250px) {
    flex-flow: column;
    align-items: start;
  }
}
</style>
