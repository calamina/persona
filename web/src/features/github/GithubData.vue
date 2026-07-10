<script setup lang="ts">
import { getPublicEvents, getRepos } from './github.service'
import { useTimeAgo } from '@vueuse/core'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import LayoutList from '../../layouts/LayoutList.vue'
import LayoutItem from '../../layouts/LayoutItem.vue'
import { computed, ref, useTemplateRef } from 'vue'
import TabList from '../../components/TabList.vue'
import GithubStatus from './GithubStatus.vue'
import IconBase from '../../components/icons/IconBase.vue'
import ModalBase from '../../components/ModalBase.vue'
import ButtonLoading from '../../components/ButtonLoading.vue'
import ModalField from '../../components/ModalField.vue'
// import IconBase from '../../components/icons/IconBase.vue'

const queryClient = useQueryClient()
const username = ref(localStorage.getItem('github-username') || null)
const dialog = useTemplateRef('dialog')

const setStorageUsername = async () => {
  if (!username.value) return
  localStorage.setItem('github-username', username.value)
}

const { isLoading: _repositioriesLoading, data: repositories } = useQuery({
  queryKey: ['repositories', username],

  queryFn: getRepos,
  staleTime: 1000 * 60 * 15,
  gcTime: 1000 * 60 * 18,
})

const { isLoading: _eventsLoading, data: events } = useQuery({
  queryKey: ['events', username],

  queryFn: getPublicEvents,
  staleTime: 1000 * 60 * 15,
  gcTime: 1000 * 60 * 18,
})

const { mutate: setUsername, isPending: usernameLoading } = useMutation({
  mutationFn: setStorageUsername,
  onSuccess: () => {
    dialog.value?.close()
    queryClient.invalidateQueries({ queryKey: ['repositories'] })
    queryClient.invalidateQueries({ queryKey: ['events'] })
  },
})

const TABS = ['Repositories', 'Events'] as const
const tab = ref<(typeof TABS)[number]>('Repositories')

const windowTitle = computed(() => 'Github' + (username.value ? ` ▪ ${username.value}` : ''))
</script>

<template>
  <LayoutWindow icon="github" :title="windowTitle">
    <template #action>
      <button @click="dialog?.open()" class="username-button">
        <IconBase class="username-icon" name="userGithub" />
      </button>
    </template>
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
          <GithubStatus v-if="repository.homepage" :url="repository.homepage" class="status" />
          <p class="push secondary">
            <!-- <IconBase class="icon" name="push" />{{ useTimeAgo(repository.pushed_at) }} -->
            {{ useTimeAgo(repository.pushed_at) }}
          </p>
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

  <ModalBase title="Github" ref="dialog">
    <form id="setForm" @submit.prevent="setUsername()">
      <ModalField v-model="username" name="Username" placeholder="codeperson" autofocus />
    </form>

    <template #actions>
      <ButtonLoading
        :loading="usernameLoading"
        label="Set username"
        form="setForm"
        icon="user"
        type="submit"
        class="confirm"
      />
    </template>
  </ModalBase>
</template>

<style scoped>
.repository {
  &:hover,
  &:focus-within {
    :global(.status.offline) {
      background-color: var(--element-focusmax);
      color: var(--color);
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

.confirm {
  padding: var(--spacing-small);
  height: fit-content;
  width: 100%;
  border: none;
}

.username-button {
  display: flex;
  align-items: center;
  border: none;
  outline: none;
  background-color: transparent;
  height: var(--title-height);
  width: var(--title-height);
  cursor: pointer;
}

.username-icon {
  margin-left: auto;
  width: fit-content;
  height: 1.2rem;
}
</style>
