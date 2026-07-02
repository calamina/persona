<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { deleteChannel } from '../youtube.service.ts'
import type { ChannelDisplay } from '../youtube.model.ts'
import ButtonLoading from '../../../components/ButtonLoading.vue'

const queryClient = useQueryClient()
const { channel } = defineProps<{ channel: ChannelDisplay }>()

const { mutate: remove, isPending: isDeleting } = useMutation({
  mutationFn: async (channelId: number) => {
    const data = await deleteChannel(channelId)
    return data
  },
  onSuccess: (data) => {
    if (data) {
      queryClient.invalidateQueries({ queryKey: ['youtube-channels'] })
      queryClient.invalidateQueries({ queryKey: ['youtube-videos'] })
    }
  },
})
</script>

<template>
  <ButtonLoading
    :loading="isDeleting"
    @click.prevent="remove(channel.id)"
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
