<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useYoutubeStore } from '../youtube.store'
import VideoItem from './VideoItem.vue'

const store = useYoutubeStore()
const { videos } = storeToRefs(store)
await store.loadVideos()
</script>

<template>
  <div class="list">
    <VideoItem v-for="video in videos" :video :key="video.id" />
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-flow: column;
  padding: var(--spacing-list-vr) var(--spacing-list-hr);
  gap: var(--list-gap);
}
</style>
