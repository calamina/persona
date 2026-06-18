<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useYoutubeStore } from '../youtube.store'
import VideoItem from './VideoItem.vue'

const store = useYoutubeStore()
const { videos } = storeToRefs(store)
await store.loadVideos()
</script>

<template>
  <VideoItem v-for="video in videos" :video :key="video.id" />
</template>
