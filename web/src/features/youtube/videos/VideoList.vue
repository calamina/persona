<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import VideoItem from './VideoItem.vue'
import LayoutList from '../../../layouts/LayoutList.vue'
import LoadingContent from '../../../components/LoadingContent.vue'
import { getVideos } from '../youtube.service.ts'

const { isLoading: loading, data: videos } = useQuery({
  queryKey: ['youtube-videos'],
  queryFn: getVideos,
  staleTime: 1000 * 60 * 15,
  gcTime: 1000 * 60 * 20,
})
</script>

<template>
  <LoadingContent v-if="loading" />
  <LayoutList v-else>
    <VideoItem v-for="video in videos" :video="video" :key="video.id" />
  </LayoutList>
</template>
