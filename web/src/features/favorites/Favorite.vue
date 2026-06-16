<script setup lang="ts">
import { deleteFavorite } from './favorites.service'
import ButtonLoading from '../../components/ButtonLoading.vue'
import { ref } from 'vue'
import { useFavoriteStore, type FavoriteDisplay } from './favorite.store.ts'

const store = useFavoriteStore()
const { favorite } = defineProps<{ favorite: FavoriteDisplay }>()
const emit = defineEmits(['deleted'])
const loading = ref(false)

const remove = async (id: number) => {
  loading.value = true
  const { data } = await deleteFavorite(id)
  if (data) {
    store.clearFavoriteCache()
    store.loadFavorites(true)
  }
  loading.value = false
}
</script>

<template>
  <a class="link" :href="favorite.url">
    <img :src="favorite.favicon" :alt="favorite.title + 'favicon'" />
    <p>{{ favorite.title }}</p>
    <ButtonLoading :loading @click.prevent="remove(favorite.id)" class="deleteButton" icon="favoriteDelete" />
  </a>
</template>

<style scoped>
.deleteButton {
  border: none;
  display: none;
  background-color: transparent;
  border: 2.5px solid transparent;

  &:focus-within {
    background-color: var(--element-focusmax);
  }
}

.link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  padding: 0.6rem;
  line-height: 1.2rem;
  outline: none;

  &:hover,
  &:focus-within {
    background-color: var(--element-focus);
    button {
      display: flex;
    }
    img {
      background-color: var(--element-focusmax);
    }
  }
}

p {
  flex: 1;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

img {
  background-color: var(--element-focus);
  border-radius: 0.3rem;
  padding: 0.45rem;
  width: 2.1rem;
  height: 2.1rem;
}
</style>
