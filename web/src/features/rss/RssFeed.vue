<script setup lang="ts">
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import LayoutList from '../../layouts/LayoutList.vue'
import { useRssStore } from './rss.store.ts'
import { storeToRefs } from 'pinia'
import RssItem from './RssItem.vue'
import RssAdd from './RssAdd.vue'

const store = useRssStore()
const { data } = storeToRefs(store)

await store.fetchRssFeeds()
</script>

<template>
  <LayoutWindow title="Rss">
    <RssAdd />
    <LayoutList>
      <RssItem v-for="item in data" :key="item.title" :item />
    </LayoutList>
  </LayoutWindow>
</template>
