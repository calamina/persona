<script setup lang="ts">
import { computed } from 'vue'
import { useDateFormat } from '../../utils/date'
import type { ChanDisplay } from './chan.model'
import DOMPurify from 'dompurify'

const { chan } = defineProps<{ chan: ChanDisplay }>()

const safeText = computed(() => {
  return DOMPurify.sanitize(chan.com, {
    ALLOWED_TAGS: ['a', 'b', 'br', 'span', 'i', 'em', 'strong'],
    ALLOWED_ATTR: ['href', 'class', 'target'],
  })
})
</script>

<template>
  <a class="chan" :href="chan.url" :title="chan.name">
    <img
      width="100"
      :src="chan.picture"
      :alt="chan.id.toString() + ' thread cover'"
      referrerpolicy="no-referrer"
    />
    <div class="infos">
      <p class="com" v-html="safeText" />
      <p class="info">[{{ chan.replies }}] {{ useDateFormat(chan.updatedAt) }}</p>
    </div>
  </a>
</template>

<style scoped>
a {
  text-decoration: none;
  color: var(--color);
  padding: var(--spacing-small);
  border-radius: var(--border-radius-small);
  display: grid;
  align-items: center;
  grid-template-columns: 6rem auto;
  gap: var(--item-gap);

  &:hover,
  &:focus-within {
    background-color: var(--element-focus);
  }
}

img {
  border-radius: var(--border-radius-small);
  width: 100%;
  flex-shrink: 0;
  height: 4rem;
  object-fit: cover;
  background-color: var(--element-focus);
}

.infos {
  width: 100%;
  overflow: hidden;
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

.com {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  line-height: 1.25rem;
  height: 2.5rem;
}
</style>
