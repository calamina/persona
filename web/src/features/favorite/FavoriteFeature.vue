<script setup lang="ts">
import FavoriteItem from './FavoriteItem.vue'
import FavoriteAdd from './FavoriteAdd.vue'
import { useFavoriteStore } from './favorite.store.ts'
import { storeToRefs } from 'pinia'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import { api } from '../../utils/api-client.ts'
// import { ref } from 'vue'

const store = useFavoriteStore()
const { favorites } = storeToRefs(store)

await store.loadFavorites()
const res = await api.chan.$get()
const { data } = await res.json()
console.debug(data)
// const errorMessage = ref('')
</script>

<template>
  <div class="favorites">
    <LayoutWindow title="Favorites">
      <FavoriteItem v-for="favorite in favorites" :key="favorite.id" :favorite="favorite" />
    </LayoutWindow>
    <!-- <div v-if="errorMessage">{{ errorMessage }}</div> -->
    <FavoriteAdd class="big" />
  </div>
</template>

<style scoped>
.favorites {
  display: flex;
  flex-flow: column;
  gap: 0.6rem;
  max-width: 25rem;
  justify-self: center;
  align-self: center;
  width: 100%;
  height: 100%;
  @media (max-width: 1250px) {
    height: fit-content;
    max-width: unset;
  }
}

.big {
  flex-shrink: 0;
}
</style>
