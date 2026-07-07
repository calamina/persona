<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { addFeed, searchFeed } from '../rss.service.ts'
import ButtonBase from '../../../components/ButtonBase.vue'
import ButtonLoading from '../../../components/ButtonLoading.vue'
import InputBase from '../../../components/InputBase.vue'
import type { Feed } from '../rss.model.ts'
import ModalBase from '../../../components/ModalBase.vue'
import ModalField from '../../../components/ModalField.vue'
import IconBase from '../../../components/icons/IconBase.vue'

const dialog = useTemplateRef('dialog')
const queryClient = useQueryClient()
const query = ref('')
const result = ref<Feed | null>(null)

const { mutate: search, isPending: loadingSearch } = useMutation({
  mutationFn: async (searchQuery: string) => {
    if (!searchQuery.length) return
    return await searchFeed(searchQuery)
  },
  onSuccess: (data) => {
    if (data) result.value = data
    else result.value = null
  },
})

const cancel = () => {
  result.value = null
  query.value = ''
}

const { mutate: follow, isPending: loadingAdd } = useMutation({
  mutationFn: async (feedData: Feed) => {
    const data = await addFeed(feedData)
    return data
  },
  onSuccess: (data) => {
    if (data) {
      queryClient.invalidateQueries({ queryKey: ['rss-channels'] })
      queryClient.invalidateQueries({ queryKey: ['rss-feeds'] })
      cancel()
    }
  },
})

const formAction = () => (result.value ? follow(result.value) : search(query.value))
</script>

<template>
  <button class="addChannel" @click="dialog?.open()">
    <span>
      <IconBase name="categAdd" />
    </span>
    Add channel
  </button>

  <ModalBase title="Add RSS channel" ref="dialog">
    <form id="addForm" @submit.prevent="formAction">
      <ModalField
        v-if="!result"
        v-model="query"
        name="url"
        placeholder="summoning salt"
        autofocus
      />
    </form>
    <div v-if="result" class="element result-wrap">
      <InputBase id="feedTitle" v-model="result.name" class="input" />
    </div>
    <template #actions>
      <div class="channel-actions">
        <ButtonLoading
          v-if="!result"
          :loading="loadingSearch"
          class="button"
          @click="search(query)"
          label="Search"
          icon="favoriteAdd"
        />
        <div v-else class="confirm buttons">
          <ButtonBase class="button" @click="cancel()" label="Cancel" icon="favoriteDelete" />
          <ButtonLoading
            class="button"
            :loading="loadingAdd"
            @click="follow(result)"
            label="Follow"
            icon="favoriteAdd"
          />
        </div>
      </div>
    </template>
  </ModalBase>
</template>

<style scoped>
.addChannel {
  padding: var(--spacing-small);
  width: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
  align-items: center;
  gap: var(--item-gap);
  background-color: transparent;
  color: var(--color);
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: var(--border-radius-small);

  &:hover,
  &:focus-visible {
    background-color: var(--element-focus);
    span {
      background-color: var(--tag-focus);
    }
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: var(--border-radius-small);
    background-color: var(--element-focus);
  }
}

.element {
  padding: var(--spacing);
  width: 100%;
  border-bottom: var(--border);

  @media (max-width: 1250px) {
    flex-flow: column;
  }
}

.result-wrap {
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0;
  height: fit-content;
}

img {
  align-self: center;
  object-fit: cover;
  height: calc(var(--icon-size) * 2);
  border-right: var(--border);
}

.input {
  border: none;
}

.channel-actions {
  display: flex;
}

.buttons {
  display: flex;
  padding: 0;

  .button:first-child {
    border-right: var(--border);
  }
}

.button {
  width: 100%;
  border: none;
  border-radius: 0;
  height: fit-content;
  padding: var(--spacing-small);
}
</style>
