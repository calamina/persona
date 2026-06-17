<script setup lang="ts">
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import ChannelAdd from './channels/ChannelAdd.vue'
import ChannelList from './channels/ChannelList.vue'
import VideoList from './videos/VideoList.vue'
</script>

<template>
  <div class="feed">
    <div class="section">
      <LayoutWindow title="Channels">
        <ChannelList />
      </LayoutWindow>
      <ChannelAdd />
    </div>
    <div class="section">
      <LayoutWindow title="Videos">
        <VideoList />
      </LayoutWindow>
    </div>
  </div>
</template>

<style scoped>
.feed {
  display: grid;
  grid-template-columns: 16rem 2fr;
  gap: 0.6rem;
}

.section {
  display: flex;
  flex-flow: column;
  gap: 0.6rem;
  max-height: 40rem;
  height: 40rem;
}

.actions {
  display: flex;
  gap: 0.6rem;
}
</style>
