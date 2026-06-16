<script setup lang="ts">
import { ref } from 'vue'
import Favorite from './Favorite.vue'
import FavoriteCreate from './FavoriteCreate.vue'
import { useFavoriteStore } from './favorite.store.ts'
import { storeToRefs } from 'pinia'

const store = useFavoriteStore()
const { favorites } = storeToRefs(store)
const errorMessage = ref('')

await store.loadFavorites()
</script>

<template>
  <div class="favorites">
    <!-- <div class="actions">
      <ButtonBase class="small" icon="folder" />
      <ButtonBase class="small" icon="faviconToggle" />
      <ButtonBase class="small" icon="favoriteSearch" />
    </div> -->
    <div class="section">
      <h2>Favorites</h2>
      <div class="list">
        <Favorite v-for="favorite in favorites" :key="favorite.id" :favorite="favorite" />
      </div>
    </div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <FavoriteCreate class="big" />
  </div>
</template>

<style scoped>
h2 {
  font-size: 1rem;
  font-weight: 300;
  border-bottom: 2.5px solid var(--border);
  padding: 0 0.6rem;
  height: var(--header-size);
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  background-color: var(--element);
}

.actions {
  display: flex;
  gap: 0.6rem;
}

.small {
  width: fit-content;
}

.favorites {
  display: flex;
  flex-flow: column;
  gap: 0.6rem;
  /* max-width: 25rem; */
  justify-self: center;
  align-self: center;
  max-height: 40rem;
  height: 40rem;
}

.section {
  display: flex;
  flex-flow: column;
  border-radius: 0.6rem;
  height: fit-content;
  border: 2.5px solid var(--border);
  background-color: var(--element);
  overflow: hidden;
  flex: 1;
}

.list {
  scrollbar-color: var(--color) transparent;
  overflow-y: auto;
}

.big {
  flex-shrink: 0;
}
</style>
