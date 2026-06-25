import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../../utils/api-client'

export const useRssStore = defineStore('rss', () => {
  const data = ref<any[]>([])
  const isError = ref(false)

  async function fetchRssFeeds(forceRefresh = false) {
    try {
      const res = await api.rss.$get({
        query: { refresh: String(forceRefresh) },
      })
      const response = await res.json()

      if (response.data) {
        data.value = response.data
        isError.value = false
      }
      return response
    } catch {
      isError.value = true
    }
  }

  return {
    data,
    isError,
    fetchRssFeeds,
  }
})
