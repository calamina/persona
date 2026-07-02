<script setup lang="ts">
import LayoutAsync from '../../layouts/LayoutAsync.vue'
import NoteFeature from '../note/NoteFeature.vue'
import RssFeed from '../rss/RssFeed.vue'
import LinksFeature from '../links/LinksFeature.vue'
import ThemeSwitch from '../theme/ThemeSwitch.vue'
import TodoList from '../todo/TodoList.vue'
import YoutubeFeed from '../youtube/YoutubeFeed.vue'
import DashboardHeader from './DashboardHeader.vue'
import FavoriteFeature from '../favorite/FavoriteFeature.vue'
import ChanList from '../chan/ChanList.vue'
</script>

<template>
  <div class="dashboard">
    <Suspense>
      <DashboardHeader class="header" />
    </Suspense>
    <LinksFeature class="links" />
    <div class="left">
      <!-- <DashboardHeader /> -->
      <Suspense>
        <FavoriteFeature />
      </Suspense>
      <NoteFeature />
      <Suspense>
        <TodoList />
      </Suspense>
    </div>
    <div class="center">
      <LayoutAsync>
        <RssFeed />
      </LayoutAsync>
      <LayoutAsync>
        <ChanList />
      </LayoutAsync>
    </div>
    <div class="right">
      <LayoutAsync>
        <YoutubeFeed />
      </LayoutAsync>
      <ThemeSwitch />
    </div>
  </div>
</template>

<style scoped>
.dashboard {
  width: 100%;
  height: 100svh;
  display: grid;
  grid-template-columns: max(16rem, 20vw) 1fr max(24rem, 28vw);
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    'header header header'
    'links links links'
    'left center right';
  grid-auto-flow: row;

  padding: var(--spacing-dashboard);
  gap: var(--spacing-dashboard);
}

.header {
  grid-area: header;
}

.links {
  grid-area: links;
}

.left {
  grid-area: left;
}

.center {
  grid-area: center;
}

.right {
  grid-area: right;
}

.left,
.center,
.right {
  overflow: hidden;
  display: flex;
  flex-flow: column;
  gap: var(--spacing-dashboard);
}

/* .dashboard {
  width: 100%;
  height: 100svh;
  display: grid;
  padding: var(--spacing);
  gap: var(--spacing);
  padding: var(--spacing-dashboard);
  gap: var(--spacing-dashboard);
  grid grid-template-areas: 
  ;
  @media (max-width: 1250px) {
    align-items: start;
    height: auto;
    min-height: 100svh;
  }
} */
/* 
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
    height: fit-content;
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
    height: fit-content;
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
    height: fit-content;
  }

  &.sidebar-alt {
    max-width: max(24rem, 28vw);
    @media (max-width: 1250px) {
      max-width: unset;
    }
  }
} */
</style>
