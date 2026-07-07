<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import ButtonBase from '../../components/ButtonBase.vue'
import { cleanUrl } from '../../utils/url.ts'
import { addLink, getLinkName } from './link.service.ts'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import ModalBase from '../../components/ModalBase.vue'
import ModalField from '../../components/ModalField.vue'
import LayoutItem from '../../layouts/LayoutItem.vue'
import IconBase from '../../components/icons/IconBase.vue'

const queryClient = useQueryClient()

const dialog = useTemplateRef('dialog')

const { categs } = defineProps<{
  categs: string[]
}>()

const category = ref('')
const setCateg = (categ: string) => (category.value = categ.toLowerCase())

const url = ref('')
const title = ref<string | null>(null)
const loading = ref(false)

const getName = async () => {
  if (title.value || !url.value) return
  loading.value = true
  url.value = cleanUrl(url.value)
  title.value = await getLinkName(url.value)
  loading.value = false
}

const createLink = () =>
  create({ title: title.value ?? '', url: url.value, category: category.value })

const resetValues = () => {
  url.value = ''
  title.value = ''
  category.value = ''
}

const { mutate: create, isPending: _createLoading } = useMutation({
  mutationFn: addLink,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['links'] })
    dialog.value?.close()
    resetValues()
  },
})
</script>

<template>
  <LayoutItem @click="dialog?.open()" class="addlink" type="button" inline small>
    <span class="favicon">
      <IconBase name="checkPlus" />
    </span>
    New link
  </LayoutItem>
  <!-- <ButtonBase class="addlink" label="new link" icon="favoriteAdd" @click="dialog?.open()" /> -->
  <ModalBase title="Create new link" ref="dialog">
    <form id="createForm" @submit.prevent="createLink()">
      <ModalField v-model="url" name="url" placeholder="youtube.com" :blur="getName" />
      <ModalField v-model="title" name="name" placeholder="youtube" :disabled="loading">
        <template #loading v-if="loading"> fetching ...</template>
      </ModalField>
      <ModalField v-model="category" name="category" placeholder="video">
        <div class="categs">
          <button type="button" v-for="c in categs" class="category" @click="setCateg(c)">
            {{ c }}
          </button>
        </div>
      </ModalField>
    </form>
    <template #actions>
      <ButtonBase
        label="Create link"
        form="createForm"
        icon="favoriteAdd"
        type="submit"
        class="confirm"
      />
    </template>
  </ModalBase>
</template>

<style scoped>
.addlink {
  &:hover,
  &:focus-within {
    button {
      opacity: 1;
    }
    img {
      background-color: var(--tag-focus);
    }
  }
}

form {
  display: flex;
  flex-flow: column;
  gap: var(--item-gap);
}

.categs {
  margin: 0.1rem 0;
  display: flex;
  gap: var(--tag-gap);
  flex-flow: row wrap;
}

.category {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  flex-shrink: 0;
  background-color: var(--tag);
  text-transform: lowercase;
  border-radius: var(--border-radius-small);
  padding: 0.025rem 0.3rem;
  color: var(--color-dim);
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover,
  &:focus-within {
    background-color: var(--tag-focus);
    color: var(--color);
  }
}

.confirm {
  padding: var(--spacing-small);
  height: fit-content;
  width: 100%;
  border: none;
}

.favicon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--element-focus);
  border-radius: var(--border-radius-small);
  padding: var(--spacing-small);
  width: var(--favicon-size);
  height: var(--favicon-size);
}
</style>
