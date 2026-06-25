<script setup lang="ts">
import { ref } from 'vue'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import ChannelAdd from './channels/ChannelAdd.vue'
import ChannelList from './channels/ChannelList.vue'
import VideoList from './videos/VideoList.vue'
import TabList, { type Tab } from '../../components/TabList.vue'

const TABS = ['Videos', 'Channels'] as const
type TabName = (typeof TABS)[number]

const tab = ref<TabName>('Videos')

const changeTab = (newTab: TabName) => (tab.value = newTab)

const tabs: Tab[] = TABS.map((b) => ({
  name: b,
  action: () => changeTab(b),
}))
</script>

<template>
  <LayoutWindow title="Youtube">
    <template #tabs>
      <TabList :tabs />
    </template>

    <keep-alive>
      <div v-if="tab === 'Videos'">
        <VideoList />
      </div>
      <div v-else>
        <ChannelAdd />
        <ChannelList />
      </div>
    </keep-alive>
  </LayoutWindow>
</template>
