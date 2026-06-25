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
  <div class="section">
    <LayoutWindow title="Youtube">
      <template #tabs>
        <TabList :tabs />
      </template>

      <Transition mode="out-in">
        <keep-alive>
          <div v-if="tab === 'Videos'">
            <VideoList />
          </div>
          <div v-else>
            <ChannelAdd />
            <ChannelList />
          </div>
        </keep-alive>
      </Transition>
    </LayoutWindow>
  </div>
</template>

<style scoped>
.section {
  overflow: hidden;
  display: flex;
  flex-flow: column;
  gap: var(--spacing);
  height: 100%;

  @media (max-width: 1250px) {
    height: fit-content;
  }
}

.actions {
  display: flex;
  gap: var(--spacing);
}

/* DUPLICATE FOR TEST */

.tabs {
  display: flex;
  height: var(--icon-size);
  border-bottom: var(--border);
  background-color: var(--tab-wrap-bg);
}

.tab {
  width: 100%;
  border: none;
  outline: none;
  border-right: var(--border);
  background-color: transparent;
  cursor: pointer;
  color: var(--color-dimmer);

  &:last-child {
    border: none;
  }

  &:hover,
  &:focus-within,
  &.active {
    color: var(--color);
    background-color: var(--element-focus);
    background-color: var(--tab-active-bg);
  }
}

.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.085s ease-out,
    transform 0.085s ease-out;
}

.v-enter-from {
  opacity: 0.5;
  transform: translateY(-0.3rem);
}
.v-leave-to {
  opacity: 0;
  transform: translateY(0.3rem);
}
</style>
