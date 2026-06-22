import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFavorites } from './favorite.service'
import type { FavoriteDisplay } from './favorite.model'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref<FavoriteDisplay[]>([])
  const loading = ref(false)

  const cache = ref<{ data: FavoriteDisplay[]; timestamp: number } | null>(null)
  const CACHE_TTL = 5 * 60 * 1000

  async function loadFavorites(forceRefresh = false) {
    const now = Date.now()
    if (!forceRefresh && cache.value && now - cache.value.timestamp < CACHE_TTL) {
      favorites.value = cache.value.data
      return
    }

    loading.value = true
    const { data } = await getFavorites()

    if (data) {
      favorites.value = data
      cache.value = { data, timestamp: now }
    }
    loading.value = false
  }

  function clearFavoriteCache() {
    cache.value = null
  }

  return {
    favorites,
    loading,
    loadFavorites,
    clearFavoriteCache,
  }
})
