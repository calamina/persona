import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '../../utils/api-client'
import type { FeedDisplay, RssDisplay } from './rss.model'
import { getFeeds } from './rss.service'

export const useRssStore = defineStore('rss', () => {
  const data = ref<RssDisplay[]>([])
  const feeds = ref<FeedDisplay[]>([])
  const isError = ref(false)

  async function loadFeeds() {
    const { data } = await getFeeds()
    if (data) feeds.value = data
  }

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
    feeds,
    isError,
    fetchRssFeeds,
    loadFeeds,
  }
})
