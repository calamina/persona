<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useYoutubeStore } from '../youtube.store'
import VideoItem from './VideoItem.vue'
import LayoutList from '../../../layouts/LayoutList.vue'

const store = useYoutubeStore()
const { videos } = storeToRefs(store)
await store.loadVideos()
</script>

<template>
  <LayoutList>
    <VideoItem v-for="video in videos" :video :key="video.id" />
  </LayoutList>
</template>
