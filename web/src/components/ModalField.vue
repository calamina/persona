<script setup lang="ts">
const { name, placeholder } = defineProps<{
  name: string
  placeholder?: string
  disabled?: boolean
  autofocus?: boolean
  blur?: (...args: any) => void
}>()

const model = defineModel<string | null | undefined>()
</script>

<template>
  <fieldset>
    <label :for="name">{{ name }}<slot name="loading"></slot></label>
    <input type="text" :id="name" v-model="model" :placeholder :disabled @blur="blur" :autofocus />
    <slot />
  </fieldset>
</template>

<style scoped>
fieldset {
  padding: 0;
  border: none;
  display: flex;
  flex-flow: column;
  gap: var(--list-gap);
  width: 100%;
}

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

  &::placeholder {
    color: var(--color-dimmer);
    opacity: 1;
  }

  &:disabled {
    opacity: 0.5;
  }
}

label {
  color: var(--color);
  text-transform: capitalize;
  line-height: 1.1rem;
  font-size: 0.9rem;

  span {
    color: var(--color-dim);
  }
}
</style>
