<script setup lang="ts">
import { computed, ref } from 'vue'
import LayoutWindow from '../../layouts/LayoutWindow.vue'

interface Link {
  url: string
  title: string
  category: string
}

const links = ref<Link[]>([
  { url: 'https://google.com', title: 'Google', category: 'Search' },
  { url: 'https://github.com', title: 'GitHub', category: 'dev' },
  { url: 'https://github.com', title: 'dokploy', category: 'dev' },
  { url: 'https://github.com', title: 'hostinger', category: 'dev' },
  { url: 'https://youtube.com', title: 'YouTube', category: 'media' },
  { url: 'https://youtube.com', title: 'Miruro', category: 'media' },
  { url: 'https://youtube.com', title: 'Arte', category: 'media' },
])

const groupedLinks = computed(() => {
  return Object.groupBy(links.value, (link: Link) => link.category)
})
</script>

<template>
  <LayoutWindow title="Links" icon="soul">
    <div class="content">
      <input type="search" name="search" id="search" placeholder="search..." autofocus />
      <div class="links">
        <div class="category" v-for="(links, category) in groupedLinks" :key="category">
          <h2>{{ category }}</h2>
          <div class="linklist">
            <a v-for="link in links" :href="link.url">{{ link.title }}</a>
          </div>
        </div>
      </div>
    </div>
  </LayoutWindow>
</template>

<style scoped>
.content {
  display: flex;
  flex-flow: column;
}

#search {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: var(--spacing-small);
  height: var(--title-height);
  border: none;
  border-bottom: var(--border);
  outline: none;
  width: 100%;
  text-align: center;
  font-size: 1rem;
  color: inherit;

  /* &:focus-within {
  } */

  &::placeholder {
    color: var(--color-dimmer);
    opacity: 1;
  }
}

.links {
  display: flex;
  justify-content: center;
  width: 100%;
}

.category {
  display: flex;
  flex-flow: column;
  padding: var(--spacing-small);
  gap: var(--list-gap);

  &:not(:last-child) {
    border-right: var(--border);
  }
}

h2 {
  font-size: 1rem;
  font-weight: 400;
  text-transform: capitalize;
  color: var(--color-dim);
  background-color: var(--tag);
  border-radius: var(--border-radius-small);
  padding: 0.025rem 0.3rem;
  width: fit-content;
}

.linklist {
  display: flex;
  flex-flow: column;
  /* gap: var(--list-gap); */
}

a {
  padding: 0 0.15rem;
  text-decoration: none;
  width: fit-content;

  &:hover {
    background-color: var(--element-focus);
    text-decoration: underline;
  }
}
</style>
