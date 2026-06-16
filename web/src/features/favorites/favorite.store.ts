import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../../utils/api-client'

export interface FavoriteDisplay {
  id: number
  title: string
  url: string
  favicon: string
  createdAt: string
  updatedAt: string
  userId: string
}

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
    try {
      const response = await api.favorites.$get()

      if (response.ok) {
        const resData = await response.json()
        if (resData && resData.data) {
          favorites.value = resData.data
          videoCache.value = { data: resData.data, timestamp: now }
        }
      }
    } catch (err) {
      console.error('Failed to load favorites:', err)
    } finally {
      loading.value = false
    }
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
