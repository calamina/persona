<script setup lang="ts">
import { deleteFavorite } from './favorite.service.ts'
import ButtonLoading from '../../components/ButtonLoading.vue'
import type { FavoriteDisplay } from './favorite.model.ts'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const { favorite } = defineProps<{ favorite: FavoriteDisplay }>()
const queryClient = useQueryClient()

const { mutate: remove, isPending: loading } = useMutation({
  mutationFn: deleteFavorite,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['favorites'] })
  },
})
</script>

<template>
  <ButtonLoading
    :loading
    @click.prevent="remove(favorite.id)"
    class="deleteButton"
    icon="favoriteDelete"
  />
</template>

<style scoped>
.deleteButton {
  border: none;
  display: none;
  background-color: transparent;
  padding: 0;
  height: fit-content;
  border: var(--border-width) solid transparent;

  &:focus-within {
    background-color: var(--element-focusmax);
  }
}
</style>
