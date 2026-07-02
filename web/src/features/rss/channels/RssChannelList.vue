<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import LayoutList from '../../../layouts/LayoutList.vue'
import RssChannel from './RssChannel.vue'
import LoadingContent from '../../../components/LoadingContent.vue'
import { getFeeds } from '../rss.service.ts'

const { isLoading: loading, data: feeds } = useQuery({
  queryKey: ['rss-channels'],
  queryFn: getFeeds,
})
</script>

<template>
  <LoadingContent v-if="loading" />
  <LayoutList v-else>
    <RssChannel v-for="feed in feeds" :feed="feed" :key="feed.id ?? feed.name" />
  </LayoutList>
</template>
