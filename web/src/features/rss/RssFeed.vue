<script setup lang="ts">
import { onMounted, ref } from 'vue'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import { api, networkError } from '../../utils/api-client.ts'
import { useDateFormat } from '../../utils/date'

interface Item {
  title: string
  date: string
  description: string
  categories: string[]
  source: string
  url: string
}

const rss = ref<Item[]>([])

onMounted(async () => {
  try {
    const res = await api.rss.$get()
    const { data } = await res.json()
    if (data) rss.value = data
  } catch {
    return networkError.error.message
  }
})
</script>

<template>
  <div class="rss">
    <LayoutWindow title="Rss">
      <div class="list">
        <div v-for="item in rss" class="item">
          <a :href="item.source">
            <p class="title">{{ item.title }}</p>
            <p class="categs">
              <span v-for="categ in item.categories">{{ categ }}</span>
            </p>
            <p class="dim">{{ item.source }} — {{ useDateFormat(item.date) }}</p>
          </a>
        </div>
      </div>
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

.list {
  display: flex;
  flex-flow: column;
  padding: var(--spacing-list-vr) var(--spacing-list-hr);
  gap: var(--list-gap);
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

  .dim {
    color: var(--color-dim);
  }

  &:hover .categs span {
    background-color: var(--tag-focus);
  }
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
</style>
