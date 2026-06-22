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
  <LayoutWindow title="Favorites">
    <FavoriteAdd />
    <div class="list">
      <FavoriteItem v-for="favorite in favorites" :key="favorite.id" :favorite="favorite" />
    </div>
  </LayoutWindow>
</template>

<style scoped>
.list {
  display: flex;
  flex-flow: column;
  padding: var(--spacing-small);
}
</style>
