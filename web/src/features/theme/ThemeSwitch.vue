<script setup lang="ts">
import ButtonBase from '../../components/ButtonBase.vue'
import IconBase from '../../components/icons/IconBase.vue'

const switchTheme = () => {
  const currentTheme = localStorage.getItem('theme')
  console.debug(currentTheme)
  const newTheme = currentTheme === 'maxi' ? 'mini' : 'maxi'
  console.debug(newTheme)
  document.querySelector('html')?.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}
</script>

<template>
  <ButtonBase @click="switchTheme()" label="Switch theme" icon="theme" class="button" />
</template>

<style scoped>
.button {
  flex-shrink: 0;
  width: 100%;
  gap: var(--item-gap);
}

.icon {
  height: 75%;
}
</style>
