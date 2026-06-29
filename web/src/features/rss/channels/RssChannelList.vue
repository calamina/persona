<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRssStore } from '../rss.store.ts'
import LayoutList from '../../../layouts/LayoutList.vue'
import RssChannel from './RssChannel.vue'

const store = useRssStore()
const { feeds } = storeToRefs(store)

await store.loadFeeds()
</script>

<template>
  <LayoutList>
    <RssChannel v-for="feed in feeds" :feed :key="feed.name" />
  </LayoutList>
</template>
