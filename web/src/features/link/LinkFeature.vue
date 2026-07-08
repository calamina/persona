<script setup lang="ts">
import { computed } from 'vue'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import LinkAdd from './LinkAdd.vue'
import type { LinkDisplay } from './link.model.ts'
import { useQuery } from '@tanstack/vue-query'
import { getLinks } from './link.service.ts'
import LinkDelete from './LinkDelete.vue'
import LayoutItem from '../../layouts/LayoutItem.vue'

const { isLoading: _todosLoading, data: links } = useQuery({
  queryKey: ['links'],
  queryFn: getLinks,
})

const groupedLinks = computed(() =>
  Object.groupBy(links.value ?? [], (link: LinkDisplay) => link.category),
)

const categs = computed(() => Object.keys(groupedLinks.value))
</script>

<template>
  <LayoutWindow title="Links" icon="soul">
    <template #action></template>
    <div class="categories" v-if="categs.length">
      <div class="category" v-for="(links, category, index) in groupedLinks" :key="category">
        <h2>{{ category }}</h2>
        <div class="linklist">
          <LayoutItem
            v-for="link in links"
            :key="link.title"
            :href="link.url"
            class="link"
            inline
            small
          >
            <img
              :src="`https://www.google.com/s2/favicons?sz=64&domain=${link.url}`"
              :alt="link.title + 'favicon'"
            />
            <p>{{ link.title }}</p>
            <LinkDelete :link />
          </LayoutItem>
        </div>
        <LinkAdd :categs v-if="index === 0" />
      </div>
    </div>
    <LinkAdd :categs v-if="!categs.length" />
  </LayoutWindow>
</template>

<style scoped>
.categories {
  display: flex;
  justify-content: center;
  width: 100%;
  /* border-bottom: var(--border); */
}

.link {
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

.category {
  display: flex;
  flex-flow: column;
  width: 100%;

  &:not(:last-child) {
    border-right: var(--border);
  }
}

h2 {
  font-size: 1rem;
  font-weight: 400;
  text-transform: capitalize;
  margin: calc(var(--spacing-small) * 2);
  margin-bottom: 0;

  &::before,
  &::after {
    content: '=';
    opacity: 0.4;
  }

  &::before {
    margin-right: 1ch;
  }
  &::after {
    margin-left: 1ch;
  }
}

.linklist {
  padding: var(--spacing-small);
  display: flex;
  flex-flow: column;
}

img {
  background-color: var(--element-focus);
  border-radius: var(--border-radius-small);
  padding: var(--spacing-small);
  width: var(--favicon-size);
  height: var(--favicon-size);
}
</style>
