<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import ChannelItem from './ChannelItem.vue'
import LayoutList from '../../../layouts/LayoutList.vue'
import LoadingContent from '../../../components/LoadingContent.vue'
import { getChannels } from '../youtube.service.ts'

const { isLoading: loading, data: channels } = useQuery({
  queryKey: ['youtube-channels'],
  queryFn: getChannels,
})
</script>

<template>
  <LoadingContent v-if="loading" />
  <LayoutList v-else>
    <ChannelItem v-for="channel in channels" :channel="channel" :key="channel.id" />
  </LayoutList>
</template>
