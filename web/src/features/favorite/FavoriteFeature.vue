<script setup lang="ts">
import FavoriteItem from './FavoriteItem.vue'
import FavoriteAdd from './FavoriteAdd.vue'
import { useFavoriteStore } from './favorite.store.ts'
import { storeToRefs } from 'pinia'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
// import { ref } from 'vue'

const store = useFavoriteStore()
const { favorites } = storeToRefs(store)

await store.loadFavorites()
// const errorMessage = ref('')
</script>

<template>
  <div class="favorites">
    <LayoutWindow title="Favorites">
      <div class="list">
        <FavoriteItem v-for="favorite in favorites" :key="favorite.id" :favorite="favorite" />
      </div>
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
  max-height: 40rem;
  height: 40rem;
}

.list {
  scrollbar-color: var(--color) transparent;
  overflow-y: auto;
}

.big {
  flex-shrink: 0;
}
</style>
