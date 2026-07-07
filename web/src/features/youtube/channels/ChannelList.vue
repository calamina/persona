<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import ChannelItem from './ChannelItem.vue'
import LayoutList from '../../../layouts/LayoutList.vue'
import LoadingContent from '../../../components/LoadingContent.vue'
import { getChannels } from '../youtube.service.ts'
import ChannelAdd from './ChannelAdd.vue'

const { isLoading: loading, data: channels } = useQuery({
  queryKey: ['youtube-channels'],
  queryFn: getChannels,
})
</script>

<template>
  <LoadingContent v-if="loading" />
  <LayoutList v-else>
    <ChannelAdd />
    <ChannelItem v-for="channel in channels" :channel="channel" :key="channel.id" />
  </LayoutList>
</template>
