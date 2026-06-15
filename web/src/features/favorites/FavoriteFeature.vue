<script setup lang="ts">
import { ref, type Ref } from 'vue'
import ButtonBase from '../../components/ButtonBase.vue'
import { handleGetFavorites } from './favorites.service.ts'
import Favorite from './Favorite.vue'
import type { FavoriteModel } from 'persona-api/src/db/favorites.schema.ts'
import FavoriteCreate from './FavoriteCreate.vue'

const favoritesList: Ref<FavoriteModel[]> = ref([])
const errorMessage = ref('')

const refreshList = async () => {
  const res = await handleGetFavorites()
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
      <Favorite v-for="favorite in favoritesList" :favorite="favorite" @deleted="refreshList()" />
    </div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
    <FavoriteCreate @added="refreshList()" />
  </div>
</template>

<style scoped>
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
}

.list {
  display: flex;
  flex-flow: column;
  border-radius: 0.6rem;
  height: fit-content;
  border: 2.5px solid var(--border);
  background-color: var(--element);
  padding: 0.6rem;
  max-height: 50vh;
  overflow-y: auto;
  scrollbar-color: var(--color) transparent;
}
</style>
