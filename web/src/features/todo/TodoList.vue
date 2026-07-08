<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import LayoutWindow from '../../layouts/LayoutWindow.vue'
import ButtonLoading from '../../components/ButtonLoading.vue'
import { addTodo, deleteTodo, getTodos, updateTodo } from './todo.service.ts'
import { ref } from 'vue'
import LayoutList from '../../layouts/LayoutList.vue'
import LayoutItem from '../../layouts/LayoutItem.vue'

const queryClient = useQueryClient()
const newTodo = ref('')

const { isLoading: _todosLoading, data: todos } = useQuery({
  queryKey: ['todos'],
  queryFn: getTodos,
})

const { mutate: create, isPending: createLoading } = useMutation({
  mutationFn: addTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] })
    newTodo.value = ''
  },
})

const {
  mutate: remove,
  isPending: removeLoading,
  variables: removeId,
} = useMutation({
  mutationFn: deleteTodo,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})

const {
  mutate: update,
  isPending: updateLoading,
  variables: updateId,
} = useMutation({
  mutationFn: updateTodo,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
})

const createTodo = () => {
  if (!newTodo.value) return
  create(newTodo.value)
}
</script>

<template>
  <LayoutWindow title="Todo" icon="todolist" fit>
    <LayoutList v-if="todos?.length" fit>
      <LayoutItem inline type="form" @submit.prevent="createTodo()" class="create">
        <ButtonLoading class="updateButton" :loading="createLoading" icon="checkPlus" />
        <input v-model="newTodo" type="text" placeholder="Add todo" />
      </LayoutItem>
      <LayoutItem type="div" inline v-for="todo in todos" :key="todo.id" tabindex="0" class="todo">
        <ButtonLoading
          @click.stop="update(todo.id)"
          class="updateButton"
          :loading="updateLoading && updateId === todo.id"
          :icon="todo.done ? 'check' : 'checkNot'"
          :label="todo.title"
          :class="{ done: todo.done }"
        />
        <ButtonLoading
          @click.stop="remove(todo.id)"
          class="deleteButton"
          :loading="removeLoading && removeId === todo.id"
          icon="favoriteDelete"
        />
      </LayoutItem>
    </LayoutList>
  </LayoutWindow>
</template>

<style scoped>
.header:only-child {
  border: none;
}

.todo {
  &:hover,
  &:focus-within {
    .deleteButton {
      display: flex;
    }
  }
}

.deleteButton {
  display: none;
  width: fit-content;
}

.updateButton,
.deleteButton {
  padding: 0;
  height: fit-content;
  border: none;
  background-color: transparent;

  &:focus-visible {
    border-color: var(--border-color);
  }
}

.updateButton {
  flex: 1;
  display: flex;
  gap: 0.45rem;
  align-items: center;
  width: 100%;
  justify-content: start;
}

.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
}

.done {
  opacity: 0.4;
  text-decoration: line-through;
}

.create {
  :global(.data) {
    gap: 0.45rem !important;
  }

  &:hover input,
  &:focus-within input {
    border-bottom: var(--border);
  }
}

input {
  border: none;
  outline: none;
  color: var(--color);
  background-color: transparent;
  padding: 0;
  width: 100%;
  border-bottom: var(--border-width) solid transparent;

  &::placeholder {
    color: var(--color-dim);
  }
}
</style>
