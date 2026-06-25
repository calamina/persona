<script setup lang="ts">
import LayoutAsync from '../../layouts/LayoutAsync.vue'
import ChanList from '../chan/ChanList.vue'
import FavoriteFeature from '../favorite/FavoriteFeature.vue'
import NoteFeature from '../note/NoteFeature.vue'
import RssFeed from '../rss/RssFeed.vue'
import ThemeSwitch from '../theme/ThemeSwitch.vue'
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
          <NoteFeature />
          <TodoList />
        </div>
      </Suspense>
      <div class="main">
        <LayoutAsync>
          <RssFeed />
        </LayoutAsync>
        <LayoutAsync>
          <ChanList />
        </LayoutAsync>
      </div>
      <div class="sidebar sidebar-alt">
        <LayoutAsync>
          <YoutubeFeed />
        </LayoutAsync>
        <ThemeSwitch />
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
    /* height: auto; */
    max-height: 100svh;
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
    display: flex;
    flex-flow: column;
    height: 100%;
  }
}

.main {
  display: flex;
  flex-flow: column;
  gap: var(--spacing-dashboard);
  overflow: hidden;
  height: 100%;

  @media (max-width: 1250px) {
    display: contents;
  }
}

.sidebar {
  flex-shrink: 0;
  display: flex;
  flex-flow: column;
  gap: var(--spacing-dashboard);
  max-width: max(16rem, 20vw);
  justify-self: center;
  align-self: center;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (max-width: 1250px) {
    display: contents;
  }

  &.sidebar-alt {
    max-width: max(24rem, 28vw);
    @media (max-width: 1250px) {
      max-width: unset;
    }
  }
}
</style>
