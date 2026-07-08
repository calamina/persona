<script setup lang="ts">
import { ref } from 'vue'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import ChannelList from './channels/ChannelList.vue'
import VideoList from './videos/VideoList.vue'
import TabList from '../../components/TabList.vue'

const TABS = ['Videos', 'Channels'] as const
const tab = ref<(typeof TABS)[number]>('Videos')
</script>

<template>
  <LayoutWindow title="Youtube" icon="youtube">
    <template #tabs>
      <TabList :tabs="TABS" v-model="tab" />
    </template>

    <keep-alive>
      <Transition name="load" mode="out-in">
        <VideoList v-if="tab === 'Videos'" />
        <ChannelList v-else />
      </Transition>
    </keep-alive>
  </LayoutWindow>
</template>
