<script setup lang="ts">
import type { FavoriteModel } from 'persona-api/src/db/favorites.schema'
import { handleDeleteFavorite } from './favorites.service'
import ButtonLoading from '../../components/ButtonLoading.vue'
import { ref } from 'vue'

const { favorite } = defineProps<{ favorite: FavoriteModel }>()
const emit = defineEmits(['deleted'])
const loading = ref(false)

const deleteFavorite = (id: number) => {
  loading.value = true
  handleDeleteFavorite(id)
  emit('deleted')
  loading.value = false
}
</script>

<template>
  <div class="favorite">
    <a class="link" :href="favorite.url">
      <img :src="favorite.favicon" :alt="favorite.title + 'favicon'" />
      {{ favorite.title }}
    </a>
    <ButtonLoading :loading @click.prevent="deleteFavorite(favorite.id)" class="deleteButton" icon="favoriteDelete" />
  </div>
</template>

<style scoped>
.favorite {
  display: flex;
}

.deleteButton {
  border: none;
  display: none;
  background-color: transparent;
}

.link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 0.3rem;
  border: 2px solid transparent;
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
    + button {
      display: flex;
    }
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
