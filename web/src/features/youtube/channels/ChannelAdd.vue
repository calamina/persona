<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Channel } from '../youtube.model'
import { addChannel, searchChannel } from '../youtube.service'
import ButtonLoading from '../../../components/ButtonLoading.vue'
import ButtonBase from '../../../components/ButtonBase.vue'
import ModalBase from '../../../components/ModalBase.vue'
import IconBase from '../../../components/icons/IconBase.vue'
import ModalField from '../../../components/ModalField.vue'

const dialog = useTemplateRef('dialog')
const queryClient = useQueryClient()
const query = ref('')
const result = ref<Channel | null>(null)

const { mutate: search, isPending: loadingSearch } = useMutation({
  mutationFn: async (searchQuery: string) => {
    if (!searchQuery.length) return null
    const data = await searchChannel(searchQuery)
    return data ?? null
  },
  onSuccess: (data) => {
    result.value = data
  },
})

const cancel = (params?: { close: boolean }) => {
  result.value = null
  query.value = ''
  if (params?.close) dialog.value?.close()
}

const { mutate: follow, isPending: loadingAdd } = useMutation({
  mutationFn: async (channelData: Channel) => {
    const data = await addChannel(channelData)
    return data
  },
  onSuccess: (data) => {
    if (data) {
      queryClient.invalidateQueries({ queryKey: ['youtube-channels'] })
      queryClient.invalidateQueries({ queryKey: ['youtube-videos'] })
      cancel({ close: true })
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

  <ModalBase title="Add youtube channel" ref="dialog">
    <form id="addForm" @submit.prevent="formAction">
      <ModalField
        v-if="!result"
        v-model="query"
        name="name"
        placeholder="summoning salt"
        autofocus
      />
    </form>
    <template #actions>
      <ButtonLoading
        v-if="!result"
        :loading="loadingSearch"
        label="Search"
        form="addForm"
        icon="favoriteAdd"
        type="submit"
        class="confirm"
      />
      <div v-else class="confirm buttons">
        <ButtonBase class="button" @click="cancel()" label="Search again" icon="back" />
        <ButtonLoading
          :loading="loadingAdd"
          class="button"
          label="Add youtube channel"
          form="addForm"
          icon="categAdd"
          type="submit"
        />
      </div>
    </template>

    <div v-if="result" class="result">
      <a :href="result.url" :title="result.name">
        <img
          :src="result.iconURL"
          :alt="result.name + ' channel icon'"
          referrerpolicy="no-referrer"
        />
        <p class="name">{{ result.name }}</p>
      </a>
    </div>
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
    width: 2.7rem;
    height: 2.7rem;
    border-radius: var(--border-radius-small);
    background-color: var(--element-focus);
  }
}

.result {
  display: flex;
  flex-flow: column;
  height: fit-content;
  align-items: center;
}

a {
  display: flex;
  padding: var(--spacing-small);
  padding-bottom: 0;
  flex-flow: column;
  text-decoration: none;
  overflow: hidden;
  width: fit-content;
  border-radius: var(--border-radius-small);
  gap: var(--item-gap);

  &:hover,
  &:focus-visible {
    background-color: var(--element-focus);
  }
}

img {
  align-self: center;
  object-fit: cover;
  width: 100%;
  max-width: min(15rem, 80vw);
  border-radius: var(--border-radius-small);
}

.confirm {
  padding: var(--spacing-small);
  height: fit-content;
  width: 100%;
  border: none;
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
  padding: var(--spacing-small);
  height: fit-content;
}

.name {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
