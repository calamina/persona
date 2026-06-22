<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useYoutubeStore } from '../youtube.store.ts'
import ChannelItem from './ChannelItem.vue'

const store = useYoutubeStore()
const { channels } = storeToRefs(store)

await store.loadChannels()
</script>

<template>
  <div class="list">
    <ChannelItem v-for="channel in channels" :channel :key="channel.id" />
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-flow: column;
  padding: var(--spacing-small);
}
</style>
