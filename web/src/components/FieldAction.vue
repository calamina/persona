<script setup lang="ts">
import type { IconName } from '../utils/icon.ts'
import ButtonLoading from './ButtonLoading.vue'

const { action, label, icon, loading, placeholder } = defineProps<{
  action: () => void
  label: string
  icon: IconName
  loading: boolean
  placeholder?: string
}>()

const model = defineModel<string>()
</script>

<template>
  <form class="form" @submit.prevent="action()">
    <input id="url" v-model="model" :placeholder="placeholder ?? '...'" :required="false" />
    <ButtonLoading class="button" :loading :label :icon />
  </form>
</template>

<style scoped>
form {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0;
  /* background-color: var(--element); */
  background-color: var(--actions-bg);
  width: 100%;
  height: fit-content;
  justify-content: end;
  height: var(--icon-size);
  border-bottom: var(--border);
}

.button {
  border: none;
  height: 100%;
  background-color: transparent;
  border-radius: 0;
  border-left: var(--border);
}

input {
  border: none;
  background-color: transparent;
  padding: 0.25rem calc(var(--spacing) + var(--spacing-list-hr));
  height: calc(var(--icon-size) - var(--border-width));
  color: inherit;
  background-color: var(--actions-input-bg);
  width: 100%;

  &:focus-visible {
    outline: none;
    border-color: var(--border-focus);
    background-color: var(--element-alt);
  }

  &:user-invalid {
    border-color: var(--color-highlight);
    color: var(--color-highlight);
  }
}
</style>
