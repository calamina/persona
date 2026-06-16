<script setup lang="ts">
import { ref, type Ref } from 'vue'
import ButtonBase from '../../components/ButtonBase.vue'
import { getFavorites } from './favorites.service.ts'
import Favorite from './Favorite.vue'
import type { FavoriteModel } from 'persona-api/src/db/favorites.schema.ts'
import FavoriteCreate from './FavoriteCreate.vue'

const favoritesList: Ref<FavoriteModel[]> = ref([])
const errorMessage = ref('')

const refreshList = async () => {
  const res = await getFavorites()
  favoritesList.value = res
}

refreshList()
</script>

<template>
  <div class="favorites">
    <div class="actions">
      <ButtonBase class="small" icon="folder" />
      <ButtonBase class="small" icon="faviconToggle" />
      <ButtonBase class="small" icon="favoriteSearch" />
    </div>
    <div class="list" v-if="favoritesList.length">
      <h2>Favorites</h2>
      <Favorite v-for="favorite in favoritesList" :favorite="favorite" @deleted="refreshList()" />
    </div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <FavoriteCreate @added="refreshList()" />
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
  position: sticky;
  top: 0;
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
  max-width: 25rem;
  justify-self: center;
  align-self: center;
  max-height: 40rem;
  height: 40rem;
}

.list {
  flex: 1;
  display: flex;
  flex-flow: column;
  border-radius: 0.6rem;
  height: fit-content;
  border: 2.5px solid var(--border);
  background-color: var(--element);
  /* max-height: 30rem;
  height: 30rem; */
  overflow-y: auto;
  scrollbar-color: var(--color) transparent;
}
</style>
