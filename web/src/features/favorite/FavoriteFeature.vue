<script setup lang="ts">
import FavoriteItem from './FavoriteItem.vue'
import FavoriteAdd from './FavoriteAdd.vue'
import { useFavoriteStore } from './favorite.store.ts'
import { storeToRefs } from 'pinia'
import LayoutWindow from '../../layouts/LayoutWindow.vue'

const store = useFavoriteStore()
const { favorites } = storeToRefs(store)

await store.loadFavorites()
</script>

<template>
  <div class="favorites">
    <LayoutWindow title="Favorites">
      <FavoriteAdd />
      <FavoriteItem v-for="favorite in favorites" :key="favorite.id" :favorite="favorite" />
    </LayoutWindow>
  </div>
</template>

<style scoped>
.favorites {
  display: flex;
  flex-flow: column;
  gap: var(--spacing);
  max-width: 25rem;
  justify-self: center;
  align-self: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media (max-width: 1250px) {
    height: fit-content;
    max-width: unset;
  }
}
</style>
