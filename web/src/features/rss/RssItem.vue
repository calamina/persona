<script setup lang="ts">
import LayoutItem from '../../layouts/LayoutItem.vue'
import MediaDisplay from '../../components/MediaDisplay.vue'
import type { RssDisplay } from './rss.model.ts'
import { useTimeAgo } from '@vueuse/core'

const { item } = defineProps<{ item: RssDisplay }>()
</script>

<template>
  <LayoutItem :href="item.url" class="item" cover>
    <template #visual>
      <MediaDisplay :src="item.imageUrl" :alt="item.title + ' thumbnail'" class="item-media" />
    </template>

    <p class="title text-ellipsis">{{ item.title }}</p>
    <p class="categs" v-if="item.categories?.length">
      <span v-for="categ in item.categories" :key="categ" class="text-ellipsis">
        {{ categ }}
      </span>
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
      color: var(--color);
    }
    .item-media {
      background-color: var(--element-focusmax);
    }
  }
}

.text-ellipsis {
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
  mask-image: linear-gradient(to right, black 96%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, black 96%, transparent 100%);

  span {
    flex-shrink: 0;
    background-color: var(--tag);
    text-transform: lowercase;
    border-radius: var(--border-radius-small);
    padding: 0.025rem 0.3rem;
    color: var(--color-dim);
  }
}
</style>
