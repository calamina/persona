<script setup lang="ts">
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import { useDateFormat } from '../../utils/date'
import LayoutList from '../../layouts/LayoutList.vue'
import { useRssStore } from './rss.store.ts'
import { storeToRefs } from 'pinia'

const store = useRssStore()
const { data } = storeToRefs(store)

await store.fetchRssFeeds()
</script>

<template>
  <LayoutWindow title="Rss">
    <LayoutList space>
      <div v-for="item in data" class="item">
        <a :href="item.url">
          <p class="title">{{ item.title }}</p>
          <p class="categs">
            <span v-for="categ in item.categories">{{ categ }}</span>
          </p>
          <p class="dim">{{ item.source }} ▪ {{ useDateFormat(item.date) }}</p>
        </a>
      </div>
    </LayoutList>
  </LayoutWindow>
</template>

<style scoped>
a {
  text-decoration: none;
  color: var(--color);
  padding: var(--spacing-small);
  border-radius: var(--border-radius-small);
  display: flex;
  flex-flow: column;
  line-height: 1.2;

  &:hover,
  &:focus-within {
    background-color: var(--element-focus);
  }

  &:hover .categs span {
    background-color: var(--tag-focus);
  }
}

.dim {
  color: var(--color-dim);
}
.categs {
  margin-top: 0.15rem;
  display: flex;
  flex-flow: row wrap;
  gap: var(--tag-gap);

  span {
    background-color: var(--tag);
    text-transform: lowercase;
    border-radius: var(--border-radius-small);
    padding: 0 0.15rem;
    color: var(--color-dim);
  }
}
</style>
