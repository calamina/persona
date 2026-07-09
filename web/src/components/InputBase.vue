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
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--border);
  border-radius: var(--border-radius-small);
  outline: none;
  padding: var(--spacing-small);
  width: 100%;
  background-color: var(--input-bg);
  color: var(--color);
  font-size: 1rem;
  color: var(--color);

  &.hasButton {
    padding-right: 2.75rem;
  }

  &::placeholder {
    color: var(--color-dimmer);
    opacity: 1;
  }

  &:disabled {
    opacity: 0.5;
  }

  &:user-invalid {
    border-color: var(--color-highlight);
    color: var(--color-highlight);
  }
}
/* 
input {
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  border: none;
  border-bottom: var(--border);
  background-color: transparent;
  padding: 0.25rem 0.3rem;
  color: inherit;
  background-color: var(--input-focus);
  width: 100%;
  overflow: hidden;

  &:focus-visible {
    outline: none;
    border-color: var(--border-focus);
  }


} */
</style>
