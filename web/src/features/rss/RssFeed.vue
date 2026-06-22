<script setup lang="ts">
import { onMounted } from 'vue'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import { api, networkError } from '../../utils/api-client.ts'

console.debug('rss')

onMounted(async () => {
  try {
    const res = await api.rss.$get()
    const data = await res.json()
    console.debug(data)
  } catch {
    return networkError
  }
})
</script>

<template>
  <div class="rss">
    <LayoutWindow title="rss">
      <p>hehehe</p>
    </LayoutWindow>
  </div>
</template>

<style scoped>
.rss {
  display: flex;
  flex-flow: column;
}

p {
  padding: var(--spacing);
}
</style>
