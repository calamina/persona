import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getChannels, getVideos } from './youtube.service'
import type { ChannelDisplay, VideoDisplay } from './youtube.model'

export const useYoutubeStore = defineStore('youtube', () => {
  const channels = ref<ChannelDisplay[]>([])
  const videos = ref<VideoDisplay[]>([])
  const loading = ref(false)

  const videoCache = ref<{ data: VideoDisplay[]; timestamp: number } | null>(null)
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
      const { data, error } = await getVideos()
      if (error) {
        console.debug(error)
        return
      }
      if (data) {
        videos.value = data
        videoCache.value = { data, timestamp: now }
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
