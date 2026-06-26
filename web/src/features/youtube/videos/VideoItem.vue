<script setup lang="ts">
import LayoutItem from '../../../layouts/LayoutItem.vue'
import { useDateFormat } from '../../../utils/date'
import type { VideoDisplay } from '../youtube.model'
const { video } = defineProps<{ video: VideoDisplay }>()
</script>

<template>
  <LayoutItem cover :href="'https://www.youtube.com/watch?v=' + video.id" :title="video.title">
    <template #visual>
      <img
        width="100"
        :src="`http://img.youtube.com/vi/${video.id}/sddefault.jpg`"
        :alt="video.title + 'thumbnail'"
      />
    </template>
    <p class="info">{{ video.title }}</p>
    <p class="info">{{ video.author }}</p>
    <p class="info date">{{ useDateFormat(video.published) }}</p>
  </LayoutItem>
</template>

<style scoped>
img {
  border-radius: var(--border-radius-small);
  width: 100%;
  flex-shrink: 0;
  height: 4rem;
  object-fit: cover;
  background-color: var(--element-focus);
}

.info {
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  line-height: 1.25rem;
  &:not(:first-child) {
    color: var(--color-dim);
  }
  &.date {
    line-height: 1.5rem;
  }
}
</style>
