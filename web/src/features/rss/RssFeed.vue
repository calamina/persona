<script setup lang="ts">
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import LayoutList from '../../layouts/LayoutList.vue'
import { useRssStore } from './rss.store.ts'
import { storeToRefs } from 'pinia'
import RssItem from './RssItem.vue'
import type { Tab } from '../../components/TabList.vue'
import { ref } from 'vue'
import TabList from '../../components/TabList.vue'
import RssChannelAdd from './channels/RssChannelAdd.vue'
import RssChannelList from './channels/RssChannelList.vue'

const store = useRssStore()
const { data } = storeToRefs(store)

await store.fetchRssFeeds()

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
      <TabList :tabs />
    </template>

    <keep-alive>
      <Transition name="load" mode="out-in">
        <div v-if="tab === 'Feed'">
          <LayoutList>
            <RssItem v-for="item in data" :key="item.title" :item />
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
