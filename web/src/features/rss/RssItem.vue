<script setup lang="ts">
import { useDateFormat } from '../../utils/date.ts'
import LayoutItem from '../../layouts/LayoutItem.vue'
import type { RssDisplay } from './rss.model.ts'

const { item } = defineProps<{ item: RssDisplay }>()
</script>

<template>
  <LayoutItem :href="item.url" class="item">
    <p class="title">{{ item.title }}</p>
    <p class="categs" v-if="item.categories.length">
      <span v-for="categ in item.categories">{{ categ }}</span>
    </p>
    <p class="dim">{{ item.source }} ▪ {{ useDateFormat(item.date) }}</p>
  </LayoutItem>
</template>

<style scoped>
.item {
  &:hover,
  &:focus-within {
    .categs span {
      background-color: var(--tag-focus);
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
  /* remove mask and add wrap if all tags should be visible */
  /* flex-flow: row wrap; */
  -webkit-mask-image: linear-gradient(to right, black 98%, transparent 100%);
  mask-image: linear-gradient(to right, black 98%, transparent 100%);

  span {
    flex-shrink: 0;
    background-color: var(--tag);
    text-transform: lowercase;
    border-radius: var(--border-radius-small);
    padding: 0.15rem 0.3rem;
    color: var(--color-dim);
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
