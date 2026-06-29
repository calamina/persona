<script setup lang="ts">
import { ref } from 'vue'
import { useRssStore } from '../rss.store'
import type { FeedDisplay } from '../rss.model'
import { deleteFeed } from '../rss.service'
import ButtonLoading from '../../../components/ButtonLoading.vue'

const store = useRssStore()
const { feed } = defineProps<{ feed: FeedDisplay }>()

const deletingFeedId = ref<number | null>(null)

const remove = async (feed: FeedDisplay) => {
  deletingFeedId.value = feed.id

  const { data } = await deleteFeed(feed.id)
  if (data) {
    await store.loadFeeds()
    await store.fetchRssFeeds(true)
  }

  deletingFeedId.value = null
}
</script>

<template>
  <ButtonLoading
    :loading="deletingFeedId === feed.id"
    @click.prevent="remove(feed)"
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
