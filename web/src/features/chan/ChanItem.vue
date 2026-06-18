<script setup lang="ts">
import { useDateFormat } from '../../utils/date'
import type { ChanDisplay } from './chan.model'
const { chan } = defineProps<{ chan: ChanDisplay }>()
</script>

<template>
  <a class="video" :href="chan.url" :title="chan.name">
    <img width="100" :src="chan.picture" :alt="chan.picture" referrerpolicy="no-referrer" />
    <div class="infos">
      <p class="info">{{ chan.name }}</p>
      <p class="info">{{ chan.com }}</p>
      <p class="info">{{ useDateFormat(chan.updatedAt) }}</p>
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
  height: 5rem;
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
