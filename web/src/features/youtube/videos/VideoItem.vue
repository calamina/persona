<script setup lang="ts">
import { useDateFormat } from '../../../utils/date'
import type { VideoDisplay } from '../youtube.model'
const { video } = defineProps<{ video: VideoDisplay }>()
</script>

<template>
  <a class="video" :href="'https://www.youtube.com/watch?v=' + video.id" :title="video.title">
    <img width="100" :src="`http://img.youtube.com/vi/${video.id}/sddefault.jpg`" alt="" />
    <div class="infos">
      <p class="info">{{ video.title }}</p>
      <p class="info">{{ video.author }}</p>
      <p class="info">{{ useDateFormat(video.published) }}</p>
    </div>
  </a>
</template>

<style scoped>
a {
  text-decoration: none;
  color: var(--color);
  padding: 0.6rem;

  &:hover,
  &:focus-within {
    background-color: var(--element-focus);
  }

  &.video {
    display: grid;
    grid-template-columns: 6rem auto;
    gap: 0.6rem;
  }

  &.channel {
    width: 100%;
    display: block;
    flex-flow: row wrap;
    gap: 1ch;
    padding: 0.3rem 0.6rem;
    overflow-x: hidden;

    span {
      color: var(--bg-dim);
    }
  }
}

img {
  border-radius: 0.3rem;
  width: 100%;
  flex-shrink: 0;
  object-fit: cover;
}

.infos {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.info {
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  &:not(:first-child) {
    color: var(--color-dim);
  }
}
</style>
