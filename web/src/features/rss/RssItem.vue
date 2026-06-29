<script setup lang="ts">
import LayoutItem from '../../layouts/LayoutItem.vue'
import type { RssDisplay } from './rss.model.ts'
import { computed } from 'vue'
import { useTimeAgo } from '@vueuse/core'
import IconBase from '../../components/icons/IconBase.vue'

const { item } = defineProps<{ item: RssDisplay }>()

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
const videoExtensions = ['mp4', 'webm', 'ogg', 'mov']

const mediaType = computed(() => {
  if (!item.imageUrl) return null

  const extension = item.imageUrl?.split('.')?.pop()?.split(/#|\?/)[0].toLowerCase()
  if (!extension) return null

  if (imageExtensions.includes(extension)) {
    return 'image'
  } else if (videoExtensions.includes(extension)) {
    return 'video'
  }

  return null
})
</script>

<template>
  <LayoutItem :href="item.url" class="item" cover>
    <template #visual v-if="item.imageUrl && mediaType">
      <img
        v-if="mediaType === 'image'"
        width="100"
        :src="item.imageUrl"
        :alt="item.title + 'thumbnail'"
        referrerpolicy="no-referrer"
      />
      <video
        v-else-if="mediaType === 'video'"
        width="100"
        :src="item.imageUrl"
        autoplay
        muted
        loop
        class="media-element"
      ></video>
    </template>
    <template #visual v-else>
      <div class="placeholder"><IconBase name="smile" /></div>
    </template>
    <p class="title">{{ item.title }}</p>
    <p class="categs" v-if="item.categories.length">
      <span v-for="categ in item.categories">{{ categ }}</span>
    </p>
    <p class="dim">{{ item.source }} ▪ {{ useTimeAgo(item.date) }}</p>
  </LayoutItem>
</template>

<style scoped>
.item {
  &:hover,
  &:focus-within {
    .categs span {
      background-color: var(--tag-focus);
    }
    img,
    video,
    .placeholder {
      background-color: var(--element-focusmax);
    }
  }
}

.title {
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dim {
  color: var(--color-dim);
}

.categs {
  margin: 0.1rem 0;
  display: flex;
  gap: var(--tag-gap);
  flex-flow: row;
  -webkit-mask-image: linear-gradient(to right, black 96%, transparent 100%);
  mask-image: linear-gradient(to right, black 96%, transparent 100%);

  span {
    flex-shrink: 0;
    background-color: var(--tag);
    text-transform: lowercase;
    border-radius: var(--border-radius-small);
    padding: 0.025rem 0.3rem;
    color: var(--color-dim);
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

img,
video,
.placeholder {
  /* border: var(--border); */
  border-radius: var(--border-radius-small);
  width: 100%;
  flex-shrink: 0;
  object-fit: cover;
  height: 4.5rem;
  background-color: var(--element-focus);
}

.placeholder {
  display: grid;
  place-items: center;
}
</style>
