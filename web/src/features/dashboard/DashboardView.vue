<script setup lang="ts">
import ChanList from '../chan/ChanList.vue'
import FavoriteFeature from '../favorite/FavoriteFeature.vue'
import RssFeed from '../rss/RssFeed.vue'
import TodoList from '../todo/TodoList.vue'
import YoutubeFeed from '../youtube/YoutubeFeed.vue'
import DashboardHeader from './DashboardHeader.vue'
</script>

<template>
  <div class="dashboard">
    <!-- <DashboardHeader /> -->
    <div class="elements">
      <Suspense>
        <div class="sidebar">
          <Suspense>
            <DashboardHeader />
          </Suspense>
          <FavoriteFeature />
          <TodoList />
        </div>
      </Suspense>
      <Suspense>
        <div class="main">
          <RssFeed />
          <ChanList />
        </div>
      </Suspense>
      <div class="sidebar">
        <Suspense>
          <YoutubeFeed />
        </Suspense>
      </div>
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
  padding: var(--spacing-dashboard);
  gap: var(--spacing-dashboard);
  /* grid-template-rows: var(--header-size) auto; */
  @media (max-width: 1250px) {
    align-items: start;
    height: auto;
  }
}

.elements {
  overflow: hidden;
  align-items: center;
  gap: var(--spacing);
  gap: var(--spacing-dashboard);
  height: 100%;
  max-height: 100%;
  display: flex;
  @media (max-width: 1250px) {
    flex-flow: column;
    align-items: start;
  }
}

.main {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: var(--spacing-dashboard);
  overflow: hidden;
  height: 100%;
}

.sidebar {
  display: flex;
  flex-flow: column;
  gap: var(--spacing-dashboard);
  max-width: max(18rem, 22vw);
  justify-self: center;
  align-self: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media (max-width: 1250px) {
    height: fit-content;
    max-width: unset;
  }
}
</style>
