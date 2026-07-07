<script setup lang="ts">
import { useTemplateRef } from 'vue'
import LayoutWindow from '../layouts/LayoutWindow.vue'
import IconBase from './icons/IconBase.vue'
import { onClickOutside } from '@vueuse/core'

const { title } = defineProps<{ title: string }>()

const dialogRef = useTemplateRef<HTMLDialogElement>('dialog')
const windowRef = useTemplateRef('window')

const open = () => dialogRef.value?.showModal()

const close = () => dialogRef.value?.close()
onClickOutside(windowRef, () => close())

defineExpose({ open, close })
</script>

<template>
  <dialog ref="dialog">
    <LayoutWindow :title ref="window" :collapse="false">
      <template #action>
        <button @click="close()">
          <IconBase class="action" name="close" />
        </button>
      </template>
      <div class="modal-content">
        <slot />
      </div>
      <template #footer>
        <div class="modal-confirm">
          <slot name="actions" />
        </div>
      </template>
    </LayoutWindow>
  </dialog>
</template>

<style scoped>
.modal-content {
  padding: var(--modal-spacing);
}

.modal-confirm {
  /* padding: var(--modal-spacing); */
  border-top: var(--border);
}

button {
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  background-color: transparent;
  height: var(--title-height);
  width: var(--title-height);
  cursor: pointer;
}

.action {
  margin-left: auto;
  width: fit-content;
}

dialog {
  opacity: 0.2;
  transform: scale(0.99);

  background-color: transparent;
  border: none;
  outline: none;
  padding: 0;
  min-width: min(30rem, 80vw);

  transition:
    opacity 0.125s ease-out,
    transform 0.125s ease-out,
    display 0.125s ease-out allow-discrete,
    overlay 0.125s ease-out allow-discrete;
}

dialog[open] {
  opacity: 1;
  transform: scale(1);
  display: flex;
}

@starting-style {
  dialog[open] {
    opacity: 0.2;
    transform: scale(0.99);
  }
}

dialog::backdrop {
  background-color: transparent;
  transition:
    background-color 0.06s ease-out,
    display 0.06s ease-out allow-discrete,
    overlay 0.06s ease-out allow-discrete;
}
dialog[open]::backdrop {
  background-color: var(--modal-bg);
}
@starting-style {
  dialog[open]::backdrop {
    background-color: transparent;
  }
}
</style>
