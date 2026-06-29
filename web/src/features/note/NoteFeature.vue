<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { refDebounced } from '@vueuse/core'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import IconBase from '../../components/icons/IconBase.vue'
import { api, networkError } from '../../utils/api-client.ts'

const input = ref('')
const loading = ref(false)
const debouncedInput = refDebounced(input, 6000)
let lastSavedValue = ''

const save = async () => {
  if (input.value === lastSavedValue) return
  loading.value = true

  const res = await api.note.$put({ json: { content: input.value } })
  const { data } = await res.json()
  if (data) lastSavedValue = input.value
  loading.value = false
}

watch(debouncedInput, save)

onMounted(async () => {
  try {
    const res = await api.note.$get()
    const { data } = await res.json()
    if (data) input.value = data.content
  } catch {
    return networkError.error.message
  }
})
</script>

<template>
  <LayoutWindow title="Note" icon="note" fit class="rel">
    <textarea
      v-model="input"
      name="note"
      id="note"
      autocorrect="off"
      spellcheck="false"
      placeholder="roses are red ..."
      @blur="save"
    ></textarea>
    <div class="loading" v-if="loading">
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
    background-color: var(--element-alt);
  }
}

.loading {
  position: absolute;
  bottom: var(--spacing-small);
  right: var(--spacing-small);
  width: fit-content;
}
</style>
