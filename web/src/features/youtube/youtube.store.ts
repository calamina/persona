import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getChannels, getVideos } from './youtube.service'
import type { ChannelDisplay, VideoDisplay } from './youtube.model'

export const useYoutubeStore = defineStore('youtube', () => {
  const channels = ref<ChannelDisplay[]>([])
  const videos = ref<VideoDisplay[]>([])
  const loading = ref(false)

  async function loadChannels() {
    const { data } = await getChannels()
    if (data) channels.value = data
  }

  async function loadVideos(forceRefresh = false) {
    loading.value = true
    try {
      const { data, error } = await getVideos({
        query: { refresh: String(forceRefresh) },
      })

      if (error) {
        console.debug(error)
        return
      }
      if (data) {
        videos.value = data
      }
    } catch (err) {
      console.error('Failed to load videos:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    channels,
    videos,
    loading,
    loadChannels,
    loadVideos,
  }
})
