<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  url: string
}>()

const status = ref<'pinging' | 'online' | 'offline'>('pinging')

onMounted(async () => {
  try {
    await fetch(props.url, { mode: 'no-cors', cache: 'no-store' })
    status.value = 'online'
  } catch (error) {
    status.value = 'offline'
  }
})
</script>

<template>
  <a :href="url" :class="['homepage-link', status]" target="_blank" rel="noopener noreferrer">
    {{ status }}
  </a>
</template>

<style scoped>
.homepage-link {
  text-decoration: none;
  margin: 0.1rem 0;
  border-radius: var(--border-radius-small);
  padding: 0 var(--spacing-small);
  width: fit-content;
}

.online {
  color: var(--color);
  background-color: var(--title-bg);
}
.offline {
  color: var(--color-dim);
  background-color: var(--element-focus);
}
.pinging {
  color: #a3a3a3;
}
</style>
