<script setup lang="ts">
import { ref } from 'vue'
import { useYoutubeStore } from '../youtube.store.ts'
import { deleteChannel } from '../youtube.service.ts'
import type { ChannelDisplay } from '../youtube.model.ts'
import ButtonLoading from '../../../components/ButtonLoading.vue'

const store = useYoutubeStore()
const { channel } = defineProps<{ channel: ChannelDisplay }>()

const deletingChannelId = ref<number | null>(null)

const remove = async (channel: ChannelDisplay) => {
  deletingChannelId.value = channel.id

  const { data } = await deleteChannel(channel.id)
  if (data) {
    store.clearVideoCache()
    await store.loadChannels()
    await store.loadVideos(true)
  }

  deletingChannelId.value = null
}
</script>

<template>
  <ButtonLoading
    :loading="deletingChannelId === channel.id"
    @click.prevent="remove(channel)"
    class="deleteButton"
    icon="favoriteDelete"
  />
</template>

<style scoped>
.deleteButton {
  border: none;
  display: none;
  background-color: transparent;
  border: var(--border-width) solid transparent;

  &:focus-within {
    background-color: var(--element-focusmax);
  }
}
</style>
