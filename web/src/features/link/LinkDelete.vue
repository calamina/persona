<script setup lang="ts">
import ButtonLoading from '../../components/ButtonLoading.vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { LinkDisplay } from './link.model.ts'
import { deleteLink } from './link.service.ts'

const { link } = defineProps<{ link: LinkDisplay }>()
const queryClient = useQueryClient()

const { mutate: remove, isPending: loading } = useMutation({
  mutationFn: deleteLink,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['links'] })
  },
})
</script>

<template>
  <ButtonLoading
    :loading
    @click.prevent="remove(link.id)"
    class="deleteButton"
    icon="favoriteDelete"
  />
</template>

<style scoped>
.deleteButton {
  border: none;
  opacity: 0;
  background-color: transparent;
  padding: 0;
  height: fit-content;
  border: var(--border-width) solid transparent;

  &:focus-within {
    background-color: var(--element-focusmax);
  }
}
</style>
