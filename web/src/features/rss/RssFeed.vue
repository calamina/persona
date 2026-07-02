<script setup lang="ts">
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import LayoutList from '../../layouts/LayoutList.vue'
import RssItem from './RssItem.vue'
import TabList from '../../components/TabList.vue'
import type { Tab } from '../../components/TabList.vue'
import RssChannelAdd from './channels/RssChannelAdd.vue'
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
type TabName = (typeof TABS)[number]

const tab = ref<TabName>('Feed')

const changeTab = (newTab: TabName) => (tab.value = newTab)

const tabs: Tab[] = TABS.map((b) => ({
  name: b,
  action: () => changeTab(b),
}))
</script>

<template>
  <LayoutWindow title="Rss" icon="rss">
    <template #tabs>
      <TabList :tabs="tabs" />
    </template>

    <keep-alive>
      <Transition name="load" mode="out-in">
        <div v-if="tab === 'Feed'">
          <LoadingContent v-if="loading" />
          <LayoutList v-else>
            <RssItem v-for="item in data" :key="item.title" :item="item" />
          </LayoutList>
        </div>
        <div v-else>
          <RssChannelAdd />
          <RssChannelList />
        </div>
      </Transition>
    </keep-alive>
  </LayoutWindow>
</template>
