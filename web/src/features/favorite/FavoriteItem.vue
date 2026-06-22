<script setup lang="ts">
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
  <a class="link" :href="favorite.url">
    <img
      :src="`https://www.google.com/s2/favicons?sz=64&domain=${favorite.url}`"
      :alt="favorite.title + 'favicon'"
      @error="faviconError"
      @load="faviconCheck"
    />
    <p>{{ favorite.title }}</p>
    <FavoriteDelete :favorite />
  </a>
</template>

<style scoped>
.link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing);
  text-decoration: none;
  padding: var(--spacing);
  line-height: 1.2rem;
  outline: none;

  &:hover,
  &:focus-within {
    background-color: var(--element-focus);
    button {
      display: flex;
    }
    img {
      background-color: var(--element-focusmax);
    }
  }
}

p {
  flex: 1;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

img {
  background-color: var(--element-focus);
  border-radius: var(--border-radius-small);
  padding: 0.45rem;
  width: var(--icon-size);
  height: var(--icon-size);
}
</style>
