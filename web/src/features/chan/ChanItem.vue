<script setup lang="ts">
import { computed } from 'vue'
import { useDateFormat } from '../../utils/date'
import type { ChanDisplay } from './chan.model'
import DOMPurify from 'dompurify'
import LayoutItem from '../../layouts/LayoutItem.vue'

const { chan } = defineProps<{ chan: ChanDisplay }>()

const safeText = computed(() => {
  return DOMPurify.sanitize(chan.com, {
    ALLOWED_TAGS: ['a', 'b', 'br', 'span', 'i', 'em', 'strong'],
    ALLOWED_ATTR: ['href', 'class', 'target'],
  })
})
</script>

<template>
  <LayoutItem cover class="chan" :href="chan.url" :title="chan.name">
    <template #visual>
      <img
        width="100"
        :src="chan.picture"
        :alt="chan.id.toString() + ' thread cover'"
        referrerpolicy="no-referrer"
      />
    </template>
    <p class="description" v-html="safeText"></p>
    <p class="info">[{{ chan.replies }}] ▪ {{ useDateFormat(chan.updatedAt) }}</p>
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
  &:not(:first-child) {
    color: var(--color-dim);
  }
}

.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  white-space: normal;
  overflow: hidden;

  max-height: 2.5rem;
  height: 2.5rem;
  line-height: 1.25rem;
  width: 100%;
}
</style>
