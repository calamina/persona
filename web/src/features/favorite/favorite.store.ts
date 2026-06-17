import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFavorites } from './favorite.service'
import type { FavoriteDisplay } from './favorite.model'

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref<FavoriteDisplay[]>([])
  const loading = ref(false)

  const videoCache = ref<{ data: FavoriteDisplay[]; timestamp: number } | null>(null)
  const CACHE_TTL = 5 * 60 * 1000

  async function loadFavorites(forceRefresh = false) {
    const now = Date.now()
    if (!forceRefresh && videoCache.value && now - videoCache.value.timestamp < CACHE_TTL) {
      favorites.value = videoCache.value.data
      return
    }

    loading.value = true
    const { data } = await getFavorites()

    if (data) {
      favorites.value = data
      videoCache.value = { data, timestamp: now }
    }
    loading.value = false
  }

  function clearFavoriteCache() {
    videoCache.value = null
  }

  return {
    favorites,
    loading,
    loadFavorites,
    clearFavoriteCache,
  }
})
