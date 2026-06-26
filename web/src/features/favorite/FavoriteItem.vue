<script setup lang="ts">
import LayoutItem from '../../layouts/LayoutItem.vue'
import type { FavoriteDisplay } from './favorite.model.ts'
import FavoriteDelete from './FavoriteDelete.vue'

const { favorite } = defineProps<{ favorite: FavoriteDisplay }>()

const faviconError = (e: Event) => {
  const imgElement = e?.target as HTMLImageElement | null
  if (imgElement) imgElement.src = ''
}

const faviconCheck = (e: Event) => {
  const imgElement = e?.target as HTMLImageElement | null
  if (imgElement?.naturalWidth === 16 && imgElement?.naturalHeight === 16) {
    imgElement.src = 'https://api.iconify.design/material-symbols:book-outline.svg'
  }
}
</script>

<template>
  <LayoutItem :href="favorite.url" class="favorite" inline>
    <img
      :src="`https://www.google.com/s2/favicons?sz=64&domain=${favorite.url}`"
      :alt="favorite.title + 'favicon'"
      @error="faviconError"
      @load="faviconCheck"
    />
    <p>{{ favorite.title }}</p>
    <FavoriteDelete :favorite />
  </LayoutItem>
</template>

<style scoped>
.favorite {
  &:hover,
  &:focus-within {
    button {
      display: flex;
    }
    img {
      background-color: var(--tag-focus);
    }
  }
}

p {
  flex: 1;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
}

img {
  background-color: var(--element-focus);
  border-radius: var(--border-radius-small);
  padding: var(--spacing-small);
  width: var(--favicon-size);
  height: var(--favicon-size);
}
</style>
