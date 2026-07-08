<script setup lang="ts">
import { useTimeAgo } from '@vueuse/core'
import LayoutItem from '../../../layouts/LayoutItem.vue'
import type { VideoDisplay } from '../youtube.model'
import MediaDisplay from '../../../components/MediaDisplay.vue'

const { video } = defineProps<{ video: VideoDisplay }>()
</script>

<template>
  <LayoutItem cover :href="'https://www.youtube.com/watch?v=' + video.id" :title="video.title">
    <template #visual>
      <MediaDisplay
        :src="`http://img.youtube.com/vi/${video.id}/sddefault.jpg`"
        :alt="video.title + ' thumbnail'"
      />
    </template>

    <p class="info text-ellipsis">{{ video.title }}</p>
    <p class="info text-ellipsis dim-text">{{ video.author }}</p>
    <p class="info text-ellipsis dim-text date">{{ useTimeAgo(video.published) }}</p>
  </LayoutItem>
</template>

<style scoped>
.text-ellipsis {
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}

.info {
  line-height: 1.25rem;

  &.date {
    line-height: 1.5rem;
  }
}

.dim-text {
  color: var(--color-dim);
}
</style>
