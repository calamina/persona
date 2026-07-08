<script setup lang="ts">
import { computed } from 'vue'
import { useTimeAgo } from '@vueuse/core'
import DOMPurify from 'dompurify'
import LayoutItem from '../../layouts/LayoutItem.vue'
import MediaDisplay from '../../components/MediaDisplay.vue'
import type { ChanDisplay } from './chan.model'

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
      <MediaDisplay :src="chan.picture" :alt="chan.id.toString() + ' thread cover'" class="media" />
    </template>

    <p class="description" v-html="safeText"></p>
    <p class="info text-ellipsis">[{{ chan.replies }}] ▪ {{ useTimeAgo(chan.updatedAt) }}</p>
  </LayoutItem>
</template>

<style scoped>
.chan {
  &:hover,
  &:focus-within {
    .categs span {
      background-color: var(--tag-focus);
      color: var(--color);
    }
    .media {
      background-color: var(--element-focusmax) !important;
    }
  }
}

.text-ellipsis {
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}

.info {
  color: var(--color-dim);
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
