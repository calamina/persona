<script setup lang="ts">
import { ref } from 'vue'
import { addFavorite } from './favorite.service'
import { cleanUrl } from '../../utils/utils.ts'
import FieldAction from '../../components/FieldAction.vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const queryClient = useQueryClient()
const url = ref('')

const cleanAndSave = () => {
  url.value = cleanUrl(url.value)
  return addFavorite(url.value)
}

const { mutate: create, isPending: loading } = useMutation({
  mutationFn: cleanAndSave,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['favorites'] })
    url.value = ''
  },
})
</script>

<template>
  <FieldAction
    v-model="url"
    :action="create"
    :loading
    icon="favoriteAdd"
    label="Add"
    placeholder="add link ..."
  />
</template>
