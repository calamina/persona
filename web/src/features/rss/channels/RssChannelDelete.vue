<script setup lang="ts">
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { FeedDisplay } from '../rss.model'
import { deleteFeed } from '../rss.service'
import ButtonLoading from '../../../components/ButtonLoading.vue'

const queryClient = useQueryClient()
const { feed } = defineProps<{ feed: FeedDisplay }>()

const { mutate: remove, isPending: isDeleting } = useMutation({
  mutationFn: async (feedId: number) => {
    return await deleteFeed(feedId)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['rss-channels'] })
    queryClient.invalidateQueries({ queryKey: ['rss-feeds'] })
  },
})
</script>

<template>
  <ButtonLoading
    :loading="isDeleting"
    @click.prevent="remove(feed.id)"
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
