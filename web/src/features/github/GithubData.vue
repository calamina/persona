<script setup lang="ts">
import { getPublicEvents, getRepos } from './github.service'
import { useTimeAgo } from '@vueuse/core'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import { useQuery } from '@tanstack/vue-query'
import LayoutList from '../../layouts/LayoutList.vue'
import LayoutItem from '../../layouts/LayoutItem.vue'
import IconBase from '../../components/icons/IconBase.vue'
import { ref } from 'vue'
import TabList from '../../components/TabList.vue'

const { isLoading: _repositioriesLoading, data: repositories } = useQuery({
  queryKey: ['repositories'],

  queryFn: getRepos,
  staleTime: 1000 * 60 * 15,
  gcTime: 1000 * 60 * 18,
})

const { isLoading: _eventsLoading, data: events } = useQuery({
  queryKey: ['events'],

  queryFn: getPublicEvents,
  staleTime: 1000 * 60 * 15,
  gcTime: 1000 * 60 * 18,
})

const TABS = ['Repositories', 'Events'] as const
const tab = ref<(typeof TABS)[number]>('Repositories')
</script>

<template>
  <LayoutWindow icon="github" title="Github">
    <template #tabs>
      <TabList :tabs="TABS" v-model="tab" />
    </template>
    <Transition name="load" mode="out-in">
      <LayoutList v-if="tab === 'Repositories'">
        <LayoutItem
          v-for="repository in repositories"
          type="div"
          :key="repository.id"
          class="repository"
        >
          <a class="title" :href="repository.html_url">{{ repository.name }}</a>
          <!-- <a v-if="repository.homepage" :href="repository.homepage">homepage</a> -->
          <!-- <p>created : {{ useTimeAgo(repository.created_at) }}</p> -->
          <p class="push secondary">
            <IconBase class="icon" name="push" />{{ useTimeAgo(repository.pushed_at) }}
          </p>
          <!-- <p>size : {{ formatBytes(repository.size) }}</p> -->
        </LayoutItem>
      </LayoutList>
      <LayoutList v-else>
        <LayoutItem v-for="event in events" type="div" :key="event.id" class="event">
          <p>{{ event.repo.name }}</p>
          <p class="secondary">{{ event.displayName }} ▪ {{ useTimeAgo(event.created_at) }}</p>
        </LayoutItem>
      </LayoutList>
    </Transition>
  </LayoutWindow>
</template>

<style scoped>
.repository {
  &:hover,
  &:focus-within {
    .icon {
      background-color: var(--element-focusmax);
    }
  }
}

.title {
  text-transform: capitalize;
  text-decoration: none;
  color: var(--color);
}

.push {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--item-gap);
  width: fit-content;
}

.secondary {
  color: var(--color-dim);
}

.icon {
  background-color: var(--element-focus);
  border-radius: var(--border-radius-small);
}
</style>
