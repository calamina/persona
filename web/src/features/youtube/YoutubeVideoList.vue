<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDateFormat } from '../../utils/date'
import { useYoutubeStore } from './youtube.store'

const store = useYoutubeStore()
const { videos } = storeToRefs(store)
await store.loadVideos()
</script>

<template>
  <div class="list">
    <a
      class="video"
      v-for="video in videos"
      :href="'https://www.youtube.com/watch?v=' + video.id"
      :title="video.title"
    >
      <img width="100" :src="`http://img.youtube.com/vi/${video.id}/sddefault.jpg`" alt="" />
      <div class="infos">
        <p class="info">{{ video.title }}</p>
        <p class="info">{{ video.author }}</p>
        <p class="info">{{ useDateFormat(video.published) }}</p>
      </div>
    </a>
  </div>
</template>

<style scoped>
.list {
  height: 100%;
  overflow-y: scroll;
  scrollbar-color: var(--color) transparent;
}

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
