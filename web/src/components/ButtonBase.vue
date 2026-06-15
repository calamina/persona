<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { IconName } from '../utils/icon'
import IconBase from './icons/IconBase.vue'

const {
  label = undefined,
  marginTop = 'none',
  type = 'button',
  icon = undefined,
} = defineProps<{
  label?: string
  type?: ButtonHTMLAttributes['type']
  icon?: IconName
  marginTop?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
}>()

const marginStyles = {
  none: '0',
  xs: '0.3rem',
  sm: '0.6rem',
  md: '0.9rem',
  lg: '1.2rem',
}

const style = { ['margin-top']: marginStyles[marginTop] }
</script>

<template>
  <button :type="type" :style="style">
    <IconBase v-if="icon" :name="icon" :key="icon" />
    <span v-if="label">{{ label }}</span>
  </button>
</template>

<style scoped>
button {
  background-color: var(--element);
  color: var(--color);
  cursor: pointer;
  border: 2.5px solid var(--border);
  padding: 0 0.3rem;
  height: 2.1rem;
  border-radius: 0.6rem;
  gap: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  outline: none;

  &:focus-visible {
    background-color: var(--element-focus);
  }
}
</style>
