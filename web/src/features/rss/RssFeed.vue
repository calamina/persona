<script setup lang="ts">
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import LayoutList from '../../layouts/LayoutList.vue'
import RssItem from './RssItem.vue'
import TabList from '../../components/TabList.vue'
import RssChannelList from './channels/RssChannelList.vue'
import LoadingContent from '../../components/LoadingContent.vue'
import { getRss } from './rss.service.ts'

const { isLoading: loading, data } = useQuery({
  queryKey: ['rss-feeds'],
  queryFn: getRss,
  staleTime: 1000 * 60 * 30,
  gcTime: 1000 * 60 * 35,
})

const TABS = ['Feed', 'Channels'] as const
const tab = ref<(typeof TABS)[number]>('Feed')
</script>

<template>
  <LayoutWindow title="Rss" icon="rss">
    <template #tabs>
      <TabList :tabs="TABS" v-model="tab" />
    </template>

    <keep-alive>
      <Transition name="load" mode="out-in">
        <template v-if="tab === 'Feed'">
          <LoadingContent v-if="loading" />
          <LayoutList v-else>
            <RssItem v-for="item in data" :key="item.title" :item="item" />
          </LayoutList>
        </template>

        <RssChannelList v-else />
      </Transition>
    </keep-alive>
  </LayoutWindow>
</template>
