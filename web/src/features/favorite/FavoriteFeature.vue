<script setup lang="ts">
import FavoriteItem from './FavoriteItem.vue'
import FavoriteAdd from './FavoriteAdd.vue'
import { useFavoriteStore } from './favorite.store.ts'
import { storeToRefs } from 'pinia'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import LayoutList from '../../layouts/LayoutList.vue'

const store = useFavoriteStore()
const { favorites } = storeToRefs(store)

await store.loadFavorites()
</script>

<template>
  <LayoutWindow title="Favorites" icon="favorite">
    <FavoriteAdd />
    <LayoutList>
      <FavoriteItem v-for="favorite in favorites" :key="favorite.id" :favorite="favorite" />
    </LayoutList>
  </LayoutWindow>
</template>
