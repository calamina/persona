<script setup lang="ts">
import { type InputTypeHTMLAttribute } from 'vue'

const {
  id,
  type = 'text',
  placeholder = undefined,
  hasHint,
  hasButton,
} = defineProps<{
  id: string
  type?: InputTypeHTMLAttribute
  hasHint?: boolean
  hasButton?: boolean
  placeholder?: string
}>()

const model = defineModel<string>()

const hintId = `${id}-hint`
const errorId = `${id}-error`
const describedBy = hasHint ? `${hintId} ${errorId}` : errorId
</script>

<template>
  <input
    v-model="model"
    :id="id"
    :type="type"
    :name="id"
    :placeholder="placeholder"
    :class="[{ hasButton: hasButton }, type + 'Input']"
    :aria-describedby="describedBy"
  />
</template>

<style scoped>
input {
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  border: none;
  border-bottom: var(--border);
  background-color: transparent;
  padding: 0.25rem 0.3rem;
  color: inherit;
  background-color: var(--element-alt);
  width: 100%;
  overflow: hidden;

  &:focus-visible {
    outline: none;
    border-color: var(--border-focus);
  }

  &.hasButton {
    padding-right: 2.75rem;
  }

  &:user-invalid {
    border-color: var(--color-highlight);
    color: var(--color-highlight);
  }
}
</style>
