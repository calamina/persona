<script setup lang="ts">
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import ChannelAdd from './channels/ChannelAdd.vue'
import ChannelList from './channels/ChannelList.vue'
import VideoList from './videos/VideoList.vue'
</script>

<template>
  <div class="feed">
    <div class="section channels">
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
  grid-template-columns: 18rem auto;
  gap: 0.6rem;
  height: 100%;

  @media (max-width: 1250px) {
    grid-template-columns: 1fr;
  }
}

.section {
  display: flex;
  flex-flow: column;
  gap: 0.6rem;

  @media (max-width: 1250px) {
    height: fit-content;
  }
}

.channels {
  height: 100%;
  max-width: 18rem;

  @media (max-width: 1250px) {
    max-width: 100%;
  }
}

.actions {
  display: flex;
  gap: 0.6rem;
}
</style>
