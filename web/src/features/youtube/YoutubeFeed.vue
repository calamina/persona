<script setup lang="ts">
import { ref } from 'vue'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import ChannelAdd from './channels/ChannelAdd.vue'
import ChannelList from './channels/ChannelList.vue'
import VideoList from './videos/VideoList.vue'

const TABS = ['videos', 'channels'] as const
type Tab = (typeof TABS)[number]

const tab = ref<Tab>('videos')

const changeTab = (newTab: Tab) => (tab.value = newTab)
</script>

<template>
  <div class="section">
    <LayoutWindow title="Youtube">
      <template v-slot:tabs>
        <div class="tabs">
          <button class="tab" :class="{ active: tab === 'videos' }" @click="changeTab('videos')">
            Videos
          </button>
          <button
            class="tab"
            :class="{ active: tab === 'channels' }"
            @click="changeTab('channels')"
          >
            Channels
          </button>
        </div>
      </template>

      <Transition mode="out-in">
        <keep-alive>
          <div v-if="tab === 'videos'">
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
}

.tab {
  width: 100%;
  border: none;
  outline: none;
  border-right: var(--border);
  background-color: transparent;
  cursor: pointer;
  color: var(--color-dim);

  &:last-child {
    border: none;
  }

  &:hover,
  &:focus-within,
  &.active {
    color: var(--color);
    background-color: var(--element-focus);
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
