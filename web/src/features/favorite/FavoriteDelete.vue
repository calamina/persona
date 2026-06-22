<script setup lang="ts">
import { deleteFavorite } from './favorite.service.ts'
import ButtonLoading from '../../components/ButtonLoading.vue'
import { ref } from 'vue'
import { useFavoriteStore } from './favorite.store.ts'
import type { FavoriteDisplay } from './favorite.model.ts'

const store = useFavoriteStore()
const { favorite } = defineProps<{ favorite: FavoriteDisplay }>()
const loading = ref(false)

const remove = async (id: number) => {
  loading.value = true
  const { data } = await deleteFavorite(id)
  if (data) {
    store.clearFavoriteCache()
    store.loadFavorites(true)
  }
  loading.value = false
}
</script>

<template>
  <ButtonLoading
    :loading
    @click.prevent="remove(favorite.id)"
    class="deleteButton"
    icon="favoriteDelete"
  />
</template>

<style scoped>
.deleteButton {
  border: none;
  display: none;
  background-color: transparent;
  padding: 0;
  height: fit-content;
  border: var(--border-width) solid transparent;

  &:focus-within {
    background-color: var(--element-focusmax);
  }
}
</style>
