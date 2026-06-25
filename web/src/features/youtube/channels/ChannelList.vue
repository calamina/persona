<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useYoutubeStore } from '../youtube.store.ts'
import ChannelItem from './ChannelItem.vue'
import LayoutList from '../../../layouts/LayoutList.vue'

const store = useYoutubeStore()
const { channels } = storeToRefs(store)

await store.loadChannels()
</script>

<template>
  <LayoutList>
    <ChannelItem v-for="channel in channels" :channel :key="channel.id" />
  </LayoutList>
</template>
