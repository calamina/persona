<script setup lang="ts">
import { ref, watch } from 'vue'
import { refDebounced } from '@vueuse/core'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import IconBase from '../../components/icons/IconBase.vue'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { getNote, saveNote } from './note.service.ts'

const input = ref('')
const debouncedInput = refDebounced(input, 3000)

const { isLoading: loading, data: note } = useQuery({
  queryKey: ['note'],
  queryFn: getNote,
})

watch(note, (newNote) => (input.value = newNote?.content ?? ''), { immediate: true, once: true })

const { mutate: save, isPending: updateLoading } = useMutation({
  mutationFn: (value: string) => saveNote(value),
})

const handleSave = () => {
  if (!input.value || input.value === note.value?.content) return
  save(input.value)
}

watch(debouncedInput, () => handleSave())
</script>

<template>
  <LayoutWindow title="Note" icon="note" fit class="rel">
    <textarea
      v-model="input"
      name="note"
      id="note"
      autorrect="off"
      spellcheck="false"
      placeholder="roses are red ..."
      @blur="handleSave"
    ></textarea>
    <div class="loading" v-if="loading || updateLoading">
      <IconBase name="loading" />
    </div>
  </LayoutWindow>
</template>

<style scoped>
.rel {
  position: relative;

  :global(.content) {
    overflow: hidden;
  }
}

textarea {
  overflow: auto;
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  field-sizing: content;
  max-height: 10rem;
  line-height: 1.4;
  height: 100%;
  color: var(--color);
  padding: calc(var(--spacing-small) * 2);
  resize: none;

  &:focus-within {
    background-color: var(--input-focus);
  }
}

.loading {
  position: absolute;
  bottom: var(--spacing-small);
  right: var(--spacing-small);
  width: fit-content;
}
</style>
