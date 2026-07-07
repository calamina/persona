<script setup lang="ts">
import { useMagicKeys } from '@vueuse/core'
import { useTemplateRef, watch } from 'vue'
// import IconBase from '../../components/icons/IconBase.vue'

const keys = useMagicKeys({
  passive: false,
  onEventFired: (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault()
    }
  },
})
const quickSearch = keys['Ctrl+k']
const searchInput = useTemplateRef('search')

watch(quickSearch, (value) => {
  if (value) searchInput.value?.focus()
})
</script>

<template>
  <form class="search" action="https://www.google.com/search">
    <!-- <IconBase name="search" /> -->
    <input
      type="search"
      name="q"
      ref="search"
      id="searchInput"
      placeholder="search the net..."
      autofocus
    />
    <p class="search-keys">ctrl k</p>
  </form>
</template>

<style scoped>
.search {
  display: flex;
  width: fit-content;
  justify-content: center;
  justify-self: center;
  padding: 0 var(--spacing-list-hr);
  gap: var(--spacing-list-hr);
  min-width: 6rem;
  width: 50%;
  transition: width 0.125s ease-out;
  background-color: var(--element);

  &:focus-within {
    width: 100%;
  }
}

input {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  height: var(--title-height);
  border: none;
  outline: none;
  text-align: center;
  font-size: 1rem;
  color: inherit;
  width: 100%;

  &::placeholder {
    color: var(--color-dimmer);
    opacity: 1;
  }
}

.search-keys {
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  flex-shrink: 0;
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-dim);
  background-color: var(--tag);
  border-radius: var(--border-radius-small);
  margin: var(--spacing-list-hr) 0;
  padding: 0 var(--spacing-list-hr);
  /* line-height: 1.2; */
  height: calc(100% - 2 * var(--spacing-list-hr));
  width: fit-content;
}
</style>
