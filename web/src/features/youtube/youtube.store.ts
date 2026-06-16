import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getChannels } from './youtube.service'
import type { ChannelDisplay, Video } from './youtube.model'
import { api } from '../../utils/api-client'

export const useYoutubeStore = defineStore('youtube', () => {
  const channels = ref<ChannelDisplay[]>([])
  const videos = ref<Video[]>([])
  const loading = ref(false)

  const videoCache = ref<{ data: Video[]; timestamp: number } | null>(null)
  const CACHE_TTL = 5 * 60 * 1000

  async function loadChannels() {
    const { data } = await getChannels()
    if (data) channels.value = data
  }

  async function loadVideos(forceRefresh = false) {
    const now = Date.now()
    if (!forceRefresh && videoCache.value && now - videoCache.value.timestamp < CACHE_TTL) {
      videos.value = videoCache.value.data
      return
    }

    loading.value = true
    try {
      const response = await api.youtube.videos.$get()

      if (response.ok) {
        const resData = await response.json()
        if (resData && resData.data) {
          videos.value = resData.data
          videoCache.value = { data: resData.data, timestamp: now }
        }
      }
    } catch (err) {
      console.error('Failed to load videos:', err)
    } finally {
      loading.value = false
    }
  }

  function clearVideoCache() {
    videoCache.value = null
  }

  return {
    channels,
    videos,
    loading,
    loadChannels,
    loadVideos,
    clearVideoCache,
  }
})
