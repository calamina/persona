<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { IconName } from '../utils/icon'
import ButtonBase from './ButtonBase.vue'

const {
  loading,
  label,
  icon,
  type = 'submit',
} = defineProps<{
  loading: boolean
  label?: string
  icon?: IconName
  type?: ButtonHTMLAttributes['type']
}>()
</script>

<template>
  <ButtonBase :type :label="loading ? 'Loading...' : label" :icon="loading ? 'loading' : icon" :disabled="loading" />
</template>
