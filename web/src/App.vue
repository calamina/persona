<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

onMounted(() => {
  const theme = localStorage.getItem('theme')
  document.querySelector('html')?.setAttribute('data-theme', theme ?? 'maxi')
})
</script>

<template>
  <RouterView />
</template>
