<script setup lang="ts">
import type { FeedDisplay } from '../rss.model.ts'
import RssChannelDelete from './RssChannelDelete.vue'

const { feed } = defineProps<{ feed: FeedDisplay }>()
</script>

<template>
  <a class="feed" :key="feed.id" :href="feed.url" :title="feed.name">
    <p>{{ feed.name }}</p>
    <RssChannelDelete :feed />
  </a>
</template>

<style scoped>
a {
  text-decoration: none;
  color: var(--color);
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  gap: var(--item-gap);
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: fit-content;

  &:hover,
  &:focus-within {
    background-color: var(--element-focus);
    button {
      display: flex;
    }
  }

  &:last-child {
    border-bottom-right-radius: calc(var(--border-radius) - var(--spacing-small));
    border-bottom-left-radius: calc(var(--border-radius) - var(--spacing-small));
  }
}

p {
  padding: var(--spacing-small);
  display: flex;
  align-items: center;
  height: var(--icon-size);
  flex: 1;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

img {
  width: 2.7rem;
  height: 2.7rem;
  border-radius: var(--border-radius-small);
}
</style>
