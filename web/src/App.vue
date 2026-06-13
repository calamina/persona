<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from './api-client'

const message = ref('Loading...')

onMounted(async () => {
  const res = await api.index.$get()
  const data = await res.text()
  message.value = data
})
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>
