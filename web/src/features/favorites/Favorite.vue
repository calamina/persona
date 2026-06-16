<script setup lang="ts">
import type { FavoriteModel } from 'persona-api/src/db/favorites.schema'
import { deleteFavorite } from './favorites.service'
import ButtonLoading from '../../components/ButtonLoading.vue'
import { ref } from 'vue'

const { favorite } = defineProps<{ favorite: FavoriteModel }>()
const emit = defineEmits(['deleted'])
const loading = ref(false)

const remove = (id: number) => {
  loading.value = true
  deleteFavorite(id)
  emit('deleted')
  loading.value = false
}
</script>

<template>
  <a class="link" :href="favorite.url">
    <img :src="favorite.favicon" :alt="favorite.title + 'favicon'" />
    {{ favorite.title }}
    <ButtonLoading :loading @click.prevent="remove(favorite.id)" class="deleteButton" icon="favoriteDelete" />
  </a>
</template>

<style scoped>
.deleteButton {
  border: none;
  display: none;
  background-color: transparent;
  border: 2.5px solid transparent;

  &:focus-within {
    border-color: var(--border);
  }
}

.link {
  margin: 0 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 0.6rem);
  border-radius: 0.3rem;
  border: 2.5px solid transparent;
  gap: 0.6rem;
  text-decoration: none;
  padding: 0 0.3rem;
  line-height: 1.2rem;
  height: 2.1rem;
  outline: none;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover,
  &:focus-within {
    border-color: var(--border);
    background-color: var(--element-focus);
    button {
      display: flex;
    }
  }
  &:first-of-type {
    margin-top: 0.3rem;
  }
  &:last-of-type {
    margin-bottom: 0.3rem;
  }
}

img {
  background-color: var(--element-focus);
  border-radius: 50%;
  width: 1.2rem;
  height: 1.2rem;
  display: none;
  /* filter: saturate(0); */
}
</style>
