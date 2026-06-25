<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import { api, networkError } from '../../utils/api-client.ts'
import { useDateFormat } from '../../utils/date'
import LayoutList from '../../layouts/LayoutList.vue'
import IconBase from '../../components/icons/IconBase.vue'
import LoadingContent from '../../components/LoadingContent.vue'

interface Item {
  title: string
  date: string
  description: string
  categories: string[]
  source: string
  url: string
}

const rss = ref<Item[]>([])
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    const res = await api.rss.$get()
    const { data } = await res.json()
    if (data) rss.value = data
  } catch {
    return networkError.error.message
  }
  isLoading.value = false
})
</script>

<template>
  <div class="rss">
    <LayoutWindow title="Rss">
      <Transition mode="out-in">
        <LoadingContent v-if="isLoading" />
        <LayoutList v-else space>
          <div v-for="item in rss" class="item">
            <a :href="item.source">
              <p class="title">{{ item.title }}</p>
              <p class="categs">
                <span v-for="categ in item.categories">{{ categ }}</span>
              </p>
              <p class="dim">{{ item.source }} ▪ {{ useDateFormat(item.date) }}</p>
            </a>
          </div>
        </LayoutList>
      </Transition>
    </LayoutWindow>
  </div>
</template>

<style scoped>
.rss {
  display: flex;
  flex-flow: column;
  overflow: hidden;
  height: 100%;
}

a {
  text-decoration: none;
  color: var(--color);
  padding: var(--spacing-small);
  border-radius: var(--border-radius-small);
  display: flex;
  flex-flow: column;
  line-height: 1.2;

  &:hover,
  &:focus-within {
    background-color: var(--element-focus);
  }

  &:hover .categs span {
    background-color: var(--tag-focus);
  }
}

.dim {
  color: var(--color-dim);
}
.categs {
  margin-top: 0.15rem;
  display: flex;
  flex-flow: row wrap;
  gap: var(--tag-gap);

  span {
    background-color: var(--tag);
    text-transform: lowercase;
    border-radius: var(--border-radius-small);
    padding: 0 0.15rem;
    color: var(--color-dim);
  }
}

.v-enter-active,
.v-leave-active {
  transition:
    opacity 0.085s ease-out,
    transform 0.085s ease-out;
}

.v-enter-from {
  opacity: 0.5;
  transform: translateY(-0.3rem);
}
.v-leave-to {
  opacity: 0;
  transform: translateY(0.3rem);
}
</style>
