<script setup lang="ts">
import { useDateFormat } from '../../../utils/date'
import type { VideoDisplay } from '../youtube.model'
const { video } = defineProps<{ video: VideoDisplay }>()
</script>

<template>
  <a class="video" :href="'https://www.youtube.com/watch?v=' + video.id" :title="video.title">
    <!-- TODO : alt -->
    <img width="100" :src="`http://img.youtube.com/vi/${video.id}/sddefault.jpg`" alt="" />
    <div class="infos">
      <p class="info">{{ video.title }}</p>
      <p class="info">{{ video.author }}</p>
      <p class="info date">{{ useDateFormat(video.published) }}</p>
    </div>
  </a>
</template>

<style scoped>
a {
  text-decoration: none;
  color: var(--color);
  padding: var(--spacing);

  &:hover,
  &:focus-within {
    background-color: var(--element-focus);
  }

  &.video {
    display: grid;
    align-items: center;
    grid-template-columns: 6rem auto;
    gap: var(--spacing);
  }

  &.channel {
    width: 100%;
    display: block;
    flex-flow: row wrap;
    gap: 1ch;
    padding: 0.3rem var(--spacing);
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
  height: 4rem;
  object-fit: cover;
  background-color: var(--element-focus);
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
  line-height: 1.25rem;
  &:not(:first-child) {
    color: var(--color-dim);
  }
  &.date {
    line-height: 1.5rem;
  }
}
</style>
